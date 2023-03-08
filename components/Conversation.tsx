import moment from "moment";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { CREATE_CHAT_COMPLETION_ROUTE } from "../app/api/create-chat-completion/route";
import { CREATE_IMAGE } from "../app/api/create-image/route";
import { callAPI } from "../utils/api";
import { ConversationItem, IConversationItem } from "./ConversationItem";

interface IProps {
    content: string;
    onResetContent: () => void;
    onLoadingChanged: (value: boolean) => void;
}

export interface IConversationRef {
    handleSendMessage: () => void;
    handleGenerateImage: () => void;
}

export const Conversation: React.FC<IProps> = forwardRef(
    ({ content, onResetContent, onLoadingChanged }, ref) => {
        const [conversationItems, setConversationItems] = useState<
            IConversationItem[]
        >([]);
        const [isMounted, setIsMounted] = useState<boolean>();

        const addConversationItem = (item: IConversationItem) => {
            const conversationItem = {
                ...item,
                timestamp: moment().format(),
            };

            setConversationItems((prevState) => [
                ...prevState,
                conversationItem,
            ]);
        };

        const handleSendMessage = async (contentOverWrite?: string) => {
            onLoadingChanged(true);

            const contentSnapshot = (content || contentOverWrite)!;

            const request: IConversationItem = {
                role: "user",
                type: "message",
                content: contentSnapshot,
            };

            addConversationItem(request);

            const data = await callAPI(CREATE_CHAT_COMPLETION_ROUTE, {
                content: contentSnapshot,
                history: conversationItems.map(({ content, role }) => ({
                    content,
                    role,
                })),
            });

            onResetContent();

            addConversationItem({
                role: "assistant",
                type: "message",
                content: data.choices[0].message.content,
                request,
            });

            onLoadingChanged(false);
        };

        const handleGenerateImage = async (contentOverWrite?: string) => {
            onLoadingChanged(true);

            const contentSnapshot = (content || contentOverWrite)!;

            onResetContent();

            const request: IConversationItem = {
                role: "user",
                type: "message",
                content: contentSnapshot,
            };

            addConversationItem(request);

            const data = await callAPI(CREATE_IMAGE, {
                description: contentSnapshot,
            });

            addConversationItem({
                role: "assistant",
                type: "image",
                content: contentSnapshot,
                imageUrl: data.data[0].url,
                request,
            });
        };

        useEffect(() => {
            const data = localStorage.getItem("conversationItems");

            if (data) {
                try {
                    setConversationItems(JSON.parse(data));
                } catch (error) {
                    console.error(error);
                }
            }

            setTimeout(() => {
                setIsMounted(true);
            }, 500);
        }, []);

        useEffect(() => {
            if (isMounted) {
                localStorage.setItem(
                    "conversationItems",
                    JSON.stringify(conversationItems)
                );
            }
        }, [conversationItems]);

        useImperativeHandle(
            ref,
            (): IConversationRef => ({
                handleSendMessage,
                handleGenerateImage,
            })
        );

        return (
            <section>
                {conversationItems.map((data, i) => (
                    <ConversationItem
                        key={i}
                        data={data}
                        handleSendMessage={handleSendMessage}
                        handleGenerateImage={handleGenerateImage}
                        onImageLoaded={() => {
                            onLoadingChanged(false);
                        }}
                    />
                ))}
            </section>
        );
    }
);

Conversation.displayName = "Conversation";
