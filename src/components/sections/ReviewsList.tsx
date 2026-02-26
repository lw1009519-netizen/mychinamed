'use client'

import { useState } from 'react'
import { Star, Quote, ChevronDown } from 'lucide-react'
import type { PatientReview, ReviewCategory } from '@/data/patient-reviews'
import { getReviewCategory } from '@/data/patient-reviews'

interface CategoryInfo {
  key: ReviewCategory
  label: string
  count: number
}

interface ReviewsListProps {
  reviews: PatientReview[]
  categories: CategoryInfo[]
  totalCount: number
  labels: {
    all: string
    loadMore: string
    showing: string
    of: string
    reviews: string
  }
}

const REVIEWS_PER_PAGE = 12

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  )
}

export default function ReviewsList({
  reviews,
  categories,
  totalCount,
  labels,
}: ReviewsListProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)

  const filtered =
    activeCategory === 'all'
      ? reviews
      : reviews.filter((r) => getReviewCategory(r.treatment) === activeCategory)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setVisibleCount(REVIEWS_PER_PAGE)
  }

  return (
    <>
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-brand text-white shadow-md'
              : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
          }`}
        >
          {labels.all} ({totalCount})
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryChange(cat.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === cat.key
                ? 'bg-brand text-white shadow-md'
                : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((review, i) => (
          <div
            key={`${review.name}-${i}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Quote icon */}
            <Quote className="mb-3 h-6 w-6 text-brand/20" />

            {/* Story */}
            <p className="flex-1 text-sm leading-relaxed text-text-secondary">
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Rating + treatment */}
            <div className="mt-4 flex items-center justify-between">
              <StarRating rating={review.rating} />
              <span className="rounded-lg bg-brand-light px-2.5 py-1 text-xs font-medium text-brand">
                {review.treatment}
              </span>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-slate-100" />

            {/* Author + hospital */}
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-lg">
                {review.countryFlag}
              </span>
              <div className="min-w-0">
                <p className="font-medium text-text-primary">{review.name}</p>
                <p className="text-xs text-text-muted">{review.country}</p>
                <p className="mt-0.5 truncate text-xs text-text-muted">
                  {review.hospital}, {review.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + REVIEWS_PER_PAGE)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-brand px-8 py-3 font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            {labels.loadMore}
            <ChevronDown className="h-4 w-4" />
          </button>
          <p className="mt-3 text-sm text-text-muted">
            {labels.showing} {Math.min(visibleCount, filtered.length)} {labels.of}{' '}
            {filtered.length} {labels.reviews}
          </p>
        </div>
      )}
    </>
  )
}
