import { notFound } from 'next/navigation'
import { getHospitalBySlug } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import {
  Building2, Globe, ShieldCheck, Bed, Users,
  MapPin, ExternalLink, ArrowLeft, Check, Plane,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface HospitalDetailPageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: HospitalDetailPageProps): Promise<Metadata> {
  const hospital = await getHospitalBySlug(params.slug)
  if (!hospital) return { title: 'Hospital Not Found' }

  const isZh = params.locale === 'zh'
  const name = isZh ? (hospital.name_zh ?? hospital.name_en) : hospital.name_en
  const desc = isZh
    ? (hospital.description_zh ?? hospital.description_en)
    : hospital.description_en

  const badges: string[] = []
  if (hospital.grade) badges.push(hospital.grade)
  if (hospital.jci_accredited) badges.push('JCI Accredited')
  if (hospital.international_dept) badges.push('International Dept')

  const title = `${name} — MyChinaMed`
  const description = badges.length
    ? `${badges.join(' · ')}. ${desc?.slice(0, 120) ?? ''}`
    : desc?.slice(0, 160) ?? ''

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/hospitals/${params.slug}`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'article',
    },
    alternates: {
      canonical: `${SITE_URL}/en/hospitals/${params.slug}`,
      languages: {
        en: `${SITE_URL}/en/hospitals/${params.slug}`,
        zh: `${SITE_URL}/zh/hospitals/${params.slug}`,
        ru: `${SITE_URL}/ru/hospitals/${params.slug}`,
      },
    },
  }
}

export default async function HospitalDetailPage({ params }: HospitalDetailPageProps) {
  const hospital = await getHospitalBySlug(params.slug)
  if (!hospital) notFound()

  const locale = params.locale
  const isZh = locale === 'zh'
  const t = await getTranslations({ locale, namespace: 'hospitalsPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  const citiesArr = hospital.cities as {
    id: string; name_en: string; name_zh: string | null; slug: string; airport_code: string | null
  }[] | null
  const city = citiesArr?.[0] ?? null

  const description = isZh
    ? (hospital.description_zh ?? hospital.description_en)
    : hospital.description_en

  // Extract highlights from description
  const descSentences = description?.split('. ').filter(Boolean) ?? []
  const highlights = descSentences.slice(0, 4).map((s: string) =>
    s.endsWith('.') ? s : s + '.'
  )

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-light to-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/hospitals"
            className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('allHospitals')}
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="font-heading text-3xl text-text-primary md:text-4xl">
                {isZh ? (hospital.name_zh ?? hospital.name_en) : hospital.name_en}
              </h1>
              <p className="mt-1 text-lg text-text-muted">
                {isZh ? hospital.name_en : hospital.name_zh}
              </p>

              {/* Location */}
              {city && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-text-secondary">
                  <MapPin className="h-4 w-4" />
                  {isZh ? (city.name_zh ?? city.name_en) : city.name_en}, China
                  {city.airport_code && (
                    <span className="ml-2 inline-flex items-center gap-1 text-text-muted">
                      <Plane className="h-3.5 w-3.5" />
                      {city.airport_code}
                    </span>
                  )}
                </p>
              )}

              {/* Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                {hospital.grade && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-light px-3 py-1.5 text-sm font-medium text-brand">
                    <Building2 className="h-4 w-4" />
                    {hospital.grade}
                  </span>
                )}
                {hospital.jci_accredited && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">
                    <ShieldCheck className="h-4 w-4" />
                    JCI Accredited
                  </span>
                )}
                {hospital.temos_certified && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <ShieldCheck className="h-4 w-4" />
                    TEMOS Certified
                  </span>
                )}
                {hospital.iso_certified && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-text-secondary">
                    <ShieldCheck className="h-4 w-4" />
                    ISO 9001
                  </span>
                )}
                {hospital.international_dept && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <Globe className="h-4 w-4" />
                    International Department
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Link
                href="/get-quote"
                className="rounded-xl bg-brand px-8 py-3 text-center font-body text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark hover:shadow-md"
              >
                {tNav('getQuote')}
              </Link>
              {hospital.website && (
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-6 py-3 text-sm text-text-secondary transition-colors hover:border-brand hover:text-brand"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('officialWebsite')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="mb-4 font-heading text-2xl text-text-primary">
                {t('aboutHospital')}
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            </div>

            {/* Why Choose */}
            {highlights.length > 0 && (
              <div>
                <h2 className="mb-4 font-heading text-2xl text-text-primary">
                  {t('whyChoose')}
                </h2>
                <ul className="space-y-3">
                  {highlights.map((h: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
                        <Check className="h-3.5 w-3.5 text-brand" />
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {h}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {hospital.languages_supported?.length > 0 && (
              <div>
                <h2 className="mb-4 font-heading text-2xl text-text-primary">
                  {t('languagesSupported')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {hospital.languages_supported.map((lang: string) => (
                    <span
                      key={lang}
                      className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-text-secondary"
                    >
                      {lang.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar stats */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 font-heading text-xl text-text-primary">
                {t('hospitalStats')}
              </h3>
              <div className="space-y-4">
                {hospital.bed_count && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <Bed className="h-4 w-4 text-brand" /> {t('beds')}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {hospital.bed_count.toLocaleString()}
                    </span>
                  </div>
                )}
                {hospital.annual_patients && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <Users className="h-4 w-4 text-brand" /> {t('annualPatients')}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {hospital.annual_patients.toLocaleString()}
                    </span>
                  </div>
                )}
                {hospital.international_patients_annually && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <Globe className="h-4 w-4 text-brand" /> {t('intlPatientsYr')}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {hospital.international_patients_annually.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Building2 className="h-4 w-4 text-brand" /> {t('grade')}
                  </span>
                  <span className="font-mono text-sm font-semibold text-text-primary">
                    {hospital.grade ?? 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="rounded-2xl bg-brand p-6 text-white">
              <h3 className="font-heading text-xl">{t('needHelp')}</h3>
              <p className="mt-2 text-sm text-white/80">
                {t('needHelpDesc')}
              </p>
              <Link
                href="/get-quote"
                className="mt-4 block rounded-xl bg-white px-6 py-3 text-center font-body text-sm font-semibold text-brand transition-all duration-200 hover:shadow-md"
              >
                {tNav('getQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="bg-bg-soft px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <QuoteForm sourcePage={`/hospitals/${params.slug}`} embedded />
      </section>
    </div>
  )
}
