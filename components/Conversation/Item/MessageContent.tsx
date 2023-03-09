import ReactMarkdown from "react-markdown";
import { TType } from "./types";

interface IProps {
    value: string;
    type: TType;
}

export const MessageContent: React.FC<IProps> = ({ value, type }) => (
    <ReactMarkdown
        disallowedElements={["meta", "script"]}
        components={{
            pre: ({ node, ...props }) => (
                <pre className="p-5 my-5 border border-dashed" {...props} />
            ),
        }}
    >
        {type === "image" ? `Generate image for "${value}"` : value}
    </ReactMarkdown>
);
