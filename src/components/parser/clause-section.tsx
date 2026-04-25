"use client";

import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";

interface ClauseSectionProps {
  clauses: ParseSentenceResponse["clauses"];
}

// Accent colors for clause types: light bg + dark left border
const clauseTypeColors: Record<string, { color: string; bg: string }> = {
  "Main": { color: "#0369a1", bg: "#e0f2fe" },       // sky
  "Subordinate": { color: "#047857", bg: "#d1fae5" }, // emerald
  "Relative": { color: "#6d28d9", bg: "#ede9fe" },    // violet
  "Adverbial": { color: "#b45309", bg: "#fef3c7" },   // amber
  "Noun": { color: "#0f766e", bg: "#ccfbf1" },        // teal
  "default": { color: "#64748b", bg: "#f1f5f9" },     // slate
};

function getClauseColor(type: string) {
  for (const key of Object.keys(clauseTypeColors)) {
    if (type.toLowerCase().includes(key.toLowerCase())) {
      return clauseTypeColors[key];
    }
  }
  return clauseTypeColors.default;
}

export function ClauseSection({ clauses }: ClauseSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          从句分析
        </p>
        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {clauses.length}
        </span>
      </div>

      <div className="space-y-4">
        {clauses.map((clause, i) => {
          const colors = getClauseColor(clause.type);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="relative pl-6 py-4 rounded-lg border-l-[3px]"
              style={{
                borderLeftColor: colors.color,
                backgroundColor: colors.bg,
              }}
            >
              {/* Type tag */}
              <span
                className="inline-block text-xs px-2 py-0.5 rounded mb-3 font-medium"
                style={{ color: colors.color, backgroundColor: "white" }}
              >
                {clause.type}
              </span>

              {/* Clause content */}
              <p className="text-lg text-foreground mb-2 leading-snug font-medium">
                {clause.content}
              </p>

              {/* Role */}
              <p className="text-xs text-muted-foreground leading-relaxed">
                {clause.role}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
