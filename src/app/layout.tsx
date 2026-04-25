import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "English Sentence Analyzer",
  description: "英文句子结构分析",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
