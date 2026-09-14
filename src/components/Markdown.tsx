import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-4">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
