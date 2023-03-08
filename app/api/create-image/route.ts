import { NextResponse } from "next/server";
import { OpenAI } from "../../../utils/openai";

export const CREATE_IMAGE = "/api/create-image";

export async function POST(request: Request) {
    const { description } = await request.json();

    const response = await OpenAI.createImage({
        prompt: description,
        n: 1,
        size: "512x512",
    });

    /*
        TypeScript Warning: Although Response.json() is valid, native TypeScript types
        currently shows an error, you can use NextResponse.json() for typed responses instead.
        Source: https://beta.nextjs.org/docs/routing/route-handlers
    */

    return NextResponse.json(response.data);
}
