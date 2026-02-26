import { getTreatments } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import {
  Clock, Bed, DollarSign, ChevronRight, Star, TrendingDown,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface TreatmentsPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: TreatmentsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'treatmentsPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/treatments`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/en/treatments`,
      languages: {
        en: `${SITE_URL}/en/treatments`,
        zh: `${SITE_URL}/zh/treatments`,
        ru: `${SITE_URL}/ru/treatments`,
      },
    },
  }
}

interface TreatmentRow {
  id: string
  category: string
  name_en: string
  name_zh: string | null
  slug: string
  description_en: string | null
  description_zh: string | null
  price_range_min: number | null
  price_range_max: number | null
  duration_days_min: number | null
  duration_days_max: number | null
  recovery_days: number | null
  hospital_stay_required: boolean
  popular: boolean
}

export default async function TreatmentsPage({ params }: TreatmentsPageProps) {
  const locale = params.locale
  const isZh = locale === 'zh'
  const t = await getTranslations({ locale, namespace: 'treatmentsPage' })
  const ts = await getTranslations({ locale, namespace: 'specialties' })
  const treatments = (await getTreatments()) as TreatmentRow[]

  // Group by category, preserving order
  const categoryOrder: string[] = []
  const grouped: Record<string, TreatmentRow[]> = {}
  for (const tr of treatments) {
    if (!grouped[tr.category]) {
      grouped[tr.category] = []
      categoryOrder.push(tr.category)
    }
    grouped[tr.category].push(tr)
  }

  const categoryEmoji: Record<string, string> = {
    dental: '\u{1F9B7}', eye: '\u{1F441}\uFE0F', oncology: '\u{1F397}\uFE0F',
    tcm: '\u{1F33F}', orthopedic: '\u{1F9B4}', cosmetic: '\u2728',
    fertility: '\u{1F476}', cardiac: '\u2764\uFE0F', checkup: '\u{1FA7A}',
    stem_cell: '\u{1F9EC}', neurology: '\u{1F9E0}', bariatric: '\u2696\uFE0F',
  }

  // Approximate US prices for savings comparison
  const usaPrices: Record<string, number> = {
    dental: 5000, eye: 4500, oncology: 500000, tcm: 5000,
    orthopedic: 35000, cosmetic: 12000, fertility: 20000,
    cardiac: 150000, checkup: 5000, stem_cell: 100000,
    neurology: 100000, bariatric: 25000,
  }

  function getSavingsPercent(category: string, chinaMax: number | null): number | null {
    const usaPrice = usaPrices[category]
    if (!usaPrice || !chinaMax) return null
    const pct = Math.round(((usaPrice - chinaMax) / usaPrice) * 100)
    return pct > 10 ? pct : null
  }

  function formatPrice(min: number | null, max: number | null) {
    if (!min && !max) return t('contactUs')
    if (min && max) {
      if (min >= 1000) return `$${(min / 1000).toFixed(0)}k\u2013$${(max / 1000).toFixed(0)}k`
      return `$${min.toLocaleString()}\u2013$${max.toLocaleString()}`
    }
    return `${t('from')} $${(min ?? max)!.toLocaleString()}`
  }

  function formatDuration(min: number | null, max: number | null) {
    if (!min && !max) return null
    if (min && max && min !== max) return `${min}\u2013${max} ${t('days')}`
    return `${min ?? max} ${t('days')}`
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
            {t('subtitle', { count: treatments.length, categories: categoryOrder.length })}
          </p>
        </div>
      </section>

      {/* Treatments grouped by category */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-14">
          {categoryOrder.map((cat) => {
            const emoji = categoryEmoji[cat] ?? '\u{1F48A}'
            const items = grouped[cat]

            return (
              <div key={cat}>
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-2xl">
                    {emoji}
                  </span>
                  <div>
                    <h2 className="font-heading text-2xl text-text-primary md:text-3xl">
                      {ts(cat)}
                    </h2>
                    <p className="text-sm text-text-muted">
                      {items.length} {isZh ? '\u4E2A\u6CBB\u7597\u9879\u76EE' : 'treatments'}
                    </p>
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((tr) => {
                    const savings = getSavingsPercent(tr.category, tr.price_range_max)

                    return (
                      <div
                        key={tr.id}
                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                      >
                        {/* Savings badge */}
                        {savings && (
                          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                            <TrendingDown className="h-3 w-3" />
                            {isZh ? `\u7701${savings}%` : `Save ${savings}%`}
                          </span>
                        )}

                        {/* Top accent */}
                        <div className="h-1 bg-gradient-to-r from-brand to-brand-dark" />

                        <div className="flex flex-1 flex-col p-6">
                          {/* Header row */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-heading text-lg text-text-primary group-hover:text-brand">
                                {isZh ? (tr.name_zh ?? tr.name_en) : tr.name_en}
                              </h3>
                              {!isZh && tr.name_zh && (
                                <p className="mt-0.5 text-sm text-text-muted">
                                  {tr.name_zh}
                                </p>
                              )}
                              {isZh && (
                                <p className="mt-0.5 text-sm text-text-muted">
                                  {tr.name_en}
                                </p>
                              )}
                            </div>
                            {tr.popular && (
                              <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                                <Star className="h-3 w-3" />
                                {t('popular')}
                              </span>
                            )}
                          </div>

                          {/* Price */}
                          <div className="mt-4 rounded-xl bg-brand-light/50 px-4 py-3">
                            <p className="flex items-center gap-1.5 font-mono text-xl font-bold text-brand">
                              <DollarSign className="h-5 w-5" />
                              {formatPrice(tr.price_range_min, tr.price_range_max)}
                            </p>
                            {savings && (
                              <p className="mt-1 text-xs text-text-muted">
                                {isZh
                                  ? `\u7F8E\u56FD\u540C\u7C7B\u624B\u672F\u7EA6 $${(usaPrices[tr.category] / 1000).toFixed(0)}k`
                                  : `vs ~$${(usaPrices[tr.category] / 1000).toFixed(0)}k in USA`}
                              </p>
                            )}
                          </div>

                          {/* Info pills */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {formatDuration(tr.duration_days_min, tr.duration_days_max) && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-text-secondary">
                                <Clock className="h-3 w-3" />
                                {formatDuration(tr.duration_days_min, tr.duration_days_max)}
                              </span>
                            )}
                            {tr.recovery_days != null && tr.recovery_days > 0 && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-text-secondary">
                                {t('recovery')}: {tr.recovery_days}{isZh ? t('days') : 'd'}
                              </span>
                            )}
                            {tr.hospital_stay_required && (
                              <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs text-blue-700">
                                <Bed className="h-3 w-3" />
                                {t('hospitalStay')}
                              </span>
                            )}
                          </div>

                          {/* Description */}
                          {(isZh ? (tr.description_zh ?? tr.description_en) : tr.description_en) && (
                            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
                              {isZh ? (tr.description_zh ?? tr.description_en) : tr.description_en}
                            </p>
                          )}

                          {/* CTA */}
                          <Link
                            href={`/get-quote?treatment=${tr.category}` as '/get-quote'}
                            className="mt-4 inline-flex items-center gap-1 rounded-lg bg-brand-light px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
                          >
                            {t('getQuote')} <ChevronRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quote Form */}
      <section className="bg-bg-soft px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <QuoteForm sourcePage="/treatments" embedded />
      </section>
    </div>
  )
}
