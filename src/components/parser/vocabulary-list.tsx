"use client";

import { cn } from "@/lib/utils";
import type { ParseSentenceResponse } from "@/types/parser";

interface VocabularyListProps {
  vocabulary: ParseSentenceResponse["vocabulary"];
}

export function VocabularyList({ vocabulary }: VocabularyListProps) {
  if (vocabulary.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
        Vocabulary
      </h3>
      <div className="grid gap-3">
        {vocabulary.map((item, i) => (
          <VocabularyCard key={i} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

interface VocabularyCardProps {
  item: ParseSentenceResponse["vocabulary"][number];
  index: number;
}

function VocabularyCard({ item, index }: VocabularyCardProps) {
  return (
    <div
      className={cn(
        "group relative p-5 bg-white border border-slate-200 rounded-lg",
        "hover:border-sky-300 hover:shadow-md transition-all duration-300",
        "cursor-default"
      )}
      style={{
        animation: "slideUp 0.4s ease-out forwards",
        opacity: 0,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none rounded-lg" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-lg font-serif text-slate-800">
              {item.word}
            </span>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              {item.pos}
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {item.meaning}
          </p>
        </div>

        {/* Decorative dot */}
        <div className="w-2 h-2 rounded-full bg-sky-400/50 group-hover:bg-sky-400 transition-colors duration-300 shrink-0 mt-2" />
      </div>
    </div>
  );
}
