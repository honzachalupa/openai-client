import ReactMarkdown from "react-markdown";

interface IProps {
    value: string;
}

export const MessageContent: React.FC<IProps> = ({ value }) => (
    <ReactMarkdown
        disallowedElements={["meta", "script"]}
        components={{
            pre: ({ node, ...props }) => (
                <pre className="p-5 my-5 border border-dashed" {...props} />
            ),
        }}
    >
        {value}
    </ReactMarkdown>
);
