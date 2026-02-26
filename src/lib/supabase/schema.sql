-- ============================================================
-- MyChinaMed — Supabase Database Schema
-- ============================================================
--
-- HOW TO USE:
-- 1. Go to Supabase Dashboard → SQL Editor
-- 2. Click "New query"
-- 3. Paste this entire file
-- 4. Click "Run" (or Ctrl+Enter)
-- 5. After schema is created, run seed.sql to populate data
--
-- IMPORTANT: Run this BEFORE seed.sql.
-- Tables are created in dependency order (cities first, etc.)
-- ============================================================


-- =========================
-- 1. cities
-- =========================
CREATE TABLE cities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  name_en TEXT NOT NULL,
  name_zh TEXT,
  slug TEXT UNIQUE NOT NULL,

  description_en TEXT,
  description_zh TEXT,

  photos TEXT[] DEFAULT '{}',
  hospital_count INTEGER DEFAULT 0,
  top_specialties TEXT[] DEFAULT '{}',

  airport_code TEXT,
  travel_info_en TEXT,
  visa_info_en TEXT,

  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);


-- =========================
-- 2. hospitals
-- =========================
CREATE TABLE hospitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- basic info
  name_en TEXT NOT NULL,
  name_zh TEXT,
  name_ru TEXT,
  slug TEXT UNIQUE NOT NULL,

  -- location
  city_id UUID REFERENCES cities(id),
  address_en TEXT,
  address_zh TEXT,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),

  -- accreditation
  jci_accredited BOOLEAN DEFAULT false,
  grade TEXT CHECK (grade IN ('三甲', '三乙', '二甲', 'private', 'other')),
  temos_certified BOOLEAN DEFAULT false,
  iso_certified BOOLEAN DEFAULT false,

  -- international services
  international_dept BOOLEAN DEFAULT false,
  languages_supported TEXT[] DEFAULT '{}',

  -- content
  description_en TEXT,
  description_zh TEXT,
  description_ru TEXT,
  photos TEXT[] DEFAULT '{}',
  logo_url TEXT,
  website TEXT,

  -- stats
  bed_count INTEGER,
  annual_patients INTEGER,
  international_patients_annually INTEGER,

  -- status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- =========================
-- 3. doctors
-- =========================
CREATE TABLE doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,

  -- basic info
  name_en TEXT NOT NULL,
  name_zh TEXT,
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT,
  title_zh TEXT,

  -- specialty
  specialty TEXT NOT NULL,
  sub_specialty TEXT,

  -- qualifications
  education TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  years_experience INTEGER,
  treatments_performed INTEGER DEFAULT 0,

  -- ChinaMedScore
  china_med_score DECIMAL(3,1),
  score_breakdown JSONB DEFAULT '{}',

  -- personal
  avatar_url TEXT,
  bio_en TEXT,
  bio_zh TEXT,
  languages TEXT[] DEFAULT '{"zh"}',

  -- status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- =========================
-- 4. treatments
-- =========================
CREATE TABLE treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  category TEXT NOT NULL,
  /*
    category enum:
    dental, eye, oncology, tcm, orthopedic, cosmetic,
    fertility, cardiac, checkup, stem_cell, neurology, bariatric
  */

  name_en TEXT NOT NULL,
  name_zh TEXT,
  name_ru TEXT,
  slug TEXT UNIQUE NOT NULL,

  description_en TEXT,
  description_zh TEXT,
  description_ru TEXT,

  price_range_min INTEGER,
  price_range_max INTEGER,
  price_currency TEXT DEFAULT 'USD',

  duration_days_min INTEGER,
  duration_days_max INTEGER,
  recovery_days INTEGER,
  hospital_stay_required BOOLEAN DEFAULT false,

  seo_title TEXT,
  seo_description TEXT,

  popular BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- =========================
-- 5. doctor_treatments (junction)
-- =========================
CREATE TABLE doctor_treatments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  treatment_id UUID REFERENCES treatments(id) ON DELETE CASCADE,

  price_from INTEGER,
  price_to INTEGER,
  success_rate DECIMAL(5,2),
  procedures_count INTEGER DEFAULT 0,

  UNIQUE(doctor_id, treatment_id)
);


-- =========================
-- 6. reviews
-- =========================
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  doctor_id UUID REFERENCES doctors(id),
  hospital_id UUID REFERENCES hospitals(id),
  treatment_id UUID REFERENCES treatments(id),

  patient_name TEXT NOT NULL,
  patient_country TEXT,
  patient_avatar_url TEXT,

  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  content TEXT NOT NULL,

  verified BOOLEAN DEFAULT false,
  photos TEXT[] DEFAULT '{}',

  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT now()
);


-- =========================
-- 7. quotes (leads)
-- =========================
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  patient_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  treatment_interest TEXT,
  description TEXT,

  contact_method TEXT DEFAULT 'whatsapp' CHECK (contact_method IN ('whatsapp', 'telegram', 'email', 'phone')),
  contact_handle TEXT,

  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  assigned_coordinator TEXT,
  notes TEXT,

  source TEXT DEFAULT 'organic',
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- ============================================================
-- INDEXES
-- ============================================================

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


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Public read for active content
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

-- Quotes: public insert only (anonymous users submit), no read
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON quotes FOR INSERT WITH CHECK (true);
-- Admin reads via service_role key (bypasses RLS)


-- ============================================================
-- UPDATED_AT TRIGGER (auto-update timestamp)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_hospitals_updated_at
  BEFORE UPDATE ON hospitals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_treatments_updated_at
  BEFORE UPDATE ON treatments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
