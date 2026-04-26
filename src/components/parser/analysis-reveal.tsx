"use client";

import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";
import { TypewriterText } from "./typewriter-text";
import { ParseTree } from "./parse-tree";
import { MetaTagBar } from "./meta-tag-bar";
import { PhraseSection } from "./phrase-section";
import { VocabularySection } from "./vocabulary-section";
import { ClauseSection } from "./clause-section";

interface AnalysisRevealProps {
  data: ParseSentenceResponse & { _input?: string };
  inputSentence: string;
}

const AnalysisReveal = ({ data, inputSentence }: AnalysisRevealProps) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    {/* ── Original sentence ── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-card rounded-lg border border-border p-6 shadow-sm"
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
        原始句子
      </p>

      <TypewriterText
        text={inputSentence}
        className="text-xl md:text-2xl text-foreground leading-snug font-medium"
      />

      <div className="mt-4 pt-4 border-t border-border flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          {data.sentenceType} · {data.clauseStructure}
        </span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          {data.tense} · {data.voice}
        </span>
      </div>
    </motion.div>

    {/* ── Chinese Translation ── */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-card rounded-lg border border-[#0369a1]/20 p-6 shadow-sm border-l-4"
    >
      <p className="text-xs uppercase tracking-wider text-[#0369a1] mb-3 font-medium">
        中文翻译
      </p>
      <p className="text-lg text-foreground leading-relaxed">
        {data.translation}
      </p>
    </motion.div>

    {/* ── Parse Tree ── */}
    <ParseTree data={data} />

    {/* ── Meta tag bar ── */}
    <MetaTagBar data={data} />

    {/* ── Phrases ── */}
    {data.phrases.length > 0 && (
      <PhraseSection phrases={data.phrases} />
    )}

    {/* ── Clauses ── */}
    {data.clauses.length > 0 && (
      <ClauseSection clauses={data.clauses} />
    )}

    {/* ── Vocabulary ── */}
    {data.vocabulary.length > 0 && (
      <VocabularySection vocabulary={data.vocabulary} />
    )}
  </motion.section>
);

export { AnalysisReveal };
