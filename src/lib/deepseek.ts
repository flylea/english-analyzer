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

Return ONLY valid JSON in this exact format, with no additional text:

{
  "subject": {"text": "the subject", "type": "Noun Phrase", "role": "performer of the action"},
  "verb": {"text": "the main verb", "type": "Transitive Verb", "role": "the action performed"},
  "object": {"text": "the direct object", "type": "Noun Phrase", "role": "receiver of the action"},
  "complement": {"text": "the complement", "type": "Adjective Phrase", "role": "describes the object"},
  "translation": "Chinese translation of the full sentence",
  "phrases": [
    {"text": "prepositional phrase", "type": "Prepositional", "role": "provides additional info about time"}
  ],
  "clauses": [
    {"type": "Main Clause", "content": "the main clause content", "role": "main statement"}
  ],
  "sentenceType": "Declarative",
  "tense": "Past Simple",
  "voice": "Active",
  "clauseStructure": "Simple",
  "vocabulary": [
    {"word": "difficult", "pos": "adjective", "meaning": "hard to do, requiring effort"}
  ]
}

Rules:
- Return ONLY JSON, no prefix or suffix text
- object and complement are optional - omit if not present
- translation is required - provide accurate Chinese translation
- phrases and clauses arrays can be empty
- vocabulary should include words that might be unfamiliar to English learners
- Be precise with grammatical terminology
- clauseStructure values: Simple, Compound, Complex, Compound-Complex`;

/**
 * Build user prompt for parsing a sentence
 */
export function buildParsePrompt(sentence: string): string {
  return `Please analyze the grammatical structure of this sentence: ${sentence}`;
}
