"use client";

import { cn } from "@/lib/utils";
import type { ParseSentenceResponse } from "@/types/parser";

interface StructureVisualizerProps {
  data: ParseSentenceResponse;
}

const StructureVisualizer = ({ data }: StructureVisualizerProps) => (
  <div className="space-y-8">
    {/* Core sentence diagram */}
    <div className="relative bg-slate-50/50 rounded-lg p-6 border border-slate-200">
      <div className="absolute -left-px top-0 bottom-0 w-1 bg-linear-to-b from-sky-400 via-sky-500 to-sky-400 rounded-full" />

      <div className="space-y-5">
        {data.subject && (
          <ComponentBlock
            label="Subject"
            data={data.subject}
            accent="text-sky-700"
            labelBg="bg-sky-100 text-sky-700"
          />
        )}
        {data.verb && (
          <ComponentBlock
            label="Verb"
            data={data.verb}
            accent="text-violet-700"
            labelBg="bg-violet-100 text-violet-700"
          />
        )}
        {data.object && (
          <ComponentBlock
            label="Object"
            data={data.object}
            accent="text-emerald-700"
            labelBg="bg-emerald-100 text-emerald-700"
          />
        )}
        {data.complement && (
          <ComponentBlock
            label="Complement"
            data={data.complement}
            accent="text-amber-700"
            labelBg="bg-amber-100 text-amber-700"
          />
        )}
      </div>
    </div>

    {/* Sentence metadata */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <MetaBadge label="Type" value={data.sentenceType} />
      <MetaBadge label="Tense" value={data.tense} />
      <MetaBadge label="Voice" value={data.voice} />
      <MetaBadge label="Structure" value={data.clauseStructure} />
    </div>

    {/* Clauses */}
    {data.clauses.length > 0 && (
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Clauses
        </h3>
        <div className="space-y-3">
          {data.clauses.map((clause, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-slate-100"
              style={{
                animationDelay: `${i * 80}ms`,
              }}
            >
              <span className="text-xs font-medium text-white bg-violet-500 px-2 py-1 rounded shrink-0 mt-0.5">
                {clause.type}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-slate-700 font-medium">{clause.content}</p>
                <p className="text-xs text-slate-400 mt-1">{clause.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Phrases */}
    {data.phrases.length > 0 && (
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Phrases
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.phrases.map((phrase, i) => (
            <div
              key={i}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all cursor-default"
              style={{
                animationDelay: `${i * 60}ms`,
              }}
            >
              <span className="text-sm font-mono text-sky-600">{phrase.text}</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500">{phrase.type}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

interface ComponentBlockProps {
  label: string;
  data: { text: string; type: string; role: string };
  accent: string;
  labelBg: string;
}

const ComponentBlock = ({ label, data, accent, labelBg }: ComponentBlockProps) => (
  <div
    className="group flex items-baseline gap-4 py-2"
    style={{
      animation: "slideUp 0.4s ease-out forwards",
      opacity: 0,
    }}
  >
    <span className={cn("text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded", labelBg)}>
      {label}
    </span>
    <div className="flex-1">
      <span className={cn("text-xl font-serif", accent, "group-hover:translate-x-1 transition-transform duration-300")}>
        {data.text}
      </span>
      <p className="text-xs text-slate-400 mt-1">
        {data.type} · {data.role}
      </p>
    </div>
  </div>
);

const MetaBadge = ({ label, value }: { label: string; value: string }) => (
  <div
    className="bg-white rounded-lg border border-slate-200 px-4 py-3 text-center"
    style={{
      animation: "slideUp 0.4s ease-out forwards",
      opacity: 0,
    }}
  >
    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-semibold text-slate-700">{value}</p>
  </div>
);

export { StructureVisualizer };
