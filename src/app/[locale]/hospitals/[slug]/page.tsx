import { notFound } from 'next/navigation'
import { getHospitalBySlug } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import {
  Building2, Globe, ShieldCheck, Bed, Users,
  MapPin, ExternalLink, ArrowLeft, Check, Plane,
  Languages, HeartPulse, ArrowRight,
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

  // Collect accreditations for the dedicated section
  const accreditations: { label: string; color: string; bg: string }[] = []
  if (hospital.jci_accredited) accreditations.push({ label: 'JCI Accredited', color: 'text-amber-700', bg: 'bg-amber-50' })
  if (hospital.temos_certified) accreditations.push({ label: 'TEMOS Certified', color: 'text-blue-700', bg: 'bg-blue-50' })
  if (hospital.iso_certified) accreditations.push({ label: 'ISO 9001', color: 'text-slate-700', bg: 'bg-slate-100' })

  // Stats for the quick stat bar
  const stats: { icon: React.ReactNode; label: string; value: string }[] = []
  if (hospital.bed_count) {
    stats.push({
      icon: <Bed className="h-5 w-5 text-brand" />,
      label: t('beds'),
      value: hospital.bed_count.toLocaleString(),
    })
  }
  if (hospital.grade) {
    stats.push({
      icon: <Building2 className="h-5 w-5 text-brand" />,
      label: t('grade'),
      value: hospital.grade,
    })
  }
  if (hospital.annual_patients) {
    stats.push({
      icon: <Users className="h-5 w-5 text-brand" />,
      label: t('annualPatients'),
      value: hospital.annual_patients.toLocaleString(),
    })
  }
  if (hospital.international_patients_annually) {
    stats.push({
      icon: <Globe className="h-5 w-5 text-brand" />,
      label: t('intlPatientsYr'),
      value: hospital.international_patients_annually.toLocaleString(),
    })
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand/5 via-brand-light to-white px-4 py-14 md:px-8 md:py-20 lg:px-16">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-brand/5" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/hospitals"
            className="mb-8 inline-flex items-center gap-1.5 rounded-lg bg-white/60 px-3 py-1.5 text-sm text-text-muted backdrop-blur-sm transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('allHospitals')}
          </Link>

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              {/* Hospital name */}
              <h1 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl lg:text-5xl">
                {isZh ? (hospital.name_zh ?? hospital.name_en) : hospital.name_en}
              </h1>
              <p className="mt-2 text-lg text-text-muted">
                {isZh ? hospital.name_en : hospital.name_zh}
              </p>

              {/* Location */}
              {city && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-base text-text-secondary">
                  <MapPin className="h-4 w-4 text-brand" />
                  {isZh ? (city.name_zh ?? city.name_en) : city.name_en}, China
                  {city.airport_code && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-white/80 px-2 py-0.5 text-sm text-text-muted">
                      <Plane className="h-3.5 w-3.5" />
                      {city.airport_code}
                    </span>
                  )}
                </p>
              )}

              {/* Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {hospital.grade && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-light px-3 py-1.5 text-sm font-semibold text-brand">
                    <Building2 className="h-4 w-4" />
                    {hospital.grade}
                  </span>
                )}
                {hospital.jci_accredited && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">
                    <ShieldCheck className="h-4 w-4" />
                    JCI Accredited
                  </span>
                )}
                {hospital.temos_certified && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                    <ShieldCheck className="h-4 w-4" />
                    TEMOS
                  </span>
                )}
                {hospital.iso_certified && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-text-secondary">
                    <ShieldCheck className="h-4 w-4" />
                    ISO 9001
                  </span>
                )}
                {hospital.international_dept && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
                    <Globe className="h-4 w-4" />
                    International Dept
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 md:min-w-[200px]">
              <Link
                href="/get-quote"
                className="rounded-xl bg-brand px-8 py-3.5 text-center font-body text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-dark hover:shadow-lg"
              >
                {tNav('getQuote')}
              </Link>
              {hospital.website && (
                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm text-text-secondary transition-colors hover:border-brand hover:text-brand"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('officialWebsite')}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      {stats.length > 0 && (
        <section className="border-b border-slate-100 bg-white px-4 py-6 md:px-8 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 md:gap-12 lg:justify-start">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light">
                  {stat.icon}
                </div>
                <div>
                  <p className="font-mono text-lg font-bold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-muted">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-12 lg:col-span-2">
            {/* Overview */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-brand" />
                <h2 className="font-heading text-2xl text-text-primary">
                  {t('aboutHospital')}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-text-secondary">
                {description}
              </p>
            </div>

            {/* Key Statistics */}
            {stats.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-brand" />
                  <h2 className="font-heading text-2xl text-text-primary">
                    {t('hospitalStats')}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-light">
                        {stat.icon}
                      </div>
                      <p className="font-mono text-xl font-bold text-text-primary">{stat.value}</p>
                      <p className="mt-0.5 text-xs text-text-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* International Services */}
            {(hospital.international_dept || hospital.languages_supported?.length > 0 || accreditations.length > 0) && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-brand" />
                  <h2 className="font-heading text-2xl text-text-primary">
                    {isZh ? '\u56FD\u9645\u670D\u52A1' : 'International Services'}
                  </h2>
                </div>
                <div className="space-y-4">
                  {hospital.international_dept && (
                    <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                      <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <div>
                        <p className="font-medium text-text-primary">
                          {isZh ? '\u56FD\u9645\u60A3\u8005\u90E8' : 'International Patient Department'}
                        </p>
                        <p className="mt-1 text-sm text-text-secondary">
                          {isZh
                            ? '\u8BE5\u533B\u9662\u8BBE\u6709\u4E13\u95E8\u7684\u56FD\u9645\u60A3\u8005\u670D\u52A1\u90E8\u95E8\uFF0C\u63D0\u4F9B\u5168\u6D41\u7A0B\u534F\u52A9\u3002'
                            : 'This hospital has a dedicated department for international patients, providing full-process assistance.'}
                        </p>
                      </div>
                    </div>
                  )}
                  {hospital.languages_supported?.length > 0 && (
                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <Languages className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                      <div>
                        <p className="font-medium text-text-primary">{t('languagesSupported')}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {hospital.languages_supported.map((lang: string) => (
                            <span
                              key={lang}
                              className="rounded-md bg-slate-100 px-2.5 py-1 text-sm font-medium text-text-secondary"
                            >
                              {lang.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {accreditations.length > 0 && (
                    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                      <div>
                        <p className="font-medium text-text-primary">
                          {isZh ? '\u56FD\u9645\u8BA4\u8BC1' : 'Accreditations'}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {accreditations.map((a) => (
                            <span
                              key={a.label}
                              className={`rounded-md px-2.5 py-1 text-sm font-medium ${a.bg} ${a.color}`}
                            >
                              {a.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Why Choose This Hospital */}
            {highlights.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-brand" />
                  <h2 className="font-heading text-2xl text-text-primary">
                    {t('whyChoose')}
                  </h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {highlights.map((h: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
                        <Check className="h-3.5 w-3.5 text-brand" />
                      </span>
                      <span className="text-sm leading-relaxed text-text-secondary">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA card */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-6 text-white shadow-lg">
              <HeartPulse className="mb-3 h-8 w-8 text-white/80" />
              <h3 className="font-heading text-xl">{t('needHelp')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {t('needHelpDesc')}
              </p>
              <Link
                href="/get-quote"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-body text-sm font-semibold text-brand transition-all duration-200 hover:shadow-md"
              >
                {tNav('getQuote')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Info Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 font-heading text-lg text-text-primary">
                {isZh ? '\u5FEB\u901F\u4FE1\u606F' : 'Quick Info'}
              </h3>
              <div className="space-y-3">
                {city && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <MapPin className="h-4 w-4 text-brand" />
                      {isZh ? '\u4F4D\u7F6E' : 'Location'}
                    </span>
                    <span className="text-sm font-medium text-text-primary">
                      {isZh ? (city.name_zh ?? city.name_en) : city.name_en}
                    </span>
                  </div>
                )}
                {hospital.bed_count && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <Bed className="h-4 w-4 text-brand" /> {t('beds')}
                    </span>
                    <span className="font-mono text-sm font-semibold text-text-primary">
                      {hospital.bed_count.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <Building2 className="h-4 w-4 text-brand" /> {t('grade')}
                  </span>
                  <span className="font-mono text-sm font-semibold text-text-primary">
                    {hospital.grade ?? 'N/A'}
                  </span>
                </div>
                {hospital.international_dept && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-text-secondary">
                      <Globe className="h-4 w-4 text-brand" /> Int&apos;l Dept
                    </span>
                    <span className="text-sm font-medium text-emerald-600">
                      <Check className="inline h-4 w-4" />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Website link */}
            {hospital.website && (
              <a
                href={hospital.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-text-secondary transition-colors hover:border-brand hover:text-brand"
              >
                <ExternalLink className="h-4 w-4" />
                {t('officialWebsite')}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-brand px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="font-heading text-2xl md:text-3xl">
            {isZh
              ? `\u83B7\u53D6${hospital.name_zh ?? hospital.name_en}\u7684\u514D\u8D39\u62A5\u4EF7`
              : `Get a Free Quote for ${hospital.name_en}`}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/80">
            {t('needHelpDesc')}
          </p>
          <Link
            href="/get-quote"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-body text-base font-semibold text-brand shadow-md transition-all duration-200 hover:shadow-lg"
          >
            {tNav('getQuote')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Quote Form */}
      <section className="bg-bg-soft px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <QuoteForm sourcePage={`/hospitals/${params.slug}`} embedded />
      </section>
    </div>
  )
}
