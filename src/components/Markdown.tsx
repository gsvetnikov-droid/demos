import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content, dark = false }: { content: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "prose prose-invert max-w-none prose-headings:font-bold prose-a:text-cyan-300 prose-strong:text-white prose-code:text-cyan-200 prose-blockquote:border-cyan-300/40 prose-hr:border-white/10"
          : "prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600"
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
