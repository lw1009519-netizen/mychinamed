import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { DollarSign, ArrowRight, TrendingDown, Clock } from 'lucide-react'

interface Treatment {
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
  popular: boolean
}

interface PopularTreatmentsProps {
  treatments: Treatment[]
  locale: string
}

const categoryEmoji: Record<string, string> = {
  dental: '\u{1F9B7}',
  eye: '\u{1F441}\uFE0F',
  oncology: '\u{1F397}\uFE0F',
  tcm: '\u{1F33F}',
  orthopedic: '\u{1F9B4}',
  cosmetic: '\u2728',
  fertility: '\u{1F476}',
  cardiac: '\u2764\uFE0F',
  checkup: '\u{1FA7A}',
  stem_cell: '\u{1F9EC}',
  neurology: '\u{1F9E0}',
  bariatric: '\u2696\uFE0F',
}

// Approximate US prices for savings comparison
const usaPrices: Record<string, number> = {
  dental: 5000,
  eye: 4500,
  oncology: 500000,
  tcm: 5000,
  orthopedic: 35000,
  cosmetic: 12000,
  fertility: 20000,
  cardiac: 150000,
  checkup: 5000,
  stem_cell: 100000,
  neurology: 100000,
  bariatric: 25000,
}

function getSavingsPercent(category: string, chinaMax: number | null): number | null {
  const usaPrice = usaPrices[category]
  if (!usaPrice || !chinaMax) return null
  const pct = Math.round(((usaPrice - chinaMax) / usaPrice) * 100)
  return pct > 10 ? pct : null
}

export default function PopularTreatments({ treatments, locale }: PopularTreatmentsProps) {
  const t = useTranslations('treatmentsPage')
  const ts = useTranslations('specialties')
  const isZh = locale === 'zh'

  function formatPrice(min: number | null, max: number | null) {
    if (!min && !max) return t('contactUs')
    if (min && max) {
      if (min >= 1000) return `$${(min / 1000).toFixed(0)}k\u2013$${(max / 1000).toFixed(0)}k`
      return `$${min.toLocaleString()}\u2013$${max.toLocaleString()}`
    }
    return `${t('from')} $${(min ?? max)!.toLocaleString()}`
  }

  return (
    <section className="bg-bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((tr) => {
            const emoji = categoryEmoji[tr.category] ?? '\u{1F48A}'
            const savings = getSavingsPercent(tr.category, tr.price_range_max)

            return (
              <Link
                key={tr.id}
                href={`/get-quote?treatment=${tr.category}` as '/get-quote'}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Savings badge */}
                {savings && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                    <TrendingDown className="h-3 w-3" />
                    {isZh ? `省${savings}%` : `Save ${savings}%`}
                  </span>
                )}

                {/* Emoji */}
                <span className="text-3xl">{emoji}</span>

                {/* Category */}
                <span className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                  {ts(tr.category)}
                </span>

                {/* Name */}
                <h3 className="mt-1 font-heading text-base text-text-primary group-hover:text-brand">
                  {isZh ? (tr.name_zh ?? tr.name_en) : tr.name_en}
                </h3>

                {/* Price */}
                <p className="mt-3 flex items-center gap-1 font-mono text-lg font-bold text-brand">
                  <DollarSign className="h-4 w-4" />
                  {formatPrice(tr.price_range_min, tr.price_range_max)}
                </p>

                {/* Duration */}
                {tr.duration_days_min && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-text-muted">
                    <Clock className="h-3 w-3" />
                    {tr.duration_days_min}
                    {tr.duration_days_max && tr.duration_days_max !== tr.duration_days_min
                      ? `\u2013${tr.duration_days_max}`
                      : ''}{' '}
                    {t('days')}
                  </p>
                )}
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 rounded-xl border border-brand bg-white px-8 py-4 font-body text-base font-semibold text-brand transition-all duration-200 hover:bg-brand-light"
          >
            {isZh ? '查看全部治疗项目' : 'View All Treatments'}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
