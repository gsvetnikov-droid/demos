import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PlatformForm from "@/components/PlatformForm";

export default async function EditPlatformPage({ params }: { params: { id: string } }) {
  const platform = await prisma.platform.findUnique({ where: { id: params.id } });
  if (!platform) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit {platform.name}</h1>
      <PlatformForm
        initial={{
          id: platform.id,
          slug: platform.slug,
          name: platform.name,
          tagline: platform.tagline || "",
          summary: platform.summary || "",
          category: platform.category || "",
          tags: platform.tags.join(", "),
          techStack: platform.techStack.join(", "),
          highlights: platform.highlights.join("\n"),
          liveUrl: platform.liveUrl || "",
          repoUrl: platform.repoUrl || "",
          coverImageUrl: platform.coverImageUrl || "",
          embeddable: platform.embeddable,
          whitepaper: platform.whitepaper,
          status: platform.status as "DRAFT" | "PUBLISHED",
        }}
      />
    </div>
  );
}
