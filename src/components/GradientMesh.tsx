// Decorative, ambient background — pure CSS (blurred, animated, very
// low-opacity gradient circles), no canvas/WebGL/JS. Deliberately subtle:
// a wash of light behind frosted-glass panels, not a saturated blob field.
// `aria-hidden` since it carries no content.
export default function GradientMesh({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -left-32 -top-32 h-[32rem] w-[32rem] animate-blob rounded-full bg-cyan-500/[0.09] blur-[110px]" />
      <div className="absolute -right-24 top-0 h-[28rem] w-[28rem] animate-blob rounded-full bg-sky-400/[0.07] blur-[110px] [animation-delay:6s]" />
      <div className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] animate-blob rounded-full bg-white/[0.04] blur-[110px] [animation-delay:11s]" />
    </div>
  );
}
