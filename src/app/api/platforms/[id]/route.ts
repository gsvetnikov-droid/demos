import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const platform = await prisma.platform.findUnique({ where: { id: params.id } });
  if (!platform) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(platform);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.platform.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const data: Record<string, unknown> = {};

  if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body.slug === "string" && body.slug.trim()) {
    const nextSlug = slugify(body.slug);
    if (nextSlug && nextSlug !== existing.slug) {
      const clash = await prisma.platform.findUnique({ where: { slug: nextSlug } });
      if (clash) return NextResponse.json({ error: `Slug "${nextSlug}" is already in use.` }, { status: 400 });
      data.slug = nextSlug;
    }
  }
  if ("tagline" in body) data.tagline = body.tagline || null;
  if ("summary" in body) data.summary = body.summary || null;
  if ("category" in body) data.category = body.category || null;
  if ("tags" in body) data.tags = Array.isArray(body.tags) ? body.tags.filter((t: unknown) => typeof t === "string" && t.trim()) : [];
  if ("techStack" in body)
    data.techStack = Array.isArray(body.techStack) ? body.techStack.filter((t: unknown) => typeof t === "string" && t.trim()) : [];
  if ("highlights" in body)
    data.highlights = Array.isArray(body.highlights) ? body.highlights.filter((t: unknown) => typeof t === "string" && t.trim()) : [];
  if ("liveUrl" in body) data.liveUrl = body.liveUrl || null;
  if ("repoUrl" in body) data.repoUrl = body.repoUrl || null;
  if ("iconEmoji" in body) data.iconEmoji = body.iconEmoji || null;
  if ("coverImageUrl" in body) data.coverImageUrl = body.coverImageUrl || null;
  if ("whitepaper" in body) data.whitepaper = body.whitepaper || "";
  if (body.status === "PUBLISHED" || body.status === "DRAFT") data.status = body.status;
  if (typeof body.sortOrder === "number") data.sortOrder = body.sortOrder;

  const platform = await prisma.platform.update({ where: { id: params.id }, data });
  return NextResponse.json(platform);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.platform.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.platform.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
