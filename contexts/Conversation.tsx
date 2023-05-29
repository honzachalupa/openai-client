"use client";

import { GPTActions } from "@/actions/gpt";
import moment from "moment";
import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { IConversationItem } from "../components/Conversation/Item/types";

interface IProps {
    children: ReactNode;
}

const initialContext = {
    content: "",
    items: [] as IConversationItem[],
    isLoading: false,
    generateMessage: () => {},
    generateImage: () => {},
    removeGroup: (id: string) => {},
    removeAll: () => {},
    regenerate: (item: IConversationItem) => {},
    setContent: (value: string) => {},
    setIsLoading: (value: boolean) => {},
};

type IConversationContext = typeof initialContext;

export const ConversationContext =
    createContext<IConversationContext>(initialContext);

export const ConversationContextProvider: React.FC<IProps> = ({ children }) => {
    const [context, setContext] =
        useState<IConversationContext>(initialContext);
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
        const nextItem = {
            ...item,
            timestamp: moment().format(),
        };

        setContext((prevContext) => ({
            ...prevContext,
            items: [...prevContext.items, nextItem],
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
            id: uuid(),
            groupId: null,
            role: "assistant",
            type: "error",
            content: "Unknown error occurred. Please try again later.",
            request,
        });

        setIsLoading(false);
    };

    const generateMessage = async (contentOverwrite?: string) => {
        const content = onBeforeGenerate(contentOverwrite);

        const groupId = uuid();

        const request: IConversationItem = {
            id: uuid(),
            groupId,
            role: "user",
            type: "message",
            content,
        };

        addConversationItem(request);

        const history = context.items.map(({ content, role }) => ({
            content,
            role,
        }));

        const data = await GPTActions.generateMessage(content, history).catch(
            () => {
                handleException(request);
            }
        );

        addConversationItem({
            id: uuid(),
            groupId,
            role: "assistant",
            type: "message",
            content: data.choices[0].message.content,
            request,
        });

        setIsLoading(false);
    };

    const generateImage = async (contentOverwrite?: string) => {
        const content = onBeforeGenerate(contentOverwrite);

        const groupId = uuid();

        const request: IConversationItem = {
            id: uuid(),
            groupId,
            role: "user",
            type: "image",
            content,
        };

        addConversationItem(request);

        const data = await GPTActions.generateImage(content).catch(() => {
            handleException(request);
        });

        addConversationItem({
            id: uuid(),
            groupId,
            role: "assistant",
            type: "image",
            content,
            imageUrl: data.data[0].url,
            request,
        });
    };

    const removeGroup = (groupId: IConversationItem["groupId"]) => {
        setContext((prevContext) => ({
            ...prevContext,
            items: [...prevContext.items].filter(
                (item) => item.groupId !== groupId
            ),
        }));
    };

    const removeAll = () => {
        setContext((prevContext) => ({
            ...prevContext,
            items: [],
        }));
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
        removeGroup,
        removeAll,
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
        <ConversationContext.Provider value={{ ...context, ...functions }}>
            {children}
        </ConversationContext.Provider>
    );
};
