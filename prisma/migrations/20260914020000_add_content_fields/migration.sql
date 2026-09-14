-- AlterTable
ALTER TABLE "Platform" ADD COLUMN     "displayStatus" TEXT,
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageCaption" TEXT,
ADD COLUMN     "relatedProjectSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[];

