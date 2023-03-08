import { useDebounce } from "@react-hooks-library/core";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button } from "./Button";
import { Context } from "./Conversation/Context";

export interface IFormRef {
    content: string;
    setContent: (value: string) => void;
}

export const Form: React.FC = () => {
    const { content, generateImage, generateMessage, isLoading, setContent } =
        useContext(Context);

    const [value, setValue] = useState<string>(content);

    const debouncedValue = useDebounce<string>(value, 500);

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value!);
    };

    useEffect(() => {
        setContent(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="mt-auto flex flex-col pb-3">
            <textarea
                title="Message"
                value={value}
                placeholder="What's your request?"
                className="resize-none w-full bg-transparent border border-1 p-2 my-2 h-[100px]"
                disabled={isLoading}
                onChange={onMessageChange}
            />

            <div className="flex justify-end">
                <Button
                    label="Generate image"
                    isDisabled={isLoading || content.length < 5}
                    className="mr-2"
                    onClick={() => generateImage()}
                />

                <Button
                    label="Send"
                    isDisabled={isLoading || content.length < 5}
                    onClick={() => generateMessage()}
                />
            </div>
        </div>
    );
};
