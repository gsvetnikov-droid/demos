import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content, dark = false }: { content: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "prose prose-invert max-w-none prose-headings:font-bold prose-a:text-indigo-400 prose-strong:text-white prose-code:text-indigo-300 prose-blockquote:border-indigo-400/40 prose-hr:border-white/10"
          : "prose prose-slate max-w-none prose-headings:font-bold prose-a:text-brand-600"
      }
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
