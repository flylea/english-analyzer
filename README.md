# English Sentence Analyzer

A web application that helps programmers read and understand English technical documentation by analyzing sentence structure.

## Features

- **Sentence Analysis** - Input long English sentences and get instant grammar breakdown
- **Structure Visualization** - Clear display of subject, verb, object, complement
- **Phrase/Clause Analysis** - Identify prepositional phrases, infinitives, gerunds, etc.
- **Chinese Translation** - Complete translation of the sentence
- **Vocabulary List** - Automatically extract technical terms for learning

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **AI**: DeepSeek API (via OpenAI SDK)
- **Validation**: Zod v4
- **Animation**: Framer Motion

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm exec tsc --noEmit
```

## Environment Variables

Configure in `.env.local`:

```bash
DEEPSEEK_API_KEY=your_api_key_here
```

## Project Structure

```
src/
├── app/
│   ├── api/parse-sentence/    # API routes
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   └── parser/                # Parser components
│       ├── parser-page.tsx    # Main page
│       ├── sentence-input.tsx  # Input field
│       ├── analysis-reveal.tsx # Results display
│       ├── parse-tree.tsx     # Sentence structure
│       ├── phrase-section.tsx  # Phrase analysis
│       ├── clause-section.tsx  # Clause analysis
│       └── vocabulary-section.tsx # Vocabulary list
├── hooks/
│   └── use-parser.ts          # Parser hook
├── lib/
│   └── deepseek.ts            # DeepSeek client
└── types/
    └── parser.ts              # Type definitions
```

## Usage

1. Enter an English sentence in the input field
2. Press Enter or click "Analyze"
3. View analysis results:
   - **Sentence Structure**: Subject, verb, object, complement
   - **Phrase Analysis**: Prepositional phrases, infinitives, etc.
   - **Clause Analysis**: Main clause, subordinate clauses, etc.
   - **Chinese Translation**: Full translation
   - **Vocabulary**: Technical terms with definitions
