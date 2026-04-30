"use client";

import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";

interface MetaTagBarProps {
  data: ParseSentenceResponse;
}

const tagConfig = [
  { key: "sentenceType", label: "句型", icon: "S" },
  { key: "tense", label: "时态", icon: "T" },
  { key: "voice", label: "语态", icon: "V" },
  { key: "clauseStructure", label: "结构", icon: "C" },
] as const;

const tagAccents = ["#0369a1", "#047857", "#6d28d9", "#b45309"];

const MetaTagBar = ({ data }: MetaTagBarProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.4 }}
    className="flex flex-wrap gap-2"
  >
    {tagConfig.map((tag, i) => {
      const value = data[tag.key as keyof ParseSentenceResponse] as string;
      const accent = tagAccents[i % tagAccents.length];

      return (
        <motion.div
          key={tag.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.5 + i * 0.06,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="group flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-default"
        >
          <div
            className="w-5 h-5 rounded flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: `${accent}15` }}
          >
            <span
              className="text-[9px] font-bold transition-colors duration-200 tracking-tight"
              style={{ color: accent }}
            >
              {tag.icon}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground leading-none">{tag.label}</span>
            <span className="text-sm font-medium text-foreground leading-none mt-0.5">
              {value}
            </span>
          </div>
        </motion.div>
      );
    })}
  </motion.div>
);

export { MetaTagBar };
