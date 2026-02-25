# DATABASE.md — MyChinaMed 数据库设计

> Supabase (PostgreSQL) | Region: Southeast Asia (Singapore)
> 所有表使用 UUID 主键，自动生成。
> 所有表带 created_at / updated_at 时间戳。
> 多语言字段用 _en, _zh, _ru 后缀。

---

## 表结构

### hospitals — 医院

```sql
CREATE TABLE hospitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 基本信息
  name_en TEXT NOT NULL,
  name_zh TEXT,
  name_ru TEXT,
  slug TEXT UNIQUE NOT NULL,           -- URL slug: "peking-union-medical-college"
  
  -- 位置
  city_id UUID REFERENCES cities(id),
  address_en TEXT,
  address_zh TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  
  -- 认证
  jci_accredited BOOLEAN DEFAULT false,
  grade TEXT CHECK (grade IN ('三甲', '三乙', '二甲', 'private', 'other')),
  temos_certified BOOLEAN DEFAULT false,
  iso_certified BOOLEAN DEFAULT false,
  
  -- 国际服务
  international_dept BOOLEAN DEFAULT false,
  languages_supported TEXT[] DEFAULT '{}',   -- ['en', 'zh', 'ru', 'ar']
  
  -- 内容
  description_en TEXT,
  description_zh TEXT,
  description_ru TEXT,
  photos TEXT[] DEFAULT '{}',                -- Cloudflare R2 URLs
  logo_url TEXT,
  website TEXT,
  
  -- 统计
  bed_count INTEGER,
  annual_patients INTEGER,
  international_patients_annually INTEGER,
  
  -- 状态
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### doctors — 医生

```sql
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
  
  -- 基本信息
  name_en TEXT NOT NULL,
  name_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT,                              -- "Chief Physician", "Professor"
  title_zh TEXT,
  
  -- 专业
  specialty TEXT NOT NULL,                    -- "dental", "oncology", "tcm" 等
  sub_specialty TEXT,                         -- "implantology", "CAR-T" 等
  
  -- 资质
  education TEXT[] DEFAULT '{}',              -- ['MD, Peking University', 'PhD, Johns Hopkins']
  certifications TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  treatments_performed INTEGER DEFAULT 0,
  
  -- ChinaMedScore™
  china_med_score DECIMAL(3,1),              -- 综合分 如 9.2
  score_breakdown JSONB DEFAULT '{}',
  /*
    score_breakdown 结构:
    {
      "education": 9.0,
      "experience": 9.5,
      "reviews": 8.8,
      "international": 8.0,
      "languages": 7.5,
      "hospital": 9.5,
      "research": 8.0,
      "value": 9.0
    }
  */
  
  -- 个人信息
  avatar_url TEXT,
  bio_en TEXT,
  bio_zh TEXT,
  languages TEXT[] DEFAULT '{"zh"}',          -- 掌握的语言
  
  -- 状态
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### treatments — 治疗项目

```sql
CREATE TABLE treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 分类
  category TEXT NOT NULL,                     -- 对应 12 个科室
  /*
    category 枚举:
    dental, eye, oncology, tcm, orthopedic, cosmetic,
    fertility, cardiac, checkup, stem_cell, neurology, bariatric
  */
  
  -- 信息
  name_en TEXT NOT NULL,
  name_zh TEXT,
  name_ru TEXT,
  slug TEXT UNIQUE NOT NULL,                  -- "dental-implant-single-tooth"
  
  description_en TEXT,
  description_zh TEXT,
  description_ru TEXT,
  
  -- 价格
  price_range_min INTEGER,                    -- USD
  price_range_max INTEGER,
  price_currency TEXT DEFAULT 'USD',
  
  -- 治疗信息
  duration_days_min INTEGER,                  -- 最短治疗天数
  duration_days_max INTEGER,
  recovery_days INTEGER,                      -- 恢复期天数
  hospital_stay_required BOOLEAN DEFAULT false,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  
  -- 状态
  popular BOOLEAN DEFAULT false,              -- 首页是否展示
  status TEXT DEFAULT 'active',
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### doctor_treatments — 医生-治疗关联

```sql
CREATE TABLE doctor_treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  treatment_id UUID REFERENCES treatments(id) ON DELETE CASCADE,
  
  price_from INTEGER,                         -- 该医生执行此治疗的价格区间
  price_to INTEGER,
  success_rate DECIMAL(5,2),                  -- 成功率 如 98.50
  procedures_count INTEGER DEFAULT 0,
  
  UNIQUE(doctor_id, treatment_id)
);
```

### reviews — 患者评价

```sql
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 关联
  doctor_id UUID REFERENCES doctors(id),
  hospital_id UUID REFERENCES hospitals(id),
  treatment_id UUID REFERENCES treatments(id),
  
  -- 患者信息
  patient_name TEXT NOT NULL,
  patient_country TEXT,                       -- ISO 2-letter: "US", "RU", "AE"
  patient_avatar_url TEXT,
  
  -- 评价内容
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,
  
  -- 验证
  verified BOOLEAN DEFAULT false,
  photos TEXT[] DEFAULT '{}',
  
  -- 状态
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### quotes — 报价请求（线索）

```sql
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- 患者信息
  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- 需求
  treatment_interest TEXT,                    -- category 或自由文本
  description TEXT,                           -- 病情描述
  
  -- 联系方式
  contact_method TEXT DEFAULT 'whatsapp' CHECK (contact_method IN ('whatsapp', 'telegram', 'email', 'phone')),
  contact_handle TEXT,                        -- WhatsApp/Telegram 号码
  
  -- 跟进
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  assigned_coordinator TEXT,
  notes TEXT,                                 -- 内部备注
  
  -- 来源追踪
  source TEXT DEFAULT 'organic',              -- organic, google_ads, social, referral
  source_page TEXT,                           -- 提交表单时的页面 URL
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### cities — 城市

```sql
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  name_en TEXT NOT NULL,
  name_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  
  description_en TEXT,
  description_zh TEXT,
  
  -- 信息
  photos TEXT[] DEFAULT '{}',
  hospital_count INTEGER DEFAULT 0,
  top_specialties TEXT[] DEFAULT '{}',
  
  -- 旅游信息
  airport_code TEXT,                          -- "PEK", "SHA"
  travel_info_en TEXT,
  visa_info_en TEXT,
  
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 索引

```sql
-- 常用查询优化
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_hospital ON doctors(hospital_id);
CREATE INDEX idx_doctors_score ON doctors(china_med_score DESC);
CREATE INDEX idx_doctors_featured ON doctors(featured) WHERE featured = true;

CREATE INDEX idx_treatments_category ON treatments(category);
CREATE INDEX idx_treatments_popular ON treatments(popular) WHERE popular = true;

CREATE INDEX idx_hospitals_city ON hospitals(city_id);
CREATE INDEX idx_hospitals_grade ON hospitals(grade);
CREATE INDEX idx_hospitals_featured ON hospitals(featured) WHERE featured = true;

CREATE INDEX idx_reviews_doctor ON reviews(doctor_id);
CREATE INDEX idx_reviews_hospital ON reviews(hospital_id);
CREATE INDEX idx_reviews_status ON reviews(status);

CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created ON quotes(created_at DESC);
```

---

## Row Level Security (RLS)

```sql
-- 公开读取（治疗、医院、医生、评价、城市）
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON hospitals FOR SELECT USING (status = 'active');

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON doctors FOR SELECT USING (status = 'active');

ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON treatments FOR SELECT USING (status = 'active');

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON reviews FOR SELECT USING (status = 'approved');

ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON cities FOR SELECT USING (status = 'active');

-- 报价表：仅允许插入（匿名用户提交），不允许读取
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON quotes FOR INSERT WITH CHECK (true);
-- 管理员读取需要通过 service_role key
```

---

## 种子数据

### 城市初始数据

```sql
INSERT INTO cities (name_en, name_zh, slug, airport_code) VALUES
  ('Beijing', '北京', 'beijing', 'PEK'),
  ('Shanghai', '上海', 'shanghai', 'PVG'),
  ('Guangzhou', '广州', 'guangzhou', 'CAN'),
  ('Shenzhen', '深圳', 'shenzhen', 'SZX'),
  ('Hangzhou', '杭州', 'hangzhou', 'HGH'),
  ('Chengdu', '成都', 'chengdu', 'CTU'),
  ('Xi''an', '西安', 'xian', 'XIY'),
  ('Changsha', '长沙', 'changsha', 'CSX');
```

### 治疗项目初始数据

```sql
INSERT INTO treatments (category, name_en, name_zh, slug, price_range_min, price_range_max, popular) VALUES
  ('dental',     'Dental Implant (Single)',    '单颗种植牙',    'dental-implant-single',   800,   3000,  true),
  ('dental',     'Full Mouth Implants',        '全口种植牙',    'full-mouth-implants',     8000,  20000, true),
  ('dental',     'Dental Veneers (per tooth)', '牙贴面（单颗）', 'dental-veneers',          300,   800,   false),
  ('eye',        'LASIK Surgery',              '近视激光手术',   'lasik-surgery',           1200,  2500,  true),
  ('eye',        'ICL Implant',                'ICL 晶体植入',  'icl-implant',             2500,  4000,  false),
  ('oncology',   'CAR-T Cell Therapy',         'CAR-T 细胞治疗', 'car-t-therapy',          30000, 80000, true),
  ('tcm',        'TCM Pain Management',        '中医疼痛调理',   'tcm-pain-management',    500,   3000,  true),
  ('tcm',        'Acupuncture Program',        '针灸疗程',      'acupuncture-program',     300,   2000,  false),
  ('orthopedic', 'Knee Replacement',           '膝关节置换',    'knee-replacement',        6000,  10000, true),
  ('orthopedic', 'Spinal Fusion',              '脊柱融合手术',   'spinal-fusion',          8000,  15000, false),
  ('cosmetic',   'Rhinoplasty',                '隆鼻手术',      'rhinoplasty',             2000,  5000,  true),
  ('cosmetic',   'Facelift',                   '面部提升',      'facelift',                3000,  8000,  false),
  ('fertility',  'IVF Cycle',                  '试管婴儿',      'ivf-cycle',               4000,  8000,  true),
  ('cardiac',    'Heart Bypass Surgery',       '心脏搭桥手术',   'heart-bypass',           10000, 25000, false),
  ('checkup',    'Executive Health Screening', '高端体检套餐',   'executive-health-check',  300,   2000,  true),
  ('stem_cell',  'Stem Cell Therapy',          '干细胞治疗',    'stem-cell-therapy',       5000,  25000, true),
  ('neurology',  'Deep Brain Stimulation',     '脑深部电刺激',   'deep-brain-stimulation', 15000, 25000, false),
  ('bariatric',  'Gastric Sleeve',             '胃袖状切除',    'gastric-sleeve',          5000,  12000, false);
```

---

## Supabase 客户端配置

### 服务端 (Server Component / API Route)

```ts
// src/lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js'

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // 服务端用 service_role
  )
}
```

### 客户端 (Client Component)

```ts
// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!  // 客户端只用 anon key
)
```

---

## 常用查询示例

### 获取首页特色医生（带医院名）

```ts
const { data } = await supabase
  .from('doctors')
  .select(`
    id, name_en, name_zh, slug, title_en, specialty,
    years_experience, treatments_performed,
    china_med_score, score_breakdown,
    avatar_url, languages,
    hospitals (name_en, name_zh, slug)
  `)
  .eq('featured', true)
  .eq('status', 'active')
  .order('china_med_score', { ascending: false })
  .limit(6)
```

### 获取热门治疗项目

```ts
const { data } = await supabase
  .from('treatments')
  .select('*')
  .eq('popular', true)
  .eq('status', 'active')
  .order('category')
```

### 提交报价表单

```ts
const { error } = await supabase
  .from('quotes')
  .insert({
    patient_name: formData.name,
    email: formData.email,
    treatment_interest: formData.treatment,
    contact_method: formData.contactMethod,
    contact_handle: formData.contactHandle,
    description: formData.description,
    source_page: window.location.pathname
  })
```
