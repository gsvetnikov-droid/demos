import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-cream-700 prose-a:underline prose-a:underline-offset-4 prose-code:text-cream-800 prose-blockquote:border-cream-300">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
