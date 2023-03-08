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
        <div className="flex flex-col h-screen">
            <h1 className="text-xl pt-3 pb-2">{config.appName}</h1>

            {apiKey ? (
                <>
                    <Conversation />

                    <Form />
                </>
            ) : (
                <>
                    <p>Missing API key</p>

                    <Link label="Add API key" href="/settings" />
                </>
            )}
        </div>
    );
}
