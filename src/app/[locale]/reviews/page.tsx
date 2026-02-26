import { Link } from '@/i18n/routing'
import { Star, ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
import ReviewsList from '@/components/sections/ReviewsList'
import {
  patientReviews,
  reviewCategories,
  getCategoryCount,
  getUniqueCountries,
  getAverageRating,
} from '@/data/patient-reviews'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface ReviewsPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'reviewsPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/reviews`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/en/reviews`,
      languages: {
        en: `${SITE_URL}/en/reviews`,
        zh: `${SITE_URL}/zh/reviews`,
        ru: `${SITE_URL}/ru/reviews`,
      },
    },
  }
}

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

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const locale = params.locale
  const t = await getTranslations({ locale, namespace: 'reviewsPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const ts = await getTranslations({ locale, namespace: 'specialties' })

  const avgRating = getAverageRating().toFixed(1)
  const uniqueCountries = getUniqueCountries()
  const totalCount = patientReviews.length

  const categories = reviewCategories.map((key) => ({
    key,
    label: ts(key),
    count: getCategoryCount(key),
  }))

  const labels = {
    all: t('allCategories'),
    loadMore: t('loadMore'),
    showing: t('showing'),
    of: t('of'),
    reviews: t('reviews'),
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
          {/* Stats bar */}
          <div className="mx-auto mt-8 flex max-w-lg flex-wrap items-center justify-center gap-6 rounded-2xl bg-white p-6 shadow-lg">
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-brand">{avgRating}</p>
              <div className="mt-1 flex justify-center">
                <StarRating rating={Math.round(Number(avgRating))} />
              </div>
              <p className="mt-1 text-xs text-text-muted">{t('avgRating')}</p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-brand">{totalCount}</p>
              <p className="mt-1 text-xs text-text-muted">{t('totalReviews')}</p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-brand">{uniqueCountries}</p>
              <p className="mt-1 text-xs text-text-muted">{t('countries')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid with Filters */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <ReviewsList
            reviews={patientReviews}
            categories={categories}
            totalCount={totalCount}
            labels={labels}
          />
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
        <QuoteForm sourcePage="/reviews" embedded />
      </section>
    </div>
  )
}
