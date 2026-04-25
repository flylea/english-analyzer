"use client";

import { AnimatePresence, motion } from "motion/react";
import { useParser } from "@/hooks/use-parser";
import { SentenceInput } from "@/components/parser/sentence-input";
import { AnalysisReveal } from "@/components/parser/analysis-reveal";

export function ParserPage() {
  const { state, parse, reset } = useParser();

  return (
    <main className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Minimal icon mark */}
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-semibold text-sm">EA</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground leading-none">
                English Analyzer
              </h1>
            </div>
          </div>

          <AnimatePresence>
            {state.status !== "idle" && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={reset}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                重新分析
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Main ── */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Input */}
        <section className="mb-8">
          <SentenceInput
            onSubmit={parse}
            isLoading={state.status === "loading"}
          />
        </section>

        {/* Results */}
        <AnimatePresence mode="wait">
          {state.status === "loading" && (
            <LoadingState key="loading" />
          )}
          {state.status === "success" && (
            <AnalysisReveal
              key="result"
              data={state.data}
              inputSentence={
                (state as { data: { _input?: string } }).data._input ?? ""
              }
            />
          )}
          {state.status === "error" && (
            <ErrorState key="error" message={state.message} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function LoadingState() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Sentence skeleton */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <div className="animate-shimmer h-6 rounded w-3/4 mb-3" />
        <div className="animate-shimmer h-4 rounded w-1/2" />
      </div>

      {/* Parse skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 50, duration: 0.2 }}
            className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-3"
          >
            <div className="animate-shimmer h-3 rounded w-16" />
            <div className="animate-shimmer h-6 rounded w-full" />
            <div className="animate-shimmer h-3 rounded w-24" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-card rounded-lg border border-destructive/30 p-8 text-center shadow-sm"
    >
      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-destructive">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">{message}</p>
    </motion.div>
  );
}
