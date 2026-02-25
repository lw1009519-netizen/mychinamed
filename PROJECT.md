# PROJECT.md — MyChinaMed 项目规划

## 商业模式

### 我们是谁
MyChinaMed 是面向国际患者的中国医疗旅游平台。患者通过我们的网站找到中国医院和医生，获取免费报价，我们提供全程协调服务。

### 收入来源
1. **医院佣金** (主要): 成功转化的患者，向医院收取 10-20% 佣金
2. **VIP 增值服务**: 翻译陪诊 $200-500/天、签证协助 $100-300、旅行规划 $200-800
3. **医院 SaaS 会员** (后期): 医院付费获得优先展示、数据分析 $500-5000/月

### 对患者完全免费
这是核心卖点。反复强调 "Our service is 100% free. You pay only the hospital directly."

---

## 目标市场

### 一级市场（优先）
- **中亚**: 哈萨克斯坦、乌兹别克斯坦 — 地理近，医疗资源匮乏
- **东南亚**: 印尼、菲律宾、越南 — 人口大，医疗需求旺盛
- **中东**: 阿联酋、沙特 — 高消费力，愿意出境就医

### 二级市场
- **俄罗斯**: 大量存量需求，偏好中医和干细胞
- **欧美**: 追求性价比的中产，特别是牙科和 CAR-T

### 语言优先级
英语 → 中文 → 俄语 → 阿拉伯语 → 日语

---

## 竞品分析与差异化

### 从 Bookimed 学习的
- 治疗项目为入口的信息架构（SEO 友好 URL）
- 每个 procedure 页带价格范围
- 验证评价系统（正面+负面都展示）
- "完全免费"定位
- 12 个语言版本（我们先做 3 个）

### 从 Qunomedical 学习的
- **Qunoscore 评分系统** → 我们做 ChinaMedScore™
- 以医生为中心（而非只有医院）
- Patient Manager 人设（真人照片+亲切文案）
- 76% 流量来自 organic search 的内容策略
- 信任矩阵（Google评分、行业奖项、安全认证、投资人背书）

### 我们的独有差异化
1. **ChinaMedScore™** — 20+维度医生评分系统，透明展示算分过程
2. **视频优先** — 医院实拍、医生采访、患者 vlog（竞品都是图文为主）
3. **AI 预诊工具** — 症状评估 → 推荐治疗 → 推荐医院（竞品没有）
4. **中医特色专区** — 中国独有优势，竞品几乎不涉及
5. **实时沟通** — WhatsApp/Telegram 5分钟内响应（竞品还在用表单+电话）
6. **Medical Trip Planner** — 签证+机票+酒店+旅游一键打包

---

## 核心功能清单

### 首页 Homepage
- Hero 区（搜索入口 + CTA）
- 信任标识滚动条
- 治疗专科网格（12个科室）
- 顶级医生展示（带 ChinaMedScore）
- 6国价格对比表
- 验证患者评价
- 4步流程说明
- 个人医疗顾问 CTA
- 报价表单
- Footer

### 治疗项目页 /treatments
- 列表页: 按科室分类的治疗项目
- 详情页: 治疗介绍、适应症、价格范围、推荐医生、相关评价

### 医院页 /hospitals
- 列表页: 按城市/科室筛选
- 详情页: 医院介绍、科室、医生列表、认证信息、患者评价、位置地图

### 医生页 /doctors
- 列表页: 按科室/城市筛选
- Profile 页: ChinaMedScore™、个人介绍、治疗数量、经验年限、评价、预约入口

### 价格对比页 /pricing
- 交互式对比表格，可按治疗类型筛选

### 评价页 /reviews
- 所有验证评价，可按治疗类型/城市筛选

### 就医指南 /guide
- 签证信息、支付方式、就医流程、文化须知

### 博客 /blog
- Cost Guides（核心 SEO 内容）
- 患者故事
- 医疗资讯

### 报价页 /get-quote
- 核心转化页，完整表单 + 信任元素

---

## 开发路线图

### Phase 1: MVP 上线（第 1-4 周）
**目标**: 网站能跑通，能接收询盘

- [x] 域名注册 (mychinamed.com)
- [x] 基础设施搭建 (GitHub/Vercel/Supabase/Cloudflare)
- [ ] Next.js 项目初始化 + 多语言配置
- [ ] 首页完整实现（12个区块）
- [ ] 报价表单（前端+后端+邮件通知）
- [ ] WhatsApp/Telegram 集成
- [ ] 基础 SEO（sitemap、robots.txt、meta tags、schema markup）
- [ ] 英文版上线
- [ ] Vercel 部署 + 域名绑定

### Phase 2: 内容填充（第 5-6 周）
**目标**: 有真实数据，建立信任

- [ ] 治疗项目列表页 + 详情页
- [ ] 医院列表页 + 详情页
- [ ] 医生列表页 + Profile 页（含 ChinaMedScore）
- [ ] 录入 10-20 家医院数据
- [ ] 录入 30-50 个医生 profile
- [ ] 5 篇核心 Cost Guide（dental/LASIK/stem cell/screening/CAR-T）
- [ ] 中文版翻译上线
- [ ] Google Analytics + Search Console 接入

### Phase 3: 建立信任（第 7-8 周）
**目标**: 开始获取真实流量和询盘

- [ ] ChinaMedScore™ 评分算法实现
- [ ] 患者评价系统
- [ ] 俄语版上线
- [ ] 价格对比交互工具
- [ ] 就医指南完整页面
- [ ] 性能优化（Core Web Vitals）
- [ ] Beta 测试 + 反馈迭代

### Phase 4: 规模化（第 9-12 周）
- [ ] AI 预诊工具
- [ ] 视频内容矩阵
- [ ] 阿拉伯语版本
- [ ] 医院 SaaS 后台
- [ ] 付费广告投放
- [ ] 更多内容产出（每周 2-3 篇博客）

---

## SEO 策略

### 核心关键词
- "dental implants in China cost"
- "CAR-T therapy China price"
- "stem cell treatment China"
- "health checkup China cost"
- "medical tourism China"
- "LASIK surgery China"
- "traditional Chinese medicine for foreigners"

### 内容计划
- **Cost Guides**: "[Treatment] in China: Complete Cost Guide 2026" — 每个治疗项目一篇
- **City Guides**: "Medical Tourism in [City]: Top Hospitals & Treatments" — 每个城市一篇
- **Comparison**: "China vs [Country] for [Treatment]: Price & Quality Comparison"
- **Patient Stories**: 真实案例改写

### 技术 SEO
- SSG 静态生成（医院/医生/治疗页）
- ISR 增量更新
- JSON-LD schema（MedicalOrganization, Physician, Review, FAQPage）
- Sitemap 自动生成
- Canonical URL 含 locale
- OpenGraph + Twitter Card 元数据
- Core Web Vitals 优化（LCP < 2.5s, CLS < 0.1）

---

## 转化漏斗

```
搜索引擎/社交媒体
    ↓
着陆页（首页/治疗页/Cost Guide）
    ↓
浏览医生/医院/价格对比 → 建立信任
    ↓
报价表单 / WhatsApp / Telegram → 获取线索
    ↓
医疗协调员跟进 → 制定方案
    ↓
患者来华治疗 → 医院收费 → 我们拿佣金
```

每个页面都要有清晰的 CTA（Call to Action），引导用户走到下一步。
