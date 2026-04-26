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

All output MUST be in Chinese (中文), including explanations of clauses, phrases, and vocabulary meanings.

Return ONLY valid JSON in this exact format, with no additional text:

{
  "subject": {"text": "主语", "type": "名词短语", "role": "动作的执行者"},
  "verb": {"text": "主要动词", "type": "及物动词", "role": "执行的行动"},
  "object": {"text": "直接宾语", "type": "名词短语", "role": "动作的承受者"},
  "complement": {"text": "补语", "type": "形容词短语", "role": "描述宾语"},
  "translation": "句子的中文翻译",
  "phrases": [
    {"text": "介词短语内容", "type": "介词短语", "role": "提供时间/地点等附加信息"}
  ],
  "clauses": [
    {"type": "主句", "content": "从句内容", "role": "主要陈述"}
  ],
  "sentenceType": "陈述句",
  "tense": "一般过去时",
  "voice": "主动语态",
  "clauseStructure": "简单句",
  "vocabulary": [
    {"word": "difficult", "pos": "形容词", "meaning": "困难的，需要努力的"}
  ]
}

Rules:
- Return ONLY JSON, no prefix or suffix text
- object and complement are optional - omit if not present
- translation is required - provide accurate Chinese translation
- phrases and clauses arrays can be empty
- vocabulary should include words that might be unfamiliar to English learners
- All explanations, types, and roles MUST be in Chinese
- clauseStructure values: 简单句, 并列句, 复合句, 并列复合句`;

/**
 * Build user prompt for parsing a sentence
 */
export function buildParsePrompt(sentence: string): string {
  return `Please analyze the grammatical structure of this sentence: ${sentence}`;
}
