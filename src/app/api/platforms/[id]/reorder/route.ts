import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Swaps sortOrder with the adjacent platform in the current ordering, so
// "move up"/"move down" in the admin list is a single cheap swap rather
// than renumbering everything.
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (body?.direction !== "up" && body?.direction !== "down") {
    return NextResponse.json({ error: "direction must be 'up' or 'down'." }, { status: 400 });
  }

  const all = await prisma.platform.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], select: { id: true, sortOrder: true } });
  const index = all.findIndex((p) => p.id === params.id);
  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const swapIndex = body.direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= all.length) return NextResponse.json({ ok: true }); // already at the edge, no-op

  const current = all[index];
  const swapWith = all[swapIndex];

  await prisma.$transaction([
    prisma.platform.update({ where: { id: current.id }, data: { sortOrder: swapWith.sortOrder } }),
    prisma.platform.update({ where: { id: swapWith.id }, data: { sortOrder: current.sortOrder } }),
  ]);

  return NextResponse.json({ ok: true });
}
