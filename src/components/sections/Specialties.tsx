'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

const specialtiesData = [
  { key: 'dental', emoji: '🦷', price: 800 },
  { key: 'eye', emoji: '👁️', price: 1200 },
  { key: 'oncology', emoji: '🎗️', price: 30000 },
  { key: 'tcm', emoji: '🌿', price: 500 },
  { key: 'orthopedic', emoji: '🦴', price: 5000 },
  { key: 'cosmetic', emoji: '✨', price: 2000 },
  { key: 'fertility', emoji: '👶', price: 4000 },
  { key: 'cardiac', emoji: '❤️', price: 10000 },
  { key: 'checkup', emoji: '🩺', price: 300 },
  { key: 'stem_cell', emoji: '🧬', price: 5000 },
  { key: 'neurology', emoji: '🧠', price: 8000 },
  { key: 'bariatric', emoji: '⚖️', price: 5000 },
] as const

export default function Specialties() {
  const t = useTranslations('specialties')
  const [showAll, setShowAll] = useState(false)

  const displayed = showAll ? specialtiesData : specialtiesData.slice(0, 8)

  return (
    <section className="bg-bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {displayed.map((spec) => (
            <Link
              key={spec.key}
              href="/treatments"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl">{spec.emoji}</span>
              <h3 className="mt-3 font-heading text-lg text-text-primary">
                {t(spec.key)}
              </h3>
              <p className="mt-1 font-mono text-sm text-brand">
                {t('from')} ${spec.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>

        {/* Toggle */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-brand underline-offset-4 transition-all duration-200 hover:text-brand-dark hover:underline"
          >
            {showAll ? t('showLess') : t('viewAll')}
          </button>
        </div>
      </div>
    </section>
  )
}
