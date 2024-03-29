// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt missing" });
  }

  if (prompt.length > 100) {
    return res.status(400).json({ error: "Prompt too long" });
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `translate into traditional japanese more than 800 words..\n
    Topic: ${prompt}\n
    travel recommendation:`,
    max_tokens: 1500,
    temperature: 0.6,
    presence_penalty: 0,
    frequency_penalty: 0.1,
  });

  const quote = completion.data.choices[0].text;

  res.status(200).json({ quote });
}
