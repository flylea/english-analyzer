"use client";

import { useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
}

const TypewriterText = ({ text, className, speed = 30 }: TypewriterTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    // Reset index immediately
    indexRef.current = 0;

    if (!containerRef.current) return;

    // Clear any existing animation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set initial cursor
    const cursor = document.createElement("span");
    cursor.className = "inline-block w-[2px] h-[1em] bg-foreground ml-1 align-middle animate-pulse";
    containerRef.current.textContent = "";
    containerRef.current.appendChild(cursor);

    // Start animation loop
    intervalRef.current = setInterval(() => {
      if (!containerRef.current) return;

      const currentIndex = indexRef.current;
      const currentText = textRef.current;

      if (currentIndex < currentText.length) {
        indexRef.current = currentIndex + 1;

        // Remove cursor, update text, re-append cursor
        if (containerRef.current.contains(cursor)) {
          cursor.remove();
        }
        containerRef.current.textContent = currentText.slice(0, currentIndex + 1);
        containerRef.current.appendChild(cursor);
      } else {
        // Done - remove cursor after a short pause
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeout(() => {
          if (containerRef.current?.contains(cursor)) {
            cursor.remove();
          }
        }, 800);
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, speed]);

  return <span ref={containerRef} className={className} />;
};

export { TypewriterText };
