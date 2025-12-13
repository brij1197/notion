import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import OpenAI from 'openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImagePrompt(name: string) {
  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: "system",
          content: `You are a creative and helpful AI Assistant capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALL-E API to generate a thumbnail. The description should be minimalistic and flat styled`,
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for a note with the title '${name}'`,
        },
      ],
    });
    return text;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openaiClient.images.generate({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const image_url = response.data?.[0]?.url;
    return image_url as string;
  } catch (error) {
    console.log(error);
  }
}
