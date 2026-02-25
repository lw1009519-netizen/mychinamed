# CLAUDE.md — MyChinaMed 项目规则

> Claude Code 每次启动时自动读取此文件。这里只放编码规则和快速参考。
> 详细设计看 DESIGN.md，数据库看 DATABASE.md，项目规划看 PROJECT.md。

## 项目简介

MyChinaMed (mychinamed.com) — 医疗旅游平台，连接国际患者与中国医院。

## 技术栈

- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **多语言**: next-intl（路径路由 /en /zh /ru）
- **数据库**: Supabase (PostgreSQL, Singapore region)
- **CMS**: Sanity（博客/指南）
- **部署**: Vercel + Cloudflare DNS
- **状态**: zustand
- **表单**: react-hook-form + zod
- **图标**: lucide-react
- **邮件**: Resend

## 编码规范

### 文件命名
- 组件: PascalCase (`Hero.tsx`, `ScoreBadge.tsx`)
- 工具/lib: camelCase (`supabase.ts`, `utils.ts`)
- 页面: `page.tsx` (Next.js App Router 约定)
- 类型: `types/index.ts` 集中管理

### 组件规范
- 所有组件用函数组件 + TypeScript
- Props 用 interface 定义，命名为 `XxxProps`
- 导出用 `export default` (页面) 或 `export function` (组件)
- 样式优先用 Tailwind class，复杂动画用 CSS
- 不要用 inline style 对象（区别于原型阶段）

### 多语言
- 所有面向用户的文本必须走 next-intl 的 `useTranslations()`
- 翻译文件在 `src/messages/{locale}.json`
- 数据库字段用 `name_en`, `name_zh`, `name_ru` 多语言列

### Git 提交
- 英文提交信息
- 格式: `feat: add hero section`, `fix: navbar scroll behavior`
- 每个功能模块单独提交

### 禁止事项
- ❌ 不要用 `any` 类型
- ❌ 不要在客户端组件暴露 `SUPABASE_SERVICE_ROLE_KEY`
- ❌ 不要 hardcode 颜色值，用 Tailwind 的自定义色板
- ❌ 不要用 Inter/Roboto/Arial 等通用字体
- ❌ 不要用 purple 渐变等 AI 生成感的配色

## 关键路径

```
src/app/[locale]/           → 多语言路由根
src/components/sections/    → 首页各区块组件
src/components/ui/          → 可复用 UI 组件
src/components/layout/      → Navbar, Footer, WhatsAppFloat
src/lib/supabase.ts         → 数据库客户端
src/messages/               → 翻译文件
```

## 环境变量

```
NEXT_PUBLIC_SUPABASE_URL    → Supabase 项目 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY → Supabase 公开 key
SUPABASE_SERVICE_ROLE_KEY   → 仅服务端使用
NEXT_PUBLIC_SITE_URL        → https://mychinamed.com
```

## 快速命令

```bash
npm run dev      # 本地开发 localhost:3000
npm run build    # 生产构建
npm run lint     # 代码检查
```
