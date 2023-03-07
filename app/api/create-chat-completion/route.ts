import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export const CREATE_CHAT_COMPLETION_ROUTE = "/api/create-chat-completion";

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const { message } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: message,
            },
        ],
    });

    /*
        TypeScript Warning: Although Response.json() is valid, native TypeScript types
        currently shows an error, you can use NextResponse.json() for typed responses instead.
        Source: https://beta.nextjs.org/docs/routing/route-handlers
    */

    return NextResponse.json(response.data);
}
