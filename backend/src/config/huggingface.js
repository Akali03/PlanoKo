import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

export const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HF_TOKEN,
});

