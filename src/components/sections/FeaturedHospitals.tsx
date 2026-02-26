import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { Building2, ShieldCheck, Globe, Bed, ArrowRight } from 'lucide-react'

interface Hospital {
  id: string
  name_en: string
  name_zh: string | null
  slug: string
  grade: string | null
  jci_accredited: boolean
  international_dept: boolean
  bed_count: number | null
  description_en: string | null
  description_zh: string | null
  city_id: string | null
  cities: { id: string; name_en: string; name_zh: string | null; slug: string }[] | null
}

interface FeaturedHospitalsProps {
  hospitals: Hospital[]
  locale: string
}

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

export default function FeaturedHospitals({ hospitals, locale }: FeaturedHospitalsProps) {
  const t = useTranslations('hospitalsPage')
  const isZh = locale === 'zh'

  return (
    <section className="bg-bg-soft px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            {t('metaDescription')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((hospital) => {
            const city = hospital.cities?.[0] ?? null
            const citySlug = city?.slug ?? ''
            const gradient = cityGradients[citySlug] ?? 'from-slate-500 to-slate-400'

            return (
              <Link
                key={hospital.id}
                href={`/hospitals/${hospital.slug}` as '/hospitals'}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Gradient top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />

                <div className="flex flex-1 flex-col p-6">
                  {/* City label */}
                  {city && (
                    <span className="mb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                      {isZh ? (city.name_zh ?? city.name_en) : city.name_en}
                    </span>
                  )}

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
                        Int&apos;l
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  {hospital.bed_count && (
                    <div className="mt-3 flex items-center gap-1 text-xs text-text-muted">
                      <Bed className="h-3.5 w-3.5" />
                      {hospital.bed_count.toLocaleString()} {t('beds')}
                    </div>
                  )}

                  {/* Description */}
                  {(isZh ? (hospital.description_zh ?? hospital.description_en) : hospital.description_en) && (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
                      {isZh
                        ? (hospital.description_zh ?? hospital.description_en)
                        : hospital.description_en}
                    </p>
                  )}

                  {/* Link hint */}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand opacity-0 transition-opacity group-hover:opacity-100">
                    {t('viewDetails')} <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/hospitals"
            className="inline-flex items-center gap-2 rounded-xl border border-brand bg-white px-8 py-4 font-body text-base font-semibold text-brand transition-all duration-200 hover:bg-brand-light"
          >
            {t('allHospitals')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
