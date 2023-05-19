import { Button, SwitchButton, TextArea } from "@honzachalupa/design-system";
import { useDebounce } from "@react-hooks-library/core";
import { useContext, useEffect, useState } from "react";
import { ConversationContext } from "../contexts/Conversation";

export interface IFormRef {
    content: string;
    setContent: (value: string) => void;
}

type TMode = "text" | "image";

export const Form: React.FC = () => {
    const { content, generateImage, generateMessage, isLoading, setContent } =
        useContext(ConversationContext);

    const [mode, setMode] = useState<TMode>("text");
    const [debouncedValue, setValue] = useState<string>(content);

    const value = useDebounce<string>(debouncedValue, 100);

    useEffect(() => {
        setContent(value);

        if (value.includes("image") || value.includes("picture")) {
            setMode("image");
        }
    }, [value]);

    useEffect(() => {
        if (!content) {
            setValue(content);
        }
    }, [content]);

    const handleSubmit = () => {
        if (mode === "text") {
            generateMessage();
        } else if (mode === "image") {
            generateImage();
        }
    };

    return (
        <div className="flex flex-col mb-5">
            <TextArea
                defaultValue={value}
                placeholder="What's your request?"
                isDisabled={isLoading}
                onChange={setValue}
            />

            <p className="text-xs opacity-50 py-1">
                What type of response do you want to receive?
            </p>

            <div className="flex">
                <SwitchButton
                    value={mode}
                    options={[
                        {
                            value: "text",
                            label: "Text",
                        },
                        {
                            value: "image",
                            label: "Image",
                        },
                    ]}
                    className="basis-2/3 mr-1"
                    onChange={setMode}
                />

                <Button
                    label="Send"
                    isDisabled={isLoading || content.length < 5}
                    className="basis-1/3 ml-1"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};
