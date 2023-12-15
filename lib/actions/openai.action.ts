"use server";
import OpenAI from "openai";
import { fetchUserAICalls } from "./user.actions";
import { PLANS } from "@/app/utils/stripe";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { QuotaExceeded, UnauthorizedError } from "../types";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBulletList(
  userMessage: string
): Promise<StreamingTextResponse> {
  try {
    const user = await fetchUserAICalls();
    if (!user) {
      throw new UnauthorizedError("User not logged in", "auth");
    }

    const plan =
      PLANS.find((plan) => plan.price.priceIds.test === user.stripePriceId) ||
      PLANS[0];

    if (user.AICalls >= plan?.ai) {
      throw new QuotaExceeded("AI Quota Exceeded", "ai");
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are the best resume bullet point writer in the world. Your task is to assist users in crafting effective resume bullet points. Users will provide you with information about their job or role, and in response, you will generate 3-4 tailored bullet points including key words they mention, some statistics on their performance if possible, and their impact. These bullet points will be based on your deep knowledge of HR best practices, the most recent job application trends, and relevant software technologies. Your output will strictly consist of these bullet points in new line, without any additional sentences, hyphens or explanatory text.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 1.2,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true,
    });

    // if (!response || !response.id) {
    //   return { code: "error", message: "There was an error, please try again" };
    // }

    // return {
    //   code: "success",
    //   message: response.choices[0].message.content || userMessage,
    // };

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    throw new Error("There was an error, please try again");
  }
  // for await (const chunk of response) {
  //   console.log(chunk.choices[0].delta.content);
  // }
}
