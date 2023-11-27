"use server";
import OpenAI from "openai";
import { fetchUser } from "./user.actions";
import { PLANS } from "@/app/utils/stripe";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Codes = "success" | "error" | "limitExceeded";

export async function generateBulletList(
  userMessage: string
): Promise<{ code: Codes; message: string }> {
  const user = await fetchUser();
  const plan =
    PLANS.find((plan) => plan.price.priceIds.test === user.stripePriceId) ||
    PLANS[0];

  if (user.AICalls >= plan?.ai) {
    return {
      code: "limitExceeded",
      message: "You have used all AI calls in your plan. Please Upgrade",
    };
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
    // stream: true,
  });

  // const response = {
  //   id: "someResponse",
  //   choices: [{ message: { content: userMessage } }],
  // };

  if (!response || !response.id) {
    return { code: "error", message: "There was an error, please try again" };
  }

  return {
    code: "success",
    message: response.choices[0].message.content || userMessage,
  };
  // for await (const chunk of response) {
  //   console.log(chunk.choices[0].delta.content);
  // }
}
