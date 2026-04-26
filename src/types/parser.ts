import { z } from "zod/v4";

/**
 * Request schema for sentence parsing
 */
export const ParseSentenceRequestSchema = z.object({
  sentence: z.string().min(1).max(500, "Sentence too long"),
});

export type ParseSentenceRequest = z.infer<typeof ParseSentenceRequestSchema>;

/**
 * Grammar component schema
 */
export const ComponentSchema = z.object({
  text: z.string().describe("The text of this component"),
  type: z.string().describe("Component type: Subject, Verb, Object, Complement, Adverbial, etc."),
  role: z.string().describe("Grammatical role explanation"),
});

/**
 * Clause schema
 */
export const ClauseSchema = z.object({
  type: z.string().describe("Clause type: Main Clause, Subordinate Clause, Relative Clause, etc."),
  content: z.string().describe("The content/text of the clause"),
  role: z.string().describe("What role this clause plays in the sentence"),
});

/**
 * Phrase schema
 */
export const PhraseSchema = z.object({
  text: z.string().describe("The text of the phrase"),
  type: z.string().describe("Phrase type: Prepositional Phrase, Infinitive, Gerund, Participle, etc."),
  role: z.string().describe("What role this phrase plays"),
});

/**
 * Full sentence analysis response
 */
export const ParseSentenceResponseSchema = z.object({
  // Core sentence components
  subject: ComponentSchema,
  verb: ComponentSchema,
  object: ComponentSchema.nullable().optional().describe("Direct object, if present"),
  complement: ComponentSchema.nullable().optional().describe("Subject or object complement"),

  // Translation
  translation: z.string().describe("Chinese translation of the full sentence"),

  // Phrases and clauses
  phrases: z.array(PhraseSchema).default([]),
  clauses: z.array(ClauseSchema).default([]),

  // Analysis
  sentenceType: z.string().describe("Declarative, Interrogative, Imperative, Exclamatory"),
  tense: z.string().describe("Present Simple, Past Continuous, etc."),
  voice: z.string().describe("Active or Passive voice"),
  clauseStructure: z.string().describe("Simple, Compound, Complex, Compound-Complex"),

  // Word-level analysis for vocabulary
  vocabulary: z
    .array(
      z.object({
        word: z.string(),
        pos: z.string().describe("Part of speech: noun, verb, adjective, etc."),
        meaning: z.string().describe("Meaning in current context"),
      })
    )
    .default([]),
});

export type ParseSentenceResponse = z.infer<typeof ParseSentenceResponseSchema>;
