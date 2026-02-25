# DESIGN.md — MyChinaMed 设计规范

> 所有前端组件必须严格遵循此文件的设计规范。
> 整体风格：高端医疗 × 编辑杂志感 × 精致极简主义。
> 绝对避免：AI 生成感（紫色渐变、过度发光、圆角卡通风格）。

---

## 色板 Color Palette

### Tailwind 自定义配置

```js
// tailwind.config.ts → theme.extend.colors
colors: {
  brand: {
    DEFAULT: '#0d4f3c',   // 主色 - 深绿（信任 + 专业）
    dark: '#0a3e2f',      // 深色变体（hover/active）
    light: '#e6f5ef',     // 浅色背景
  },
  accent: {
    DEFAULT: '#34d399',   // 强调色 - 翡翠绿
    warm: '#f59e0b',      // 暖色点缀（评分星星）
  },
  text: {
    primary: '#0f172a',   // 主要文字
    secondary: '#475569', // 次要文字
    muted: '#94a3b8',     // 辅助说明
    inverse: '#ffffff',   // 深色背景上的文字
  },
  bg: {
    white: '#ffffff',
    soft: '#fafbfc',      // 交替区块背景
    subtle: '#f8fafc',    // 卡片背景
  },
  dark: {
    DEFAULT: '#0f172a',   // 深色区块（评价、footer）
    card: '#1e293b',      // 深色区块内的卡片
  },
  score: {
    excellent: '#0d7c5f', // ChinaMedScore ≥ 9.0
    good: '#1a6fb5',      // ChinaMedScore ≥ 8.0
    fair: '#b5851a',      // ChinaMedScore < 8.0
  }
}
```

### 使用规则
- 主色只用于 CTA 按钮、链接 hover、重要标题下划线
- 深色区块用 `dark.DEFAULT` 作为 background
- 页面背景交替使用 `bg.white` 和 `bg.soft`，每个 section 交替
- 不要大面积使用 accent 绿色，它只做点缀

---

## 字体 Typography

### 字体加载

```ts
// src/app/[locale]/layout.tsx
import { DM_Serif_Display, Source_Sans_3, DM_Mono } from 'next/font/google'

const heading = DM_Serif_Display({ weight: '400', subsets: ['latin'], variable: '--font-heading' })
const body = Source_Sans_3({ subsets: ['latin'], variable: '--font-body' })
const mono = DM_Mono({ weight: '400', subsets: ['latin'], variable: '--font-mono' })
```

### Tailwind 配置

```js
// tailwind.config.ts → theme.extend.fontFamily
fontFamily: {
  heading: ['var(--font-heading)', 'Georgia', 'serif'],
  body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-mono)', 'monospace'],
}
```

### 字号规范

| 元素 | 字体 | 字号 | 字重 | 行高 |
|------|------|------|------|------|
| H1 (Hero标题) | font-heading | text-5xl / md:text-6xl | 400 | leading-tight |
| H2 (区块标题) | font-heading | text-3xl / md:text-4xl | 400 | leading-tight |
| H3 (卡片标题) | font-heading | text-xl / md:text-2xl | 400 | leading-snug |
| Body (正文) | font-body | text-base / md:text-lg | 400 | leading-relaxed |
| Small (辅助) | font-body | text-sm | 400 | leading-normal |
| Score (评分数字) | font-mono | text-2xl | 400 | leading-none |
| CTA 按钮 | font-body | text-base | 600 | — |
| Nav 链接 | font-body | text-sm | 500 | — |

### 中文回退
中文内容使用 `"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif` 作为 fallback。

---

## 组件样式 Components

### 按钮 Buttons

```
主按钮 (Primary):
  bg-brand text-white rounded-xl px-8 py-4
  hover:bg-brand-dark transition-all duration-200
  font-body font-semibold text-base
  shadow-sm hover:shadow-md

次按钮 (Secondary):
  bg-white text-brand border border-brand rounded-xl px-8 py-4
  hover:bg-brand-light transition-all duration-200

文字按钮 (Ghost):
  text-brand hover:text-brand-dark underline-offset-4
  hover:underline transition-all duration-200
```

### 卡片 Cards

```
基础卡片:
  bg-white rounded-2xl border border-slate-200
  p-6 md:p-8
  hover:shadow-lg hover:-translate-y-1
  transition-all duration-300 ease-out

深色卡片（在深色区块内）:
  bg-dark-card rounded-2xl
  p-6 md:p-8
  border border-slate-700
```

### 圆角规范
- 按钮: `rounded-xl` (12px)
- 卡片: `rounded-2xl` (16px)
- 大区块/图片: `rounded-3xl` (24px)
- 头像: `rounded-full`
- 输入框: `rounded-xl`

### 阴影规范
```
默认: shadow-sm
Hover: shadow-lg
弹窗: shadow-2xl
```

### 输入框 Input

```
bg-white rounded-xl border border-slate-200
px-4 py-3 text-base font-body
focus:border-brand focus:ring-2 focus:ring-brand/20
placeholder:text-text-muted
transition-colors duration-200
```

---

## ChinaMedScore™ 徽章

### 样式规范

```tsx
// 评分等级
≥ 9.0 → bg-score-excellent text-white → 标签 "Outstanding"
≥ 8.0 → bg-score-good text-white     → 标签 "Very Good"
< 8.0 → bg-score-fair text-white      → 标签 "Good"

// 徽章结构
<div className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5">
  <span className="font-mono text-lg font-bold">{score}</span>
  <span className="text-xs font-body font-medium opacity-90">{label}</span>
</div>
```

### 评分维度（满分 10 分）
1. 教育背景 (Education) — 学历、进修、学术头衔
2. 执业年限 (Experience) — 年限 + 手术量
3. 患者评价 (Reviews) — 评分 + 评价数
4. 国际接诊量 (International) — 国际患者比例
5. 语言能力 (Languages) — 英文/其他外语
6. 医院等级 (Hospital) — 三甲/JCI 认证加分
7. 科研发表 (Research) — 论文、专利
8. 性价比 (Value) — 价格 vs 同类水平

综合分 = 各维度加权平均

---

## 首页 12 区块设计

### 1. Navbar
```
固定顶部 | 白色背景 | 滚动后加毛玻璃效果
左: Logo (文字 "MyChinaMed" font-heading text-brand)
中: 导航链接 (Treatments, Hospitals, Doctors, Pricing, Reviews)
右: 语言切换 + "Get Free Quote" 主按钮
高度: h-16 md:h-20
z-index: z-50
滚动效果: bg-white/80 backdrop-blur-lg shadow-sm
```

### 2. Hero
```
布局: 左右分栏 (lg:grid-cols-2)
左侧:
  - 小标题: "Trusted Medical Tourism Platform" (text-sm text-brand font-semibold uppercase tracking-wider)
  - 大标题: "World-Class Medical Care in China, at a Fraction of the Cost" (font-heading text-5xl md:text-6xl)
  - 副标题: 一句话说明 (text-lg text-text-secondary)
  - 信任数据: "2,000+ Patients | 50+ Hospitals | 100% Free"
  - CTA 按钮组: "Get Free Quote" (主) + "Browse Treatments" (次)

右侧:
  - 搜索卡片 (白色 rounded-3xl shadow-2xl p-8)
  - "Find Your Treatment" 标题
  - 治疗类型下拉
  - 城市下拉
  - 预算范围 slider
  - "Search" 按钮

背景: bg-gradient-to-br from-brand-light to-white
```

### 3. Trust Bar
```
全宽深色背景 bg-dark py-4
Marquee 无限滚动
内容: JCI Accredited | TEMOS Certified | ISO 9001 | Grade III-A Hospitals | Stripe Secure | GDPR | 24/7 Support | 100% Free
每项之间用 · 或 | 分隔
文字: text-sm text-slate-400 font-body
滚动速度: 适中，不要太快造成焦虑感
```

### 4. Specialties Grid
```
区块标题: "Find Treatment by Specialty" (居中)
副标题: "Explore China's top medical specialties with savings up to 70%"
布局: grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6
默认显示 8 个热门，"View All Specialties" 展开全部 12 个

治疗数据（12个科室）:
  dental       | 🦷 | Dental & Implants       | 价格 $800-3,000
  eye          | 👁️ | Eye & LASIK             | 价格 $1,200-2,500
  oncology     | 🎗️ | Oncology & CAR-T        | 价格 $30,000-80,000
  tcm          | 🌿 | Traditional Chinese Med  | 价格 $500-5,000
  orthopedic   | 🦴 | Orthopedic & Spine      | 价格 $5,000-15,000
  cosmetic     | ✨ | Cosmetic Surgery        | 价格 $2,000-10,000
  fertility    | 👶 | Fertility & IVF         | 价格 $4,000-8,000
  cardiac      | ❤️ | Cardiac Surgery         | 价格 $10,000-30,000
  checkup      | 🩺 | Health Screening        | 价格 $300-2,000
  stem_cell    | 🧬 | Stem Cell Therapy       | 价格 $5,000-25,000
  neurology    | 🧠 | Neurology               | 价格 $8,000-25,000
  bariatric    | ⚖️ | Weight Loss Surgery     | 价格 $5,000-12,000

卡片样式:
  bg-white rounded-2xl p-6
  左侧 emoji 图标 (text-3xl)
  科室名称 (font-heading text-lg)
  "From $XXX" 价格 (text-brand font-mono)
  hover: shadow-lg -translate-y-1
```

### 5. Top Doctors
```
区块标题: "Top-Rated Doctors" (居中)
副标题: "Verified specialists with ChinaMedScore™ ratings"
布局: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
显示 6 位医生

医生卡片结构:
  - 头像 (w-20 h-20 rounded-full border-2 border-brand-light)
  - ChinaMedScore™ 徽章 (右上角绝对定位)
  - 姓名 (font-heading text-xl)
  - 头衔 + 医院名
  - 科室标签 (inline badges)
  - "XX years experience · XXX treatments"
  - "View Profile →" 链接

"View All Doctors" 按钮在底部
```

### 6. Pricing Comparison
```
区块标题: "Save Up to 70% Compared to Western Countries"
6 国价格对比表格
列: Treatment | 🇺🇸 USA | 🇬🇧 UK | 🇩🇪 Germany | 🇹🇭 Thailand | 🇮🇳 India | 🇨🇳 China
中国列高亮: bg-brand-light font-bold

行:
  Dental Implant  | $3,000-5,000 | $2,500-4,000 | $2,000-3,500 | $1,200-2,000 | $600-1,500  | $800-1,500 ✨
  LASIK           | $4,000-6,000 | $3,000-5,000 | $2,500-4,000 | $1,500-2,500 | $800-1,500  | $1,200-2,000 ✨
  Knee Replace    | $30k-50k     | $15k-25k     | $12k-20k     | $8k-12k      | $5k-8k      | $6k-10k ✨
  CAR-T           | $400k-500k   | $350k-400k   | $300k-380k   | N/A           | N/A         | $30k-80k ✨
  IVF             | $15k-25k     | $8k-12k      | $5k-8k       | $4k-6k       | $3k-5k      | $4k-8k ✨
  Health Check    | $2k-5k       | $1k-3k       | $800-2k      | $400-800      | $200-500    | $300-1k ✨

设计: 
  响应式 — 手机端横向滚动
  表头粘性固定
  中国列用绿色竖条标注
  底部加 "Prices are estimates" 的 disclaimer
```

### 7. Reviews
```
深色背景 bg-dark
区块标题: "What Our Patients Say" (text-white, 居中)
副标题: "Verified reviews from real patients" (text-slate-400)
布局: 3 列滚动卡片 (可轮播)

评价卡片:
  bg-dark-card rounded-2xl p-6 border border-slate-700
  顶部: 5星评分 (⭐ text-accent-warm)
  引用文字 (text-slate-200 italic)
  底部: 患者名字 + 国家旗帜 + 治疗项目
  "Verified Patient ✓" 标签

数据:
  - Sarah M. 🇺🇸 | Dental Implants | ⭐⭐⭐⭐⭐ | "Saved over $15,000..."
  - Алексей К. 🇷🇺 | Stem Cell | ⭐⭐⭐⭐⭐ | "The doctors were incredibly professional..."
  - Mohammed A. 🇦🇪 | Health Screening | ⭐⭐⭐⭐⭐ | "Five-star hospital experience..."
  - Yuki T. 🇯🇵 | TCM Treatment | ⭐⭐⭐⭐ | "Traditional approach with modern facilities..."
  - Anna S. 🇩🇪 | LASIK | ⭐⭐⭐⭐⭐ | "Perfect vision after 20 years of glasses..."
  - Priya R. 🇮🇳 | Cardiac | ⭐⭐⭐⭐⭐ | "World-class cardiac care at affordable price..."
```

### 8. How It Works
```
背景: bg-soft
区块标题: "How It Works" (居中)
副标题: "From first inquiry to full recovery — we handle everything"
4 步流程，水平排列 (md)，垂直排列 (mobile)
步骤之间有连接线/箭头

Step 1: 📋 "Tell Us What You Need"
  → 填写简单表单描述你的需求

Step 2: 🏥 "Get Matched"
  → 我们的医疗顾问为你匹配最佳医院和医生

Step 3: ✈️ "Travel & Treat"
  → 我们安排签证、机票、住宿、翻译全程服务

Step 4: 😊 "Recover & Review"
  → 术后跟踪，随时联系你的专属顾问

样式:
  每步一个圆形图标 (w-16 h-16 rounded-full bg-brand-light text-brand)
  步骤编号 (font-mono text-xs)
  标题 (font-heading text-xl)
  描述 (text-text-secondary text-sm)
```

### 9. Patient Manager CTA
```
背景: bg-brand (全宽深绿)
左侧: 顾问真人头像 (圆形大头照)
右侧:
  标题: "Still Unsure? Talk to a Real Person" (text-white font-heading text-3xl)
  描述: "Our medical coordinators speak your language and guide you every step." (text-white/80)
  CTA: "Chat on WhatsApp" 按钮 (bg-white text-brand)
  或 "Send Us a Message" 次按钮
```

### 10. Quote Form
```
背景: bg-soft
区块标题: "Get Your Free Quote"
副标题: "Tell us about your needs. No obligations, 100% free."

表单字段:
  - Full Name (text input)
  - Email (email input)
  - Treatment Interest (select dropdown — 12 个科室)
  - Preferred Contact (radio: WhatsApp / Telegram / Email)
  - WhatsApp/Telegram Number (text input, 条件显示)
  - Describe Your Condition (textarea, 可选)
  - "Get Free Quote" 提交按钮

布局: 2 列 (md)，单列 (mobile)
表单右侧/下方: 信任信息
  - "🔒 Your information is secure and confidential"
  - "⏰ We respond within 24 hours"
  - "💰 100% free, no hidden fees"

表单卡片: bg-white rounded-3xl shadow-xl p-8 md:p-12
```

### 11. Footer
```
背景: bg-dark
4 列布局:
  列1 — Logo + 简介 + 社交图标
  列2 — Treatments (链接列表)
  列3 — Company (About, Contact, Careers, Privacy, Terms)
  列4 — Support (FAQ, Guide, WhatsApp, Telegram)

底部: © 2026 MyChinaMed. All rights reserved.
文字: text-slate-400
链接 hover: text-white
```

### 12. Floating WhatsApp
```
固定右下角 fixed bottom-6 right-6 z-50
绿色圆形按钮 bg-[#25d366] w-14 h-14 rounded-full
WhatsApp 图标 (白色)
hover: scale-110 shadow-lg
动画: 轻微弹跳吸引注意 (首次加载后 3 秒播放一次)
点击: 跳转 https://wa.me/你的号码?text=Hi, I'd like to get a free quote
```

---

## 动画规范

### 滚动动画 (IntersectionObserver)
```
进入视口时:
  opacity: 0 → 1
  translateY: 20px → 0
  duration: 600ms
  ease: ease-out
  stagger: 子元素间隔 100ms

不要过度动画。只在以下元素使用:
  - Section 标题首次出现
  - 卡片网格首次出现
  - 数据统计数字（可加 count-up 效果）
```

### Hover 动画
```
卡片: -translate-y-1 shadow-lg (duration-300)
按钮: 颜色加深 + shadow (duration-200)
链接: underline + 颜色变化 (duration-200)
```

### 不要使用
- ❌ 旋转动画
- ❌ 弹跳过大的动画
- ❌ 连续循环动画（Marquee 除外）
- ❌ 页面切换全屏过渡
- ❌ 3D 翻转效果

---

## 响应式断点

```
mobile:  < 768px  (默认)
tablet:  md (768px)
desktop: lg (1024px)
wide:    xl (1280px)
ultra:   2xl (1536px)

内容最大宽度: max-w-7xl mx-auto (1280px)
Section 内边距: px-4 md:px-8 lg:px-16 py-16 md:py-24
```

## 图片规范

- 所有图片使用 Next.js `<Image>` 组件
- 格式: WebP 优先，fallback PNG
- 医生头像: 200x200px, 圆形裁剪
- 医院照片: 16:9 比例, max 800px width
- 使用 `placeholder="blur"` 占位
- 不要使用库存图片的 watermark 版本
