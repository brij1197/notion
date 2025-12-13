// /api/completion
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: "system",
        content: `You are an AI writing assistant. When given a heading or title, start a new paragraph that relates to that topic. Write exactly ONE short, natural sentence that introduces or expands on the topic. Do not repeat the heading.`,
      },
      {
        role: "user",
        content: `Continue this text naturally: ${prompt}`,
      },
    ],
  });
  
  return result.toUIMessageStreamResponse();
}
