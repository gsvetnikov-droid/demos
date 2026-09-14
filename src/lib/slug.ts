export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const PLATFORM_STATUSES = ["DRAFT", "PUBLISHED"] as const;
export type PlatformStatus = (typeof PLATFORM_STATUSES)[number];
