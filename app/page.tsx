"use client";

import cx from "classnames";
import moment from "moment";
import { ChangeEvent, useRef, useState } from "react";
import config from "../config";
import { CREATE_CHAT_COMPLETION_ROUTE } from "./api/create-chat-completion/route";

enum ERoleLabels {
    user = "User",
    assistant = "Assistant",
}

interface IConversationItem {
    role: keyof typeof ERoleLabels;
    message: string;
    timestamp: string;
}

export default function Home() {
    const formRef = useRef<HTMLFormElement>(null);

    const [message, setMessage] = useState<string>("");
    const [conversationItems, setConversationItems] = useState<
        IConversationItem[]
    >([]);

    console.log({ message, conversationItems });

    const addConversationItem = (
        item: Omit<IConversationItem, "timestamp">
    ) => {
        const conversationItem = {
            ...item,
            timestamp: moment().format(),
        };

        setConversationItems((prevState) => [...prevState, conversationItem]);
    };

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value!);
    };

    const onEnterPress = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();

            formRef.current?.submit();
        }
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();

        addConversationItem({
            role: "user",
            message,
        });

        const response = await fetch(CREATE_CHAT_COMPLETION_ROUTE, {
            method: "POST",
            body: JSON.stringify({
                message,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data);
        }

        setMessage("");

        addConversationItem({
            role: "assistant",
            message: data.choices[0].message.content,
        });
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl">{config.appName}</h1>

            <section>
                {conversationItems.map(({ message, role }, i) => (
                    <article
                        key={i}
                        className={cx("my-5 last:border-none last:pb-0", {
                            "border-gray-600 border-b-[1px] border-dashed pb-5":
                                role === "assistant" &&
                                conversationItems.length >= 4,
                        })}
                    >
                        <p className="opacity-50 mb-1">{ERoleLabels[role]}:</p>

                        <p>{message}</p>
                    </article>
                ))}
            </section>

            <form
                ref={formRef}
                className="mt-auto flex flex-col"
                onSubmit={onSubmit}
            >
                <textarea
                    title="Message"
                    defaultValue={message}
                    className="resize-none w-full bg-transparent border border-1 p-2 my-2 h-[100px]"
                    onChange={onMessageChange}
                    onKeyDown={onEnterPress}
                />

                <button
                    type="submit"
                    className="self-end px-5 py-2 bg-white bg-opacity-10"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
