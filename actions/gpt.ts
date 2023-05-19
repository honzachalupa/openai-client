import { callAPI } from "@/utils/api";
import { IGptMessage } from "@honzachalupa/admin";

const generateMessage = (
    content: IGptMessage["content"],
    history?: IGptMessage[]
) =>
    callAPI("POST", "/api/openai/gpt", {
        body: {
            message: {
                role: "user",
                content,
            },
            history,
        },
    });

const generateImage = (prompt: string) =>
    callAPI("POST", "/api/openai/image", {
        body: {
            prompt,
        },
    });

export const GPTActions = { generateMessage, generateImage };
