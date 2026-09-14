import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const content = await prisma.siteContent.findUnique({ where: { id: "singleton" } });
  return NextResponse.json(content);
}

const STRING_FIELDS = [
  "siteName",
  "siteTagline",
  "heroHeading",
  "heroIntro",
  "heroPrimaryCta",
  "heroSecondaryCta",
  "sectionHeading",
  "sectionBody",
  "aboutHeading",
  "aboutBody",
  "contactHeading",
  "contactBody",
  "contactCtaLabel",
] as const;

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request body." }, { status: 400 });

  const data: Record<string, unknown> = {};
  for (const field of STRING_FIELDS) {
    if (field in body) {
      if (typeof body[field] !== "string" || !body[field].trim()) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
      data[field] = body[field].trim();
    }
  }
  if ("contactEmail" in body) data.contactEmail = body.contactEmail ? String(body.contactEmail).trim() : null;

  // Upsert rather than a plain update — guarantees the singleton exists
  // even if this is somehow called before the seed script has ever run.
  const content = await prisma.siteContent.upsert({
    where: { id: "singleton" },
    update: data,
    create: {
      id: "singleton",
      siteName: "Showcase",
      siteTagline: "",
      heroHeading: "",
      heroIntro: "",
      heroPrimaryCta: "",
      heroSecondaryCta: "",
      sectionHeading: "",
      sectionBody: "",
      aboutHeading: "",
      aboutBody: "",
      contactHeading: "",
      contactBody: "",
      contactCtaLabel: "",
      ...data,
    },
  });
  return NextResponse.json(content);
}
