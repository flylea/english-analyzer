"use client";

import { useState } from "react";
import type {
  ParseSentenceRequest,
  ParseSentenceResponse,
} from "@/types/parser";

type ParserState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ParseSentenceResponse & { _input: string } }
  | { status: "error"; message: string };

export function useParser() {
  const [state, setState] = useState<ParserState>({ status: "idle" });

  async function parse(sentence: string) {
    setState({ status: "loading" });

    try {
      const body: ParseSentenceRequest = { sentence };

      const res = await fetch("/api/parse-sentence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({
          status: "error",
          message: data.error ?? "分析失败，请重试",
        });
        return;
      }

      setState({
        status: "success",
        data: { ...(data as ParseSentenceResponse), _input: sentence },
      });
    } catch {
      setState({ status: "error", message: "网络错误，请检查连接后重试" });
    }
  }

  function reset() {
    setState({ status: "idle" });
  }

  return { state, parse, reset };
}
