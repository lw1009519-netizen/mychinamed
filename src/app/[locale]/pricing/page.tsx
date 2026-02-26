import { getTreatments } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import { ArrowRight, TrendingDown, Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface PricingPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pricingPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/pricing`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/en/pricing`,
      languages: {
        en: `${SITE_URL}/en/pricing`,
        zh: `${SITE_URL}/zh/pricing`,
        ru: `${SITE_URL}/ru/pricing`,
      },
    },
  }
}

// Reference prices for USA, South Korea, Thailand (USD)
const intlPrices: Record<string, { usa: number; korea: number; thailand: number }> = {
  'Dental Implant (Single)': { usa: 5000, korea: 2200, thailand: 1800 },
  'Dental Veneers (per tooth)': { usa: 2000, korea: 800, thailand: 600 },
  'Full Mouth Implants': { usa: 50000, korea: 22000, thailand: 18000 },
  'LASIK Surgery': { usa: 4500, korea: 2000, thailand: 1800 },
  'ICL Implant': { usa: 8000, korea: 5000, thailand: 4500 },
  'CAR-T Cell Therapy': { usa: 475000, korea: 250000, thailand: 0 },
  'Acupuncture Program': { usa: 3000, korea: 1500, thailand: 1200 },
  'TCM Pain Management': { usa: 5000, korea: 2500, thailand: 2000 },
  'Knee Replacement': { usa: 35000, korea: 18000, thailand: 14000 },
  'Spinal Fusion': { usa: 80000, korea: 30000, thailand: 22000 },
  'Rhinoplasty': { usa: 8000, korea: 4000, thailand: 3500 },
  'Facelift': { usa: 15000, korea: 8000, thailand: 6000 },
  'IVF Cycle': { usa: 20000, korea: 8000, thailand: 5500 },
  'Heart Bypass Surgery': { usa: 150000, korea: 40000, thailand: 25000 },
  'Executive Health Screening': { usa: 5000, korea: 1500, thailand: 1200 },
  'Stem Cell Therapy': { usa: 100000, korea: 50000, thailand: 35000 },
  'Deep Brain Stimulation': { usa: 100000, korea: 50000, thailand: 40000 },
  'Gastric Sleeve': { usa: 25000, korea: 12000, thailand: 10000 },
}

function formatK(n: number): string {
  if (n === 0) return 'N/A'
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`
  return `$${n}`
}

function formatRange(min: number | null, max: number | null): string {
  if (!min && !max) return 'Contact'
  if (min && max) return `${formatK(min)}\u2013${formatK(max)}`
  return formatK((min ?? max)!)
}

function savingsPct(chinaMax: number | null, usaPrice: number): number | null {
  if (!chinaMax || !usaPrice) return null
  const pct = Math.round(((usaPrice - chinaMax) / usaPrice) * 100)
  return pct > 0 ? pct : null
}

export default async function PricingPage({ params }: PricingPageProps) {
  const locale = params.locale
  const isZh = locale === 'zh'
  const t = await getTranslations({ locale, namespace: 'pricingPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  const treatments = await getTreatments()

  const categoryEmoji: Record<string, string> = {
    dental: '\u{1F9B7}', eye: '\u{1F441}\uFE0F', oncology: '\u{1F397}\uFE0F',
    tcm: '\u{1F33F}', orthopedic: '\u{1F9B4}', cosmetic: '\u2728',
    fertility: '\u{1F476}', cardiac: '\u2764\uFE0F', checkup: '\u{1FA7A}',
    stem_cell: '\u{1F9EC}', neurology: '\u{1F9E0}', bariatric: '\u2696\uFE0F',
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
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-heading text-sm text-text-primary">
                    {t('treatment')}
                  </th>
                  <th className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{'\u{1F1E8}\u{1F1F3}'}</span>
                      <span className="font-heading text-sm font-bold text-brand">{t('china')}</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{'\u{1F1FA}\u{1F1F8}'}</span>
                      <span className="font-heading text-sm text-text-primary">{t('usa')}</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{'\u{1F1F0}\u{1F1F7}'}</span>
                      <span className="font-heading text-sm text-text-primary">{t('korea')}</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{'\u{1F1F9}\u{1F1ED}'}</span>
                      <span className="font-heading text-sm text-text-primary">{t('thailand')}</span>
                    </div>
                  </th>
                  <th className="px-4 py-4 text-center font-heading text-sm text-emerald-700">
                    {t('savings')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {treatments.map((tr, i) => {
                  const prices = intlPrices[tr.name_en]
                  if (!prices) return null
                  const savings = savingsPct(tr.price_range_max, prices.usa)
                  const emoji = categoryEmoji[tr.category] ?? '\u{1F48A}'

                  return (
                    <tr
                      key={tr.id}
                      className={`border-t border-slate-100 transition-colors hover:bg-brand-light/20 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{emoji}</span>
                          <div>
                            <p className="font-medium text-text-primary">
                              {isZh ? (tr.name_zh ?? tr.name_en) : tr.name_en}
                            </p>
                            <p className="text-xs text-text-muted">
                              {isZh ? tr.name_en : tr.name_zh}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-mono text-sm font-bold text-brand">
                          {formatRange(tr.price_range_min, tr.price_range_max)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-sm text-text-secondary">
                        {formatK(prices.usa)}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-sm text-text-secondary">
                        {formatK(prices.korea)}
                      </td>
                      <td className="px-4 py-4 text-center font-mono text-sm text-text-secondary">
                        {formatK(prices.thailand)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {savings ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                            <TrendingDown className="h-3 w-3" />
                            {savings}%
                          </span>
                        ) : (
                          <span className="text-xs text-text-muted">\u2014</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {treatments.map((tr) => {
              const prices = intlPrices[tr.name_en]
              if (!prices) return null
              const savings = savingsPct(tr.price_range_max, prices.usa)
              const emoji = categoryEmoji[tr.category] ?? '\u{1F48A}'

              return (
                <div key={tr.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{emoji}</span>
                      <span className="font-medium text-text-primary">
                        {isZh ? (tr.name_zh ?? tr.name_en) : tr.name_en}
                      </span>
                    </div>
                    {savings && (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                        <TrendingDown className="h-3 w-3" />
                        {savings}%
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-brand-light/50 p-2 text-center">
                      <p className="text-xs text-text-muted">{'\u{1F1E8}\u{1F1F3}'} {t('china')}</p>
                      <p className="font-mono font-bold text-brand">
                        {formatRange(tr.price_range_min, tr.price_range_max)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-xs text-text-muted">{'\u{1F1FA}\u{1F1F8}'} {t('usa')}</p>
                      <p className="font-mono text-text-secondary">{formatK(prices.usa)}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-xs text-text-muted">{'\u{1F1F0}\u{1F1F7}'} {t('korea')}</p>
                      <p className="font-mono text-text-secondary">{formatK(prices.korea)}</p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-xs text-text-muted">{'\u{1F1F9}\u{1F1ED}'} {t('thailand')}</p>
                      <p className="font-mono text-text-secondary">{formatK(prices.thailand)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-sm text-text-muted">
            {t('disclaimer')}
          </p>

          {/* Why China section */}
          <div className="mt-12 rounded-2xl bg-brand-light/30 p-8 md:p-10">
            <h2 className="mb-6 text-center font-heading text-2xl text-text-primary md:text-3xl">
              {t('whyTitle')}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { key: 'why1' as const },
                { key: 'why2' as const },
                { key: 'why3' as const },
              ].map(({ key }) => (
                <div key={key} className="flex items-start gap-3 rounded-xl bg-white p-5">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
                    <Check className="h-3.5 w-3.5 text-brand" />
                  </span>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="font-heading text-2xl md:text-3xl">{t('ctaTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/80">{t('ctaDesc')}</p>
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
        <QuoteForm sourcePage="/pricing" embedded />
      </section>
    </div>
  )
}
