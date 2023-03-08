"use client";

import { CREATE_CHAT_COMPLETION_ROUTE } from "@/app/api/create-chat-completion/route";
import { CREATE_IMAGE } from "@/app/api/create-image/route";
import { callAPI } from "@/utils/api";
import { useLocalStorage } from "@react-hooks-library/core";
import moment from "moment";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IConversationItem } from "./Item/types";

interface IProps {
    children: ReactNode;
}

const initialContext = {
    content: "",
    items: [] as IConversationItem[],
    isLoading: false,
    generateMessage: () => {},
    generateImage: () => {},
    regenerate: (item: IConversationItem) => {},
    setContent: (value: string) => {},
    setIsLoading: (value: boolean) => {},
};

type IContext = typeof initialContext;

export const Context = createContext<IContext>(initialContext);

export const ContextWrapper: React.FC<IProps> = ({ children }) => {
    const [apiKey] = useLocalStorage("apiKey", "");
    const [context, setContext] = useState<IContext>(initialContext);
    const [isMounted, setIsMounted] = useState<boolean>();

    const setContent = (value: string) => {
        setContext((prevContext) => ({
            ...prevContext,
            content: value,
        }));
    };

    const setItems = (items: IConversationItem[]) => {
        setContext((prevContext) => ({
            ...prevContext,
            items,
        }));
    };

    const setIsLoading = (value: boolean) => {
        setContext((prevContext) => ({
            ...prevContext,
            isLoading: value,
        }));
    };

    const addConversationItem = (item: IConversationItem) => {
        const itemWithTimestamp = {
            ...item,
            timestamp: moment().format(),
        };

        setContext((prevContext) => ({
            ...prevContext,
            items: [...prevContext.items, itemWithTimestamp],
        }));
    };

    const onBeforeGenerate = (contentOverwrite?: string) => {
        setIsLoading(true);

        const contentSnapshot = contentOverwrite || context.content;

        setContent("");

        return contentSnapshot;
    };

    const handleException = (request: IConversationItem) => {
        addConversationItem({
            role: "assistant",
            type: "error",
            content: "Unknown error occurred. Please try again later.",
            request,
        });

        setIsLoading(false);
    };

    const generateMessage = async (contentOverwrite?: string) => {
        const content = onBeforeGenerate(contentOverwrite);

        const request: IConversationItem = {
            role: "user",
            type: "message",
            content,
        };

        addConversationItem(request);

        const data = await callAPI(CREATE_CHAT_COMPLETION_ROUTE, {
            apiKey,
            data: {
                content,
                history: context.items.map(({ content, role }) => ({
                    content,
                    role,
                })),
            },
        }).catch(() => {
            handleException(request);
        });

        addConversationItem({
            role: "assistant",
            type: "message",
            content: data.choices[0].message.content,
            request,
        });

        setIsLoading(false);
    };

    const generateImage = async (contentOverwrite?: string) => {
        const content = onBeforeGenerate(contentOverwrite);

        const request: IConversationItem = {
            role: "user",
            type: "image",
            content,
        };

        addConversationItem(request);

        const data = await callAPI(CREATE_IMAGE, {
            apiKey,
            data: {
                description: content,
                size: 512,
            },
        }).catch(() => {
            handleException(request);
        });

        addConversationItem({
            role: "assistant",
            type: "image",
            content,
            imageUrl: data.data[0].url,
            request,
        });
    };

    const regenerate = (item: IConversationItem) => {
        if (item.type === "image") {
            generateImage(item.content);
        } else {
            generateMessage(item.content);
        }
    };

    const functions = {
        generateMessage,
        generateImage,
        regenerate,
        setContent,
        setIsLoading,
    };

    useEffect(() => {
        const data = localStorage.getItem("history");

        if (data) {
            try {
                setItems(JSON.parse(data));
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
            localStorage.setItem("history", JSON.stringify(context.items));
        }
    }, [context.items]);

    return (
        <Context.Provider value={{ ...context, ...functions }}>
            {children}
        </Context.Provider>
    );
};
