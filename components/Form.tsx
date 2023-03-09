import { useDebounce } from "@react-hooks-library/core";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import { Context } from "./Conversation/Context";
import { SwitchButton } from "./SwitchButton";

export interface IFormRef {
    content: string;
    setContent: (value: string) => void;
}

type TMode = "text" | "image";

export const Form: React.FC = () => {
    const { content, generateImage, generateMessage, isLoading, setContent } =
        useContext(Context);

    const [mode, setMode] = useState<TMode>("text");
    const [value, setValue] = useState<string>(content);

    const debouncedValue = useDebounce<string>(value, 500);

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value!);
    };

    useEffect(() => {
        setContent(debouncedValue);
    }, [debouncedValue]);

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
        <div className="mt-auto flex flex-col pb-8">
            <textarea
                title="Message"
                value={value}
                placeholder="What's your request?"
                className="resize-none w-full bg-transparent border border-1 p-2 my-2 h-[100px] text-[16px] rounded-none"
                disabled={isLoading}
                onChange={onMessageChange}
            />

            <p className="text-xs opacity-50 pb-1">Mode:</p>

            <div className="flex">
                <SwitchButton
                    defaultValue={mode}
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
