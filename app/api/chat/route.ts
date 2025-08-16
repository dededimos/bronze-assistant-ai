import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return NextResponse.json({ reply: completion.choices[0].message });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'Chat error', details: err.message },
      { status: 500 }
    );
  }
}
