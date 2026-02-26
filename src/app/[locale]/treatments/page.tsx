import { getTreatments } from '@/lib/supabase/queries'
import { Link } from '@/i18n/routing'
import {
  Clock, Bed, DollarSign, ChevronRight, Star,
} from 'lucide-react'

export const metadata = {
  title: 'Medical Treatments in China — MyChinaMed',
  description:
    'Compare 18+ medical treatments available in China. See prices, duration, and recovery times. Save up to 70% vs Western countries.',
}

const categoryMeta: Record<string, { emoji: string; label: string }> = {
  dental: { emoji: '🦷', label: 'Dental & Implants' },
  eye: { emoji: '👁️', label: 'Eye & LASIK' },
  oncology: { emoji: '🎗️', label: 'Oncology & CAR-T' },
  tcm: { emoji: '🌿', label: 'Traditional Chinese Medicine' },
  orthopedic: { emoji: '🦴', label: 'Orthopedic & Spine' },
  cosmetic: { emoji: '✨', label: 'Cosmetic Surgery' },
  fertility: { emoji: '👶', label: 'Fertility & IVF' },
  cardiac: { emoji: '❤️', label: 'Cardiac Surgery' },
  checkup: { emoji: '🩺', label: 'Health Screening' },
  stem_cell: { emoji: '🧬', label: 'Stem Cell Therapy' },
  neurology: { emoji: '🧠', label: 'Neurology' },
  bariatric: { emoji: '⚖️', label: 'Weight Loss Surgery' },
}

interface TreatmentRow {
  id: string
  category: string
  name_en: string
  name_zh: string | null
  slug: string
  description_en: string | null
  price_range_min: number | null
  price_range_max: number | null
  duration_days_min: number | null
  duration_days_max: number | null
  recovery_days: number | null
  hospital_stay_required: boolean
  popular: boolean
}

export default async function TreatmentsPage() {
  const treatments = (await getTreatments()) as TreatmentRow[]

  // Group by category, preserving order
  const categoryOrder: string[] = []
  const grouped: Record<string, TreatmentRow[]> = {}
  for (const t of treatments) {
    if (!grouped[t.category]) {
      grouped[t.category] = []
      categoryOrder.push(t.category)
    }
    grouped[t.category].push(t)
  }

  function formatPrice(min: number | null, max: number | null) {
    if (!min && !max) return 'Contact us'
    if (min && max) {
      if (min >= 1000) return `$${(min / 1000).toFixed(0)}k–$${(max / 1000).toFixed(0)}k`
      return `$${min.toLocaleString()}–$${max.toLocaleString()}`
    }
    return `From $${(min ?? max)!.toLocaleString()}`
  }

  function formatDuration(min: number | null, max: number | null) {
    if (!min && !max) return null
    if (min && max && min !== max) return `${min}–${max} days`
    return `${min ?? max} days`
  }

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-light to-white px-4 py-16 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-heading text-4xl text-text-primary md:text-5xl">
            Medical Treatments in China
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            Compare {treatments.length} procedures across {categoryOrder.length}{' '}
            specialties. Save up to 70% vs Western countries.
          </p>
        </div>
      </section>

      {/* Treatments grouped by category */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl space-y-14">
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat] ?? { emoji: '💊', label: cat }
            const items = grouped[cat]

            return (
              <div key={cat}>
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xl">{meta.emoji}</span>
                  <h2 className="font-heading text-2xl text-text-primary md:text-3xl">
                    {meta.label}
                  </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((t) => (
                    <div
                      key={t.id}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading text-lg text-text-primary">
                            {t.name_en}
                          </h3>
                          {t.name_zh && (
                            <p className="mt-0.5 text-sm text-text-muted">
                              {t.name_zh}
                            </p>
                          )}
                        </div>
                        {t.popular && (
                          <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                            <Star className="h-3 w-3" />
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <p className="mt-4 flex items-center gap-1.5 font-mono text-lg font-bold text-brand">
                        <DollarSign className="h-4 w-4" />
                        {formatPrice(t.price_range_min, t.price_range_max)}
                      </p>

                      {/* Info pills */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formatDuration(t.duration_days_min, t.duration_days_max) && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-text-secondary">
                            <Clock className="h-3 w-3" />
                            {formatDuration(t.duration_days_min, t.duration_days_max)}
                          </span>
                        )}
                        {t.recovery_days != null && t.recovery_days > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs text-text-secondary">
                            Recovery: {t.recovery_days}d
                          </span>
                        )}
                        {t.hospital_stay_required && (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs text-blue-700">
                            <Bed className="h-3 w-3" />
                            Hospital Stay
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      {t.description_en && (
                        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
                          {t.description_en}
                        </p>
                      )}

                      {/* CTA */}
                      <Link
                        href="/get-quote"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand-dark"
                      >
                        Get Free Quote <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
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
