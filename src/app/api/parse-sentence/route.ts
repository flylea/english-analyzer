import { NextRequest, NextResponse } from "next/server";
import { deepseek, PARSE_SYSTEM_PROMPT, buildParsePrompt } from "@/lib/deepseek";
import {
  ParseSentenceRequestSchema,
  ParseSentenceResponseSchema,
} from "@/types/parser";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  // 1. Parse and validate request body
  const body = await req.json().catch(() => null);

  const parseResult = ParseSentenceRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Invalid request",
        details: parseResult.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { sentence } = parseResult.data;

  // 2. Call DeepSeek API
  let rawResponse: string;

  try {
    // @ts-expect-error - thinking/reasoning_effort are DeepSeek-specific params
    const completion = await deepseek.client.chat.completions.create({
      model: "deepseek-v4-pro",
      messages: [
        { role: "system", content: PARSE_SYSTEM_PROMPT },
        { role: "user", content: buildParsePrompt(sentence) },
      ] as const,
      thinking: { type: "enabled" as const },
      reasoning_effort: "high" as const,
      stream: false as const,
      temperature: 0.1,
    });

    rawResponse =
      completion.choices[0]?.message?.content?.trim() ?? "";
  } catch (error) {
    console.error("[DeepSeek API Error]", error);
    return NextResponse.json(
      { error: "Failed to call DeepSeek API" },
      { status: 502 }
    );
  }

  // 3. Parse and validate response with Zod
  let parsedResponse: unknown;

  try {
    // Try to extract JSON from the response (in case there's extra text)
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON found in response");
    }
    parsedResponse = JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("[JSON Parse Error]", error, "Raw response:", rawResponse);
    return NextResponse.json(
      { error: "Failed to parse DeepSeek response" },
      { status: 502 }
    );
  }

  const validationResult = ParseSentenceResponseSchema.safeParse(
    parsedResponse
  );

  if (!validationResult.success) {
    console.error(
      "[Zod Validation Error]",
      validationResult.error.flatten(),
      "Parsed response:",
      parsedResponse
    );
    return NextResponse.json(
      { error: "Response validation failed", details: validationResult.error.flatten() },
      { status: 502 }
    );
  }

  // 4. Return validated response
  return NextResponse.json(validationResult.data);
}
