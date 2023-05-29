import { ERoleLabels } from "@/types/conversation";
import { useScrollIntoView } from "@react-hooks-library/core";
import cx from "classnames";
import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { ConversationContext } from "../../../contexts/Conversation";
import { ImageContent } from "./ImageContent";
import { MessageContent } from "./MessageContent";
import { IConversationItem } from "./types";

export const Item: React.FC<IConversationItem> = ({
    content,
    imageUrl,
    role,
    type,
    timestamp,
}) => {
    const { setIsLoading } = useContext(ConversationContext);

    const scrollRef = useRef(null);

    const formatTimestamp = (value: string) => {
        const date = moment(value);
        const isToday = date.diff(moment(0, "HH")) > 0;

        return isToday ? date.format("H:mm") : date.format("D.M.YYYY");
    };

    useScrollIntoView(scrollRef, {
        block: "start",
    });

    return (
        <article
            ref={scrollRef}
            className="theme-page-background flex flex-col p-3"
        >
            {role === "user" && (
                <p className="text-xs opacity-50 text-center">
                    {formatTimestamp(timestamp!)}
                </p>
            )}

            <p className="opacity-50 mb-1 text-xs">{ERoleLabels[role]}</p>

            {type === "message" || (type === "image" && !imageUrl) ? (
                <MessageContent value={content} type={type} />
            ) : type === "image" ? (
                <ImageContent
                    url={imageUrl!}
                    onLoaded={() => setIsLoading(false)}
                />
            ) : type === "error" ? (
                <p className="text-red-500">{content}</p>
            ) : null}
        </article>
    );
};

export const LoadingItem: React.FC = () => {
    const [dotsCount, setDotsCount] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotsCount((prevState) => (prevState < 3 ? prevState + 1 : 0));
        }, 400);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <article
            className={cx("my-5 p-3 last:border-none last:pb-0 flex flex-col", {
                "border-gray-600 border-b-[1px] border-dashed pb-5": true,
            })}
        >
            <p className="opacity-50 mb-1 text-xs">
                {ERoleLabels["assistant"]}
            </p>

            <p>Typing{".".repeat(dotsCount)}</p>
        </article>
    );
};
