import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "./Button";

interface IProps {
    conversationRef: any;
}

export interface IFormRef {
    content: string;
    setContent: (value: string) => void;
}

export const Form: React.FC<IProps> = forwardRef(({ conversationRef }, ref) => {
    const [content, setContent] = useState<string>("");

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value!);
    };

    useImperativeHandle(
        ref,
        (): IFormRef => ({
            content,
            setContent,
        })
    );

    return (
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
                    onClick={() => conversationRef.current?.handleSendMessage()}
                />
            </div>
        </div>
    );
});

Form.displayName = "Form";
