import { getHospitals, getCities } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import { Building2, Globe, ShieldCheck, Bed, ChevronRight, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface HospitalsPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: HospitalsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'hospitalsPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/hospitals`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/en/hospitals`,
      languages: {
        en: `${SITE_URL}/en/hospitals`,
        zh: `${SITE_URL}/zh/hospitals`,
        ru: `${SITE_URL}/ru/hospitals`,
      },
    },
  }
}

interface HospitalRow {
  id: string
  name_en: string
  name_zh: string | null
  slug: string
  grade: string | null
  jci_accredited: boolean
  temos_certified: boolean
  iso_certified: boolean
  international_dept: boolean
  languages_supported: string[]
  bed_count: number | null
  description_en: string | null
  description_zh: string | null
  website: string | null
  featured: boolean
  city_id: string | null
  cities: { id: string; name_en: string; name_zh: string | null; slug: string }[] | null
}

export default async function HospitalsPage({ params }: HospitalsPageProps) {
  const locale = params.locale
  const t = await getTranslations({ locale, namespace: 'hospitalsPage' })

  const [hospitals, cities] = await Promise.all([
    getHospitals() as Promise<HospitalRow[]>,
    getCities(),
  ])

  const grouped = cities.map((city) => ({
    city,
    hospitals: hospitals.filter((h) => h.city_id === city.id),
  })).filter((g) => g.hospitals.length > 0)

  const isZh = locale === 'zh'

  const cityGradients: Record<string, string> = {
    beijing: 'from-red-500 to-orange-400',
    shanghai: 'from-blue-500 to-cyan-400',
    guangzhou: 'from-emerald-500 to-teal-400',
    shenzhen: 'from-violet-500 to-purple-400',
    hangzhou: 'from-green-500 to-lime-400',
    chengdu: 'from-amber-500 to-yellow-400',
    xian: 'from-rose-500 to-pink-400',
    changsha: 'from-indigo-500 to-blue-400',
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-light to-white px-4 py-16 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-heading text-4xl text-text-primary md:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t('subtitle', { count: hospitals.length, cities: cities.length })}
          </p>
        </div>
      </section>

      {/* Hospital list grouped by city */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-16">
          {grouped.map(({ city, hospitals: cityHospitals }) => {
            const gradient = cityGradients[city.slug] ?? 'from-slate-500 to-slate-400'

            return (
              <div key={city.id}>
                {/* City header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${gradient}`} />
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-heading text-2xl text-text-primary md:text-3xl">
                        <MapPin className="mr-1 -mt-0.5 inline h-5 w-5 text-text-muted" />
                        {isZh ? (city.name_zh ?? city.name_en) : city.name_en}
                      </h2>
                      {!isZh && city.name_zh && (
                        <span className="text-lg text-text-muted">{city.name_zh}</span>
                      )}
                      {isZh && (
                        <span className="text-lg text-text-muted">{city.name_en}</span>
                      )}
                      <span className="rounded-full bg-brand-light px-3 py-0.5 text-xs font-medium text-brand">
                        {t('hospitalCount', { count: cityHospitals.length })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {cityHospitals.map((hospital) => (
                    <Link
                      key={hospital.id}
                      href={`/hospitals/${hospital.slug}` as '/hospitals'}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    >
                      {/* Gradient top bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                      <div className="flex flex-1 flex-col p-6">
                        {/* Name */}
                        <h3 className="font-heading text-lg text-text-primary group-hover:text-brand">
                          {isZh ? (hospital.name_zh ?? hospital.name_en) : hospital.name_en}
                        </h3>
                        <p className="mt-0.5 text-sm text-text-muted">
                          {isZh ? hospital.name_en : hospital.name_zh}
                        </p>

                        {/* Badges */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {hospital.grade && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-brand-light px-2 py-0.5 text-xs font-medium text-brand">
                              <Building2 className="h-3 w-3" />
                              {hospital.grade}
                            </span>
                          )}
                          {hospital.jci_accredited && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              <ShieldCheck className="h-3 w-3" />
                              JCI
                            </span>
                          )}
                          {hospital.international_dept && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                              <Globe className="h-3 w-3" />
                              Int&apos;l Dept
                            </span>
                          )}
                        </div>

                        {/* Stats row */}
                        <div className="mt-3 flex items-center gap-4 text-xs text-text-muted">
                          {hospital.bed_count && (
                            <span className="inline-flex items-center gap-1">
                              <Bed className="h-3.5 w-3.5" />
                              {hospital.bed_count.toLocaleString()} {t('beds')}
                            </span>
                          )}
                          {hospital.languages_supported.length > 0 && (
                            <span>
                              {hospital.languages_supported.map((l) => l.toUpperCase()).join(' \u00b7 ')}
                            </span>
                          )}
                        </div>

                        {/* Description preview */}
                        {(isZh ? hospital.description_zh : hospital.description_en) && (
                          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
                            {isZh
                              ? (hospital.description_zh ?? hospital.description_en)
                              : hospital.description_en}
                          </p>
                        )}

                        {/* Link hint */}
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                          {t('viewDetails')} <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
