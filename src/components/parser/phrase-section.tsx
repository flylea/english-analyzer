"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";

interface PhraseSectionProps {
  phrases: ParseSentenceResponse["phrases"];
}

// Accent colors for phrase types: light bg + dark border/line
const phraseTypeColors: Record<string, { color: string; bg: string }> = {
  "Prepositional": { color: "#0369a1", bg: "#e0f2fe" },   // sky
  "Infinitive": { color: "#047857", bg: "#d1fae5" },     // emerald
  "Gerund": { color: "#6d28d9", bg: "#ede9fe" },         // violet
  "Participle": { color: "#b45309", bg: "#fef3c7" },     // amber
  "Noun": { color: "#0f766e", bg: "#ccfbf1" },           // teal
  "default": { color: "#64748b", bg: "#f1f5f9" },        // slate
};

const getPhraseColor = (type: string) => {
  for (const key of Object.keys(phraseTypeColors)) {
    if (type.toLowerCase().includes(key.toLowerCase())) {
      return phraseTypeColors[key];
    }
  }
  return phraseTypeColors.default;
};

const PhraseSection = ({ phrases }: PhraseSectionProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          短语分析
        </p>
        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {phrases.length}
        </span>
      </div>

      <div className="space-y-3">
        {phrases.map((phrase, i) => {
          const colors = getPhraseColor(phrase.type);
          const isExpanded = expanded === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07 }}
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-4 rounded-lg border-l-[3px] hover:bg-muted/50 transition-all duration-200 text-left group"
                style={{
                  borderLeftColor: colors.color,
                  borderTopWidth: "1px",
                  borderRightWidth: "1px",
                  borderBottomWidth: "1px",
                  borderColor: "var(--border)",
                }}
              >
                {/* Phrase text - full width on mobile */}
                <span className="text-base sm:text-lg text-foreground group-hover:text-foreground transition-colors flex-1 w-full">
                  {phrase.text}
                </span>

                {/* Type badge and expand icon - below text on mobile, right side on desktop */}
                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <span
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{ color: colors.color, backgroundColor: colors.bg }}
                  >
                    {phrase.type}
                  </span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-auto text-muted-foreground"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              {/* Expanded role description */}
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <p className="text-xs mb-1 font-medium" style={{ color: colors.color }}>语法作用</p>
                    <p className="text-sm text-foreground leading-relaxed">{phrase.role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export { PhraseSection };
