"use client";

import { useLocalStorage } from "@react-hooks-library/core";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Conversation, IConversationRef } from "../components/Conversation";
import config from "../config";

export default function Home() {
    const conversationRef = useRef<IConversationRef>();

    const [content, setContent] = useLocalStorage<string>("content", "");
    const [isLoading, setIsLoading] = useState<boolean>();

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value!);
    };

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js").then(
                    function (registration) {
                        console.log(
                            "Service Worker registration successful with scope: ",
                            registration.scope
                        );
                    },
                    function (err) {
                        console.log(
                            "Service Worker registration failed: ",
                            err
                        );
                    }
                );
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl">{config.appName}</h1>

            <Conversation
                // @ts-ignore
                ref={conversationRef}
                content={content}
                onResetContent={() => setContent("")}
                onLoadingChanged={setIsLoading}
            />

            <div className="mt-auto flex flex-col">
                <textarea
                    title="Message"
                    value={content}
                    placeholder="What's your request?"
                    className="resize-none w-full bg-transparent border border-1 p-2 my-2 h-[100px]"
                    onChange={onMessageChange}
                />

                <div className="flex justify-end">
                    <Button
                        label="Generate image"
                        isDisabled={content.length < 5}
                        className="mr-2"
                        onClick={() =>
                            conversationRef.current?.handleGenerateImage()
                        }
                    />

                    <Button
                        label="Send"
                        isDisabled={content.length < 5}
                        onClick={() =>
                            conversationRef.current?.handleSendMessage()
                        }
                    />
                </div>
            </div>

            {isLoading && (
                <div className="w-screen h-screen fixed bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center top-0">
                    <p>Working on it...</p>
                </div>
            )}
        </div>
    );
}
