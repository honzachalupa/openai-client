"use client";

import { Button, TextArea } from "@honzachalupa/common";
import { useLocalStorage } from "@react-hooks-library/core";
import { useState } from "react";

export default function Settings() {
    const [apiKeyLS, setApiKeyLS] = useLocalStorage<string>("apiKey", "");
    const [apiKey, setApiKey] = useState<string>("");

    const handleSubmit = () => {
        setApiKeyLS(apiKey);

        window.location.replace("/");
    };

    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-xl pt-3 pb-2">Settings</h1>

            <h3>Where to find my API key?</h3>
            <p className="text-sm opacity-70 my-2">
                Please visit OpenAI documentation{" "}
                <a
                    href="https://platform.openai.com/docs/quickstart/add-your-api-key"
                    target="_blank"
                    className="underline"
                >
                    https://platform.openai.com/docs/quickstart/add-your-api-key
                </a>
            </p>

            <label>OpenAI API key</label>
            <TextArea
                defaultValue={apiKeyLS}
                placeholder="sk-..."
                onChange={setApiKey}
            />

            <Button label="Save" onClick={handleSubmit} />
        </div>
    );
}
