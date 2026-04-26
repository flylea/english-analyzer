"use client";

import { useState, useRef, type SubmitEvent} from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface SentenceInputProps {
  onSubmit: (sentence: string) => void;
  isLoading: boolean;
}

const SentenceInput = ({ onSubmit, isLoading }: SentenceInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || isLoading) return;
      onSubmit(trimmed);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
        <label htmlFor="sentence-input" className="sr-only">
          输入英文句子
        </label>
        <textarea
          id="sentence-input"
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="输入英文句子，按 Enter 分析..."
          disabled={isLoading}
          className="w-full min-h-25 resize-none bg-transparent border-none outline-none
            text-lg text-foreground placeholder:text-muted-foreground
            leading-relaxed focus:ring-0
            disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ height: "auto" }}
        />

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {value.length} / 200
            </span>
            {value.trim() && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                按 Enter 发送
              </motion.span>
            )}
          </div>

          <Button
            type="submit"
            disabled={!value.trim() || isLoading}
            size="sm"
          >
            {isLoading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 border border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                分析中
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                分析
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export { SentenceInput };
