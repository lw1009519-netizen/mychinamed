import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Clock, ShieldCheck, DollarSign } from 'lucide-react'
import QuoteForm from '@/components/sections/QuoteForm'

interface GetQuotePageProps {
  params: { locale: string }
  searchParams: { treatment?: string }
}

export async function generateMetadata({ params }: GetQuotePageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'quoteForm' })
  return {
    title: `${t('pageTitle')} — MyChinaMed`,
    description: t('pageSubtitle'),
  }
}

export default function GetQuotePage({ searchParams }: GetQuotePageProps) {
  const treatment = searchParams.treatment
  return <GetQuoteContent defaultTreatment={treatment} />
}

function GetQuoteContent({ defaultTreatment }: { defaultTreatment?: string }) {
  const t = useTranslations('quoteForm')

  return (
    <div className="pt-16 md:pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-light to-white px-4 py-16 md:px-8 md:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-heading text-4xl text-text-primary md:text-5xl">
            {t('pageTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t('pageSubtitle')}
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="bg-bg-soft px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <QuoteForm
          sourcePage="/get-quote"
          defaultTreatment={defaultTreatment}
          embedded
        />
      </section>

      {/* Promise cards */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <Clock className="h-6 w-6 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('promise48h')}
            </p>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <DollarSign className="h-6 w-6 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('promiseFree')}
            </p>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <ShieldCheck className="h-6 w-6 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('promiseConfidential')}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
