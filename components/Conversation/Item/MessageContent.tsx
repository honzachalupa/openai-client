import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import gfm from "remark-gfm";
import { TType } from "./types";

interface IProps {
    value: string;
    type: TType;
}

export const MessageContent: React.FC<IProps> = ({ value, type }) =>
    type === "message" ? (
        <ReactMarkdown
            disallowedElements={["meta", "script"]}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm]}
            components={{
                h1: ({ node, ...props }) => (
                    <h1 className="text-3xl" {...props} />
                ),
                h2: ({ node, ...props }) => (
                    <h1 className="text-2xl" {...props} />
                ),
                h3: ({ node, ...props }) => (
                    <h1 className="text-xl" {...props} />
                ),
                h4: ({ node, ...props }) => (
                    <h1 className="text-lg" {...props} />
                ),
                ul: ({ node, ...props }) => (
                    <ul className="!list-disc" {...props} />
                ),
                ol: ({ node, ...props }) => (
                    <ol className="!list-disc" {...props} />
                ),
                th: ({ node, ...props }) => (
                    <th className="border border-white p-2" {...props} />
                ),
                td: ({ node, ...props }) => (
                    <td className="border border-white p-2" {...props} />
                ),
                pre: ({ node, ...props }) => (
                    <pre className="p-5 my-5 border border-dashed" {...props} />
                ),
            }}
            className="overflow-hidden"
        >
            {value.replace(/^`{3}$\n?/gm, "")}
        </ReactMarkdown>
    ) : (
        <p>Generate image for &quot;{value}&quot;.</p>
    );
