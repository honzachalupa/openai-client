import cx from "classnames";
import moment from "moment";
import { ERoleLabels, ETypeLabels } from "../types/conversation";
import { Button } from "./Button";
import { ImageContent } from "./ImageContent";
import { MessageContent } from "./MessageContent";

export interface IConversationItem {
    role: keyof typeof ERoleLabels;
    type: keyof typeof ETypeLabels;
    content: string;
    imageUrl?: string;
    timestamp?: string;
    request?: IConversationItem;
}

interface IProps {
    data: IConversationItem;
    handleSendMessage: (content: string) => void;
    handleGenerateImage: (content: string) => void;
    onImageLoaded?: () => void;
}

export const ConversationItem: React.FC<IProps> = ({
    data: { content, imageUrl, role, type, timestamp, request },
    handleSendMessage,
    handleGenerateImage,
    onImageLoaded,
}) => {
    const handleOperation =
        type === "message" ? handleSendMessage : handleGenerateImage;

    return (
        <article
            className={cx("my-5 last:border-none last:pb-0 flex flex-col", {
                "border-gray-600 border-b-[1px] border-dashed pb-5":
                    role === "assistant",
            })}
        >
            {role === "user" && (
                <p className="text-xs opacity-50 text-center">
                    {moment(timestamp).format("D.M.YYYY H:mm")}
                </p>
            )}

            <p className="opacity-50 mb-1 text-xs">{ERoleLabels[role]}</p>

            {type === "message" ? (
                <MessageContent value={content} />
            ) : type === "image" ? (
                <ImageContent
                    url={imageUrl!}
                    onLoaded={() => onImageLoaded?.()}
                />
            ) : null}

            {role === "assistant" && (
                <Button
                    label="Try again"
                    className="mt-2 self-end"
                    onClick={() => {
                        handleOperation(request?.content!);
                    }}
                />
            )}
        </article>
    );
};
