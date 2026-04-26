import OpenAI from "openai";

/**
 * Lazy-initialized DeepSeek client.
 * Validates API key at first use, not at module load time.
 */
let _deepseek: OpenAI | null = null;

function getDeepseekClient(): OpenAI {
  if (!_deepseek) {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("DEEPSEEK_API_KEY environment variable is not set");
    }
    _deepseek = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }
  return _deepseek;
}

// Export a getter instead of the client directly
export const deepseek = {
  get client() {
    return getDeepseekClient();
  },
};

/**
 * System prompt for English sentence structure analysis
 */
export const PARSE_SYSTEM_PROMPT = `You are a professional English grammar analyzer. Analyze the given English sentence and provide a detailed breakdown of its grammatical structure.

Return ONLY valid JSON in this exact format:

{
  "subject": {"text": "主语", "type": "词性", "role": "语法作用"},
  "verb": {"text": "动词", "type": "词性", "role": "语法作用"},
  "object": {"text": "宾语", "type": "词性", "role": "语法作用"},
  "complement": null,
  "translation": "中文翻译",
  "phrases": [],
  "clauses": [],
  "sentenceType": "句型",
  "tense": "时态",
  "voice": "语态",
  "clauseStructure": "结构",
  "vocabulary": [{"word": "单词", "pos": "词性", "meaning": "含义"}]
}

Important rules:
- object and complement must be null (not omit)
- Return ONLY JSON, no extra text
- translation is required
- vocabulary is optional, max 3 items
- Keep explanations concise`;

/**
 * Build user prompt for parsing a sentence
 */
export function buildParsePrompt(sentence: string): string {
  return `Please analyze the grammatical structure of this sentence: ${sentence}`;
}
