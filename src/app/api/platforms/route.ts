import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const platforms = await prisma.platform.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return NextResponse.json(platforms);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.name || typeof body.name !== "string" || !body.name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const baseSlug = slugify(body.slug && typeof body.slug === "string" && body.slug.trim() ? body.slug : body.name);
  let slug = baseSlug || "platform";
  let attempt = 1;
  while (await prisma.platform.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }

  const maxSortOrder = await prisma.platform.aggregate({ _max: { sortOrder: true } });

  const platform = await prisma.platform.create({
    data: {
      slug,
      name: body.name.trim(),
      tagline: body.tagline || null,
      summary: body.summary || null,
      category: body.category || null,
      tags: Array.isArray(body.tags) ? body.tags.filter((t: unknown) => typeof t === "string" && t.trim()) : [],
      techStack: Array.isArray(body.techStack) ? body.techStack.filter((t: unknown) => typeof t === "string" && t.trim()) : [],
      highlights: Array.isArray(body.highlights) ? body.highlights.filter((t: unknown) => typeof t === "string" && t.trim()) : [],
      liveUrl: body.liveUrl || null,
      repoUrl: body.repoUrl || null,
      iconEmoji: body.iconEmoji || null,
      coverImageUrl: body.coverImageUrl || null,
      imageAlt: body.imageAlt || null,
      imageCaption: body.imageCaption || null,
      embeddable: body.embeddable !== false,
      interactiveDemoUrl: body.interactiveDemoUrl || null,
      whitepaper: body.whitepaper || "",
      displayStatus: body.displayStatus || null,
      relatedProjectSlugs: Array.isArray(body.relatedProjectSlugs)
        ? body.relatedProjectSlugs.filter((t: unknown) => typeof t === "string" && t.trim())
        : [],
      status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      sortOrder: (maxSortOrder._max.sortOrder ?? 0) + 1,
    },
  });

  return NextResponse.json(platform, { status: 201 });
}
