"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { ParseSentenceResponse } from "@/types/parser";

interface ParseTreeProps {
  data: ParseSentenceResponse;
}

// Accent color palette: light bg + dark border/line
const nodeColors = [
  { primary: "#0369a1", bg: "#e0f2fe", label: "主语" },    // sky-700 / sky-100
  { primary: "#047857", bg: "#d1fae5", label: "谓语" },    // emerald-600 / emerald-100
  { primary: "#6d28d9", bg: "#ede9fe", label: "宾语" },    // violet-600 / violet-100
  { primary: "#b45309", bg: "#fef3c7", label: "补语" },    // amber-600 / amber-100
];

const ParseTree = ({ data }: ParseTreeProps) => {
  const { subject, verb, object, complement } = data;

  const nodes = [
    {
      label: "主语",
      labelEn: "Subject",
      data: subject,
      colorIndex: 0,
      delay: 0,
    },
    {
      label: "谓语",
      labelEn: "Verb",
      data: verb,
      colorIndex: 1,
      delay: 120,
    },
    object && {
      label: "宾语",
      labelEn: "Object",
      data: object,
      colorIndex: 2,
      delay: 240,
    },
    complement && {
      label: "补语",
      labelEn: "Complement",
      data: complement,
      colorIndex: 3,
      delay: 360,
    },
  ].filter(Boolean) as Array<{
    label: string;
    labelEn: string;
    data: { text: string; type: string; role: string };
    colorIndex: number;
    delay: number;
  }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-6 font-medium">
        句式结构
      </p>

      {/* Node grid */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {nodes.map((node, i) => (
            <TreeNode key={node.label} node={node} index={i} total={nodes.length} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface TreeNodeProps {
  node: {
    label: string;
    labelEn: string;
    data: { text: string; type: string; role: string };
    colorIndex: number;
    delay: number;
  };
  index: number;
  total: number;
}

const TreeNode = ({ node, index, total }: TreeNodeProps) => {
  const [hovered, setHovered] = useState(false);
  const colors = nodeColors[node.colorIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: node.delay / 1000 + 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="relative flex items-stretch gap-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center mr-4 shrink-0">
        <div
          className="w-3 h-3 rounded-full border-2 border-white z-10 transition-transform duration-200"
          style={{
            backgroundColor: colors.primary,
            transform: hovered ? "scale(1.4)" : "scale(1)",
          }}
        />
        {index < total - 1 && (
          <div className="flex-1 w-px bg-border mt-1" />
        )}
      </div>

      {/* Content card */}
      <motion.div
        layout
        className="flex-1 p-5 rounded-lg border-l-[3px] transition-all duration-200 cursor-default"
        style={{
          backgroundColor: hovered ? colors.bg : "var(--secondary)",
          borderColor: colors.primary,
          borderTopWidth: "1px",
          borderRightWidth: "1px",
          borderBottomWidth: "1px",
        }}
      >
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded"
            style={{ color: colors.primary, backgroundColor: colors.bg }}
          >
            {node.label}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {node.labelEn}
          </span>
        </div>

        <motion.p
          layout
          className="text-xl text-foreground leading-snug mb-1 font-medium"
          style={{ color: hovered ? colors.primary : undefined }}
        >
          {node.data.text}
        </motion.p>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{node.data.type}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span className="text-xs text-muted-foreground">{node.data.role}</span>
        </div>

        {/* Expanded explanation on hover */}
        <motion.div
          initial={false}
          animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-3 mt-3 border-t border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {node.data.role}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export { ParseTree };
