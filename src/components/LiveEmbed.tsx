// A "browser chrome" frame around a live iframe of the platform's own
// deployment — lets a visitor click through the real thing in place,
// without leaving the case study. The "Launch demo" button elsewhere on
// the page is still the reliable full-experience path (some sites won't
// render inside a frame at all, and an authenticated session inside a
// cross-site iframe can behave differently across browsers) — this is a
// bonus preview, not the only way in.
export default function LiveEmbed({ url }: { url: string }) {
  let host = url;
  try {
    host = new URL(url).host;
  } catch {
    // leave `host` as the raw string if it's not a valid absolute URL
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-cream-200 bg-cream-100 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-cream-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-cream-300" />
        <span className="ml-2 truncate rounded-md border border-cream-200 bg-white px-3 py-1 text-xs text-neutral-500">
          {host}
        </span>
      </div>
      <iframe
        src={url}
        title="Live platform preview"
        loading="lazy"
        className="h-[520px] w-full bg-white"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
