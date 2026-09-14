// Decorative, ambient background blobs — pure CSS (blurred, animated
// gradient circles), no canvas/WebGL/JS. `aria-hidden` since it carries
// no content.
export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-24 -top-24 h-[28rem] w-[28rem] animate-blob rounded-full bg-indigo-600/30 blur-3xl" />
      <div className="absolute -right-16 top-10 h-[24rem] w-[24rem] animate-blob rounded-full bg-fuchsia-600/20 blur-3xl [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] animate-blob rounded-full bg-violet-600/20 blur-3xl [animation-delay:8s]" />
    </div>
  );
}
