"use client";

import { Conversation } from "@/components/Conversation";
import { Form } from "@/components/Form";
import { Link } from "@/components/Link";
import config from "@/config";
import { useLocalStorage } from "@react-hooks-library/core";
import { useEffect } from "react";

export default function Home() {
    const [apiKey] = useLocalStorage("apiKey", "");

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js").then(
                    function (registration) {
                        console.info(
                            "Service Worker registration successful with scope: ",
                            registration.scope
                        );
                    },
                    function (err) {
                        console.info(
                            "Service Worker registration failed: ",
                            err
                        );
                    }
                );
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-screen pb-5">
            <h1 className="text-xl pb-2 text-[#e11d48]">{config.appName}</h1>

            {apiKey ? (
                <>
                    <Conversation />

                    <Form />
                </>
            ) : (
                <>
                    <h3>Welcome</h3>

                    <p className="text-sm opacity-70 my-2">
                        Please start with adding your OpenAI API key
                    </p>

                    <Link label="Add API key" href="/settings" />
                </>
            )}
        </div>
    );
}
