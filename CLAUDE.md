# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

English Sentence Analyzer — a Next.js application that uses DeepSeek to analyze English sentence structure, identify grammatical components, and explain vocabulary.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI**: DeepSeek via OpenAI SDK (baseURL: https://api.deepseek.com)
- **Validation**: Zod v4

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm exec tsc --noEmit  # TypeScript type checking
```

## Key Paths

- `src/app/api/parse-sentence/route.ts` — Main API endpoint
- `src/lib/deepseek.ts` — DeepSeek client and prompts
- `src/types/parser.ts` — Zod schemas (request/response)
- `src/components/parser/` — Parser UI components
- `src/hooks/use-parser.ts` — API call hook

## Environment Variables

```bash
DEEPSEEK_API_KEY=your_api_key_here
```

## Architecture

1. **API Route** (`/api/parse-sentence`)
   - Receives JSON with `sentence` field
   - Validates with `ParseSentenceRequestSchema`
   - Calls DeepSeek with structured English grammar prompt
   - Validates response with `ParseSentenceResponseSchema`
   - Returns parsed structure, clauses, phrases, metadata (tense, voice, etc.) + vocabulary or error

2. **Response Schema** (`ParseSentenceResponseSchema`)
   - Core: subject, verb, object (optional), complement (optional)
   - Phrases: prepositional, infinitive, gerund, participial phrases
   - Clauses: main, subordinate, relative clauses
   - Metadata: sentenceType, tense, voice, clauseStructure
   - Vocabulary: words with POS and meaning

3. **shadcn/ui Components**
   - Initialized with `npx shadcn@latest init --defaults`
   - Components in `src/components/ui/`
   - Add new components: `npx shadcn@latest add <component>`
