import { createClient } from '@supabase/supabase-js'

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ---- Hospitals ----

export async function getHospitals(city?: string) {
  const supabase = getClient()
  let query = supabase
    .from('hospitals')
    .select(`
      id, name_en, name_zh, slug, grade,
      jci_accredited, temos_certified, iso_certified,
      international_dept, languages_supported,
      bed_count, description_en, description_zh, website, featured,
      city_id,
      cities ( id, name_en, name_zh, slug )
    `)
    .eq('status', 'active')
    .order('featured', { ascending: false })
    .order('name_en')

  if (city) {
    const { data: cityData } = await supabase
      .from('cities')
      .select('id')
      .eq('slug', city)
      .single()
    if (cityData) {
      query = query.eq('city_id', cityData.id)
    }
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getHospitalBySlug(slug: string) {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select(`
      *,
      cities ( id, name_en, name_zh, slug, airport_code )
    `)
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getFeaturedHospitals(limit = 6) {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select(`
      id, name_en, name_zh, slug, grade,
      jci_accredited, international_dept, bed_count,
      description_en, description_zh, featured,
      city_id,
      cities ( id, name_en, name_zh, slug )
    `)
    .eq('status', 'active')
    .eq('featured', true)
    .order('name_en')
    .limit(limit)

  if (error) throw error
  return data ?? []
}

export async function getPopularTreatments(limit = 8) {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('treatments')
    .select('*')
    .eq('status', 'active')
    .eq('popular', true)
    .order('category')
    .order('name_en')
    .limit(limit)

  if (error) throw error
  return data ?? []
}

// ---- Cities ----

export async function getCities() {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('status', 'active')
    .order('hospital_count', { ascending: false })

  if (error) throw error
  return data ?? []
}

// ---- Treatments ----

export async function getTreatments(category?: string) {
  const supabase = getClient()
  let query = supabase
    .from('treatments')
    .select('*')
    .eq('status', 'active')
    .order('popular', { ascending: false })
    .order('category')
    .order('name_en')

  if (category) {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getTreatmentBySlug(slug: string) {
  const supabase = getClient()
  const { data, error } = await supabase
    .from('treatments')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}
