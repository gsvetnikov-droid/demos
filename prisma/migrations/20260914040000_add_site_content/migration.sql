-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "siteName" TEXT NOT NULL DEFAULT 'Showcase',
    "siteTagline" TEXT NOT NULL DEFAULT '',
    "heroHeading" TEXT NOT NULL,
    "heroIntro" TEXT NOT NULL,
    "heroPrimaryCta" TEXT NOT NULL,
    "heroSecondaryCta" TEXT NOT NULL,
    "sectionHeading" TEXT NOT NULL,
    "sectionBody" TEXT NOT NULL,
    "aboutHeading" TEXT NOT NULL,
    "aboutBody" TEXT NOT NULL,
    "contactHeading" TEXT NOT NULL,
    "contactBody" TEXT NOT NULL,
    "contactCtaLabel" TEXT NOT NULL,
    "contactEmail" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

