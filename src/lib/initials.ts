// Two-letter monogram from a platform name ("Demo CRM" -> "DC"), used as
// the default badge instead of an emoji — see PlatformCard.tsx.
export function initialsFrom(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
