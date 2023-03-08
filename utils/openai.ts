import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const OpenAI = new OpenAIApi(configuration);

export { OpenAI };
