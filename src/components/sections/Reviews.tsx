'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

const reviewsData = [
  {
    name: 'Sarah M.',
    country: '🇺🇸',
    treatment: 'Dental Implants',
    rating: 5,
    content:
      'Saved over $15,000 compared to US prices. The hospital was spotless, staff spoke English, and my doctor had over 20 years of experience. Absolutely worth the trip!',
  },
  {
    name: 'Алексей К.',
    country: '🇷🇺',
    treatment: 'Stem Cell Therapy',
    rating: 5,
    content:
      'The doctors were incredibly professional. My coordinator arranged everything — from airport pickup to translation during my consultations. Top-notch experience.',
  },
  {
    name: 'Mohammed A.',
    country: '🇦🇪',
    treatment: 'Health Screening',
    rating: 5,
    content:
      'Five-star hospital experience. The VIP health screening package was comprehensive and completed in a single day. Results were detailed and translated to English.',
  },
  {
    name: 'Yuki T.',
    country: '🇯🇵',
    treatment: 'TCM Treatment',
    rating: 4,
    content:
      'Traditional approach with modern facilities. The acupuncture and herbal medicine program really helped my chronic pain. The TCM master was incredibly knowledgeable.',
  },
  {
    name: 'Anna S.',
    country: '🇩🇪',
    treatment: 'LASIK',
    rating: 5,
    content:
      'Perfect vision after 20 years of glasses! The eye hospital in Shanghai was world-class. Paid a fraction of what it would cost in Germany.',
  },
  {
    name: 'Priya R.',
    country: '🇮🇳',
    treatment: 'Cardiac Surgery',
    rating: 5,
    content:
      'World-class cardiac care at an affordable price. The surgical team was exceptional and the post-operative care was thorough. I felt safe throughout.',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < count ? 'text-accent-warm' : 'text-slate-600'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Reviews() {
  const t = useTranslations('reviews')
  const [current, setCurrent] = useState(0)

  const visibleCount = 3
  const maxStart = reviewsData.length - visibleCount

  function prev() {
    setCurrent((c) => Math.max(0, c - 1))
  }

  function next() {
    setCurrent((c) => Math.min(maxStart, c + 1))
  }

  return (
    <section className="bg-dark px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{t('subtitle')}</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviewsData
              .slice(current, current + visibleCount)
              .map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-700 bg-dark-card p-6 md:p-8"
                >
                  <Stars count={review.rating} />
                  <p className="mt-4 font-body text-base italic leading-relaxed text-slate-200">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm font-medium text-white">
                        {review.name} {review.country}
                      </p>
                      <p className="text-xs text-slate-400">
                        {review.treatment}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-accent">
                      <CheckCircle className="h-3.5 w-3.5" />
                      {t('verified')}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-400 transition-colors hover:border-white hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === current ? 'bg-accent' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={current === maxStart}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 text-slate-400 transition-colors hover:border-white hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
