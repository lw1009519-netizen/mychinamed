export interface Hospital {
  id: string
  name_en: string
  name_zh: string | null
  name_ru: string | null
  slug: string
  city_id: string | null
  address_en: string | null
  address_zh: string | null
  jci_accredited: boolean
  grade: '三甲' | '三乙' | '二甲' | 'private' | 'other' | null
  temos_certified: boolean
  iso_certified: boolean
  international_dept: boolean
  languages_supported: string[]
  description_en: string | null
  description_zh: string | null
  description_ru: string | null
  photos: string[]
  logo_url: string | null
  website: string | null
  bed_count: number | null
  annual_patients: number | null
  international_patients_annually: number | null
  status: 'active' | 'draft' | 'archived'
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Doctor {
  id: string
  hospital_id: string | null
  name_en: string
  name_zh: string | null
  slug: string
  title_en: string | null
  title_zh: string | null
  specialty: string
  sub_specialty: string | null
  education: string[]
  certifications: string[]
  years_experience: number | null
  treatments_performed: number
  china_med_score: number | null
  score_breakdown: ScoreBreakdown | null
  avatar_url: string | null
  bio_en: string | null
  bio_zh: string | null
  languages: string[]
  status: 'active' | 'draft' | 'archived'
  featured: boolean
  created_at: string
  updated_at: string
}

export interface ScoreBreakdown {
  education: number
  experience: number
  reviews: number
  international: number
  languages: number
  hospital: number
  research: number
  value: number
}

export interface Treatment {
  id: string
  category: TreatmentCategory
  name_en: string
  name_zh: string | null
  name_ru: string | null
  slug: string
  description_en: string | null
  description_zh: string | null
  description_ru: string | null
  price_range_min: number | null
  price_range_max: number | null
  price_currency: string
  duration_days_min: number | null
  duration_days_max: number | null
  recovery_days: number | null
  hospital_stay_required: boolean
  popular: boolean
  status: string
  created_at: string
  updated_at: string
}

export type TreatmentCategory =
  | 'dental'
  | 'eye'
  | 'oncology'
  | 'tcm'
  | 'orthopedic'
  | 'cosmetic'
  | 'fertility'
  | 'cardiac'
  | 'checkup'
  | 'stem_cell'
  | 'neurology'
  | 'bariatric'

export interface Review {
  id: string
  doctor_id: string | null
  hospital_id: string | null
  treatment_id: string | null
  patient_name: string
  patient_country: string | null
  patient_avatar_url: string | null
  rating: number
  title: string | null
  content: string
  verified: boolean
  photos: string[]
  status: 'pending' | 'approved' | 'rejected'
  featured: boolean
  created_at: string
}

export interface Quote {
  id: string
  patient_name: string
  email: string
  phone: string | null
  treatment_interest: string | null
  description: string | null
  contact_method: 'whatsapp' | 'telegram' | 'email' | 'phone'
  contact_handle: string | null
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
  source: string
  source_page: string | null
  created_at: string
  updated_at: string
}

export interface City {
  id: string
  name_en: string
  name_zh: string | null
  slug: string
  description_en: string | null
  description_zh: string | null
  photos: string[]
  hospital_count: number
  top_specialties: string[]
  airport_code: string | null
  status: string
  created_at: string
}
