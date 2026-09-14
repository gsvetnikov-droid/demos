import { getSiteContent } from "@/lib/getSiteContent";
import SiteContentForm from "@/components/SiteContentForm";

export default async function AdminSiteContentPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900">Site content</h1>
      <p className="mb-6 text-sm text-slate-500">
        Every piece of text on the public homepage that isn&apos;t tied to a specific project — the hero at the top,
        the gallery intro, About, and Contact.
      </p>
      <SiteContentForm
        initial={{
          siteName: content.siteName,
          siteTagline: content.siteTagline,
          heroHeading: content.heroHeading,
          heroIntro: content.heroIntro,
          heroPrimaryCta: content.heroPrimaryCta,
          heroSecondaryCta: content.heroSecondaryCta,
          sectionHeading: content.sectionHeading,
          sectionBody: content.sectionBody,
          aboutHeading: content.aboutHeading,
          aboutBody: content.aboutBody,
          contactHeading: content.contactHeading,
          contactBody: content.contactBody,
          contactCtaLabel: content.contactCtaLabel,
          contactEmail: content.contactEmail || "",
        }}
      />
    </div>
  );
}
