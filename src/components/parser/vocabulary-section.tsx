"use client";

import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";

interface VocabularySectionProps {
  vocabulary: ParseSentenceResponse["vocabulary"];
}

// Rotating accent colors for vocabulary cards
const accentColors = [
  { primary: "#0369a1", bg: "#e0f2fe" },   // sky
  { primary: "#047857", bg: "#d1fae5" },    // emerald
  { primary: "#6d28d9", bg: "#ede9fe" },    // violet
  { primary: "#b45309", bg: "#fef3c7" },    // amber
  { primary: "#0f766e", bg: "#ccfbf1" },    // teal
  { primary: "#be185d", bg: "#fce7f3" },     // pink
];

const VocabularySection = ({ vocabulary }: VocabularySectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.65 }}
    className="bg-card rounded-lg border border-border p-6"
  >
    <div className="flex items-center gap-2 mb-6">
      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        词汇表
      </p>
      <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
        {vocabulary.length}
      </span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {vocabulary.map((item, i) => {
        const colors = accentColors[i % accentColors.length];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.75 + i * 0.05,
              duration: 0.3,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="group flex items-start gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-default"
            style={{
              borderLeftWidth: "3px",
              borderLeftColor: colors.primary,
            }}
          >
            {/* Word */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                <span
                  className="text-base sm:text-lg font-medium transition-colors"
                  style={{ color: colors.primary }}
                >
                  {item.word}
                </span>
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                  style={{ color: colors.primary, backgroundColor: colors.bg }}
                >
                  {item.pos}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.meaning}
              </p>
            </div>

            {/* Decorative dot */}
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 mt-2 transition-colors"
              style={{ backgroundColor: colors.primary }}
            />
          </motion.div>
        );
      })}
    </div>
  </motion.div>
);

export { VocabularySection };
