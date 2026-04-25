# English Sentence Analyzer

英文句子结构分析工具 - 帮助程序员阅读和理解英文技术文档。

## 功能特点

- **句子分析** - 输入英文长难句，快速获取语法成分拆解
- **结构可视化** - 清晰展示主语、谓语、宾语、补语等句子成分
- **短语/从句分析** - 识别介词短语、不定式、动名词等结构
- **中文翻译** - 提供完整的中文翻译
- **词汇表** - 自动提取技术词汇，方便学习

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4 + shadcn/ui
- **AI**: DeepSeek API (通过 OpenAI SDK)
- **验证**: Zod v4
- **动画**: Framer Motion

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 类型检查
pnpm exec tsc --noEmit
```

## 环境变量

需要在 `.env.local` 文件中配置:

```bash
DEEPSEEK_API_KEY=your_api_key_here
```

## 项目结构

```
src/
├── app/
│   ├── api/parse-sentence/    # API 路由
│   ├── globals.css            # 全局样式
│   ├── layout.tsx             # 根布局
│   └── page.tsx               # 首页
├── components/
│   └── parser/                # 分析器组件
│       ├── parser-page.tsx    # 主页面
│       ├── sentence-input.tsx  # 输入框
│       ├── analysis-reveal.tsx # 结果展示
│       ├── parse-tree.tsx     # 句式结构
│       ├── phrase-section.tsx  # 短语分析
│       ├── clause-section.tsx  # 从句分析
│       └── vocabulary-section.tsx # 词汇表
├── hooks/
│   └── use-parser.ts          # 解析 Hook
├── lib/
│   └── deepseek.ts            # DeepSeek 客户端
└── types/
    └── parser.ts              # 类型定义
```

## 使用方法

1. 在输入框中输入英文句子
2. 按 Enter 或点击"分析"按钮
3. 查看分析结果:
   - **句式结构**: 主语、谓语、宾语、补语
   - **短语分析**: 介词短语、不定式等
   - **从句分析**: 主句、从句等
   - **中文翻译**: 完整中文翻译
   - **词汇表**: 技术词汇释义
