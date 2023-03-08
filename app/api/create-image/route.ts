import { NextResponse } from "next/server";
import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from "openai";

export const CREATE_IMAGE = "/api/create-image";

export async function POST(request: Request) {
    const {
        apiKey,
        data: { description, size },
    } = await request.json();

    const configuration = new Configuration({
        apiKey,
    });

    const OpenAI = new OpenAIApi(configuration);

    const response = await OpenAI.createImage({
        prompt: description,
        n: 1,
        size: `${size}x${size}` as CreateImageRequestSizeEnum,
    });

    /*
        TypeScript Warning: Although Response.json() is valid, native TypeScript types
        currently shows an error, you can use NextResponse.json() for typed responses instead.
        Source: https://beta.nextjs.org/docs/routing/route-handlers
    */

    return NextResponse.json(response.data);
}
