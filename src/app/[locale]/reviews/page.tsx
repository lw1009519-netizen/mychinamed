import { Link } from '@/i18n/routing'
import { Star, ArrowRight, Quote } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
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

// Sample testimonials (to be replaced with Supabase data later)
const sampleReviews = [
  {
    id: '1',
    name: 'Michael T.',
    country: 'USA',
    flag: '\u{1F1FA}\u{1F1F8}',
    treatment: 'dental',
    treatmentName_en: 'Full Mouth Implants',
    treatmentName_zh: '\u5168\u53E3\u79CD\u690D\u7259',
    rating: 5,
    story_en: 'I saved over $30,000 on full mouth implants at a top hospital in Shanghai. The international department arranged everything from airport pickup to hotel. My dentist spoke perfect English and the technology was more advanced than what I\'ve seen in the US. Highly recommend!',
    story_zh: '\u6211\u5728\u4E0A\u6D77\u4E00\u5BB6\u9876\u7EA7\u533B\u9662\u505A\u5168\u53E3\u79CD\u690D\u7259\uFF0C\u8282\u7701\u4E86\u8D85\u8FC73\u4E07\u7F8E\u5143\u3002\u56FD\u9645\u90E8\u5B89\u6392\u4E86\u4ECE\u63A5\u673A\u5230\u9152\u5E97\u7684\u4E00\u5207\u3002\u6211\u7684\u7259\u533B\u82F1\u8BED\u6D41\u5229\uFF0C\u6280\u672F\u6BD4\u6211\u5728\u7F8E\u56FD\u89C1\u8FC7\u7684\u66F4\u5148\u8FDB\u3002\u5F3A\u70C8\u63A8\u8350\uFF01',
    date: '2025-11',
  },
  {
    id: '2',
    name: 'Sarah K.',
    country: 'UK',
    flag: '\u{1F1EC}\u{1F1E7}',
    treatment: 'eye',
    treatmentName_en: 'LASIK Surgery',
    treatmentName_zh: '\u8FD1\u89C6\u6FC0\u5149\u624B\u672F',
    rating: 5,
    story_en: 'Had LASIK at Beijing Tongren Hospital — one of the best eye hospitals in Asia. The whole procedure took 15 minutes and I could see clearly the next morning. Total cost including flights and hotel was still less than half the UK price.',
    story_zh: '\u5728\u5317\u4EAC\u540C\u4EC1\u533B\u9662\u505A\u4E86LASIK\u624B\u672F\u2014\u2014\u4E9A\u6D32\u6700\u597D\u7684\u773C\u79D1\u533B\u9662\u4E4B\u4E00\u3002\u6574\u4E2A\u624B\u672F\u53EA\u75285\u5206\u949F\uFF0C\u7B2C\u4E8C\u5929\u65E9\u4E0A\u5C31\u80FD\u770B\u6E05\u695A\u4E86\u3002\u52A0\u4E0A\u673A\u7968\u548C\u9152\u5E97\u7684\u603B\u8D39\u7528\u8FD8\u4E0D\u5230\u82F1\u56FD\u4EF7\u683C\u7684\u4E00\u534A\u3002',
    date: '2025-10',
  },
  {
    id: '3',
    name: 'Dmitry P.',
    country: 'Russia',
    flag: '\u{1F1F7}\u{1F1FA}',
    treatment: 'orthopedic',
    treatmentName_en: 'Knee Replacement',
    treatmentName_zh: '\u819D\u5173\u8282\u7F6E\u6362',
    rating: 4,
    story_en: 'After years of knee pain, I decided to get a replacement in China. The surgeon at West China Hospital was incredibly skilled. Recovery was smooth, they even had Russian-speaking staff. The total cost was about $12,000 — a fraction of what it would be back home.',
    story_zh: '\u591A\u5E74\u819D\u76D6\u75BC\u75DB\u540E\uFF0C\u6211\u51B3\u5B9A\u5728\u4E2D\u56FD\u505A\u7F6E\u6362\u624B\u672F\u3002\u534E\u897F\u533B\u9662\u7684\u5916\u79D1\u533B\u751F\u6280\u672F\u7CBE\u6E5B\u3002\u6062\u590D\u5F88\u987A\u5229\uFF0C\u4ED6\u4EEC\u8FD8\u6709\u4F1A\u8BF4\u4FC4\u8BED\u7684\u5DE5\u4F5C\u4EBA\u5458\u3002\u603B\u8D39\u7528\u7EA6\u4E3A12,000\u7F8E\u5143\u2014\u2014\u53EA\u662F\u56FD\u5185\u4EF7\u683C\u7684\u4E00\u5C0F\u90E8\u5206\u3002',
    date: '2025-09',
  },
  {
    id: '4',
    name: 'Emma L.',
    country: 'Australia',
    flag: '\u{1F1E6}\u{1F1FA}',
    treatment: 'fertility',
    treatmentName_en: 'IVF Cycle',
    treatmentName_zh: '\u8BD5\u7BA1\u5A74\u513F',
    rating: 5,
    story_en: 'After two failed IVF cycles in Australia costing $15k each, we tried China. The clinic in Changsha was world-class, the doctors were so caring, and the success rate was amazing. Our miracle baby is now 3 months old. Total cost for 2 cycles was under $15,000.',
    story_zh: '\u5728\u6FB3\u5927\u5229\u4E9A\u4E24\u6B21IVF\u5931\u8D25\uFF0C\u6BCF\u6B21\u82B1\u8D39$15k\u540E\uFF0C\u6211\u4EEC\u5C1D\u8BD5\u4E86\u4E2D\u56FD\u3002\u957F\u6C99\u7684\u8BCA\u6240\u662F\u4E16\u754C\u7EA7\u7684\uFF0C\u533B\u751F\u975E\u5E38\u7528\u5FC3\uFF0C\u6210\u529F\u7387\u4EE4\u4EBA\u60CA\u53F9\u3002\u6211\u4EEC\u7684\u5947\u8FF9\u5B9D\u5B9D\u73B0\u5728\u5DF2\u7ECF3\u4E2A\u6708\u5927\u4E86\u3002\u4E24\u6B21\u7684\u603B\u8D39\u7528\u4E0D\u5230$15,000\u3002',
    date: '2025-08',
  },
  {
    id: '5',
    name: 'Ahmed R.',
    country: 'UAE',
    flag: '\u{1F1E6}\u{1F1EA}',
    treatment: 'checkup',
    treatmentName_en: 'Executive Health Screening',
    treatmentName_zh: '\u9AD8\u7AEF\u4F53\u68C0\u5957\u9910',
    rating: 5,
    story_en: 'I fly to Shanghai every year for my annual executive health screening. The VIP ward at Huashan Hospital is like a 5-star hotel. Full body scan, blood work, cardiac tests — all done in one day. The whole package costs $800, which is incredible value.',
    story_zh: '\u6211\u6BCF\u5E74\u90FD\u98DE\u5230\u4E0A\u6D77\u505A\u5E74\u5EA6\u9AD8\u7AEF\u4F53\u68C0\u3002\u534E\u5C71\u533B\u9662\u7684VIP\u75C5\u623F\u50CF\u4E94\u661F\u7EA7\u9152\u5E97\u3002\u5168\u8EAB\u626B\u63CF\u3001\u8840\u6DB2\u68C0\u67E5\u3001\u5FC3\u810F\u68C0\u67E5\u2014\u2014\u5168\u90E8\u4E00\u5929\u5185\u5B8C\u6210\u3002\u6574\u4E2A\u5957\u9910\u53EA\u8981$800\uFF0C\u6027\u4EF7\u6BD4\u4EE4\u4EBA\u96BE\u4EE5\u7F6E\u4FE1\u3002',
    date: '2025-07',
  },
  {
    id: '6',
    name: 'Maria G.',
    country: 'Brazil',
    flag: '\u{1F1E7}\u{1F1F7}',
    treatment: 'cosmetic',
    treatmentName_en: 'Rhinoplasty',
    treatmentName_zh: '\u9686\u9F3B\u624B\u672F',
    rating: 4,
    story_en: 'Got rhinoplasty done in Guangzhou. The surgeon was very experienced and understood exactly what I wanted. The hospital had a translator for Portuguese speakers which was a huge help. Results are natural-looking and I paid about $3,000 total.',
    story_zh: '\u5728\u5E7F\u5DDE\u505A\u4E86\u9686\u9F3B\u624B\u672F\u3002\u5916\u79D1\u533B\u751F\u7ECF\u9A8C\u4E30\u5BCC\uFF0C\u5B8C\u5168\u7406\u89E3\u6211\u7684\u9700\u6C42\u3002\u533B\u9662\u6709\u8461\u8404\u7259\u8BED\u7FFB\u8BD1\uFF0C\u5E2E\u52A9\u5F88\u5927\u3002\u6548\u679C\u5F88\u81EA\u7136\uFF0C\u603B\u5171\u82B1\u4E86\u7EA6$3,000\u3002',
    date: '2025-06',
  },
  {
    id: '7',
    name: 'James W.',
    country: 'Canada',
    flag: '\u{1F1E8}\u{1F1E6}',
    treatment: 'cardiac',
    treatmentName_en: 'Heart Bypass Surgery',
    treatmentName_zh: '\u5FC3\u810F\u642D\u6865\u624B\u672F',
    rating: 5,
    story_en: 'I was on a 2-year waiting list in Canada for heart bypass surgery. MyChinaMed connected me with Fuwai Hospital — China\'s #1 cardiac center. The surgery was done within 2 weeks of my inquiry. The surgeon had performed over 5,000 similar operations. Cost was $18,000 vs $150,000+ in the US.',
    story_zh: '\u6211\u5728\u52A0\u62FF\u5927\u7B49\u4E86\u4E24\u5E74\u7684\u5FC3\u810F\u642D\u6865\u624B\u672F\u3002MyChinaMed\u4E3A\u6211\u8054\u7CFB\u4E86\u961C\u5916\u533B\u9662\u2014\u2014\u4E2D\u56FD\u7B2C\u4E00\u5FC3\u810F\u4E2D\u5FC3\u3002\u54A8\u8BE2\u540E\u4E24\u5468\u5185\u5C31\u5B8C\u6210\u4E86\u624B\u672F\u3002\u5916\u79D1\u533B\u751F\u5DF2\u5B8C\u6210\u8D855,000\u4F8B\u7C7B\u4F3C\u624B\u672F\u3002\u8D39\u7528\u4E3A$18,000\uFF0C\u800C\u7F8E\u56FD\u8D85\u8FC7$150,000\u3002',
    date: '2025-12',
  },
  {
    id: '8',
    name: 'Yuki S.',
    country: 'Japan',
    flag: '\u{1F1EF}\u{1F1F5}',
    treatment: 'tcm',
    treatmentName_en: 'Acupuncture Program',
    treatmentName_zh: '\u9488\u7078\u7597\u7A0B',
    rating: 5,
    story_en: 'As someone who has practiced acupuncture in Japan, I wanted to experience authentic TCM in China. The 2-week program at a traditional hospital in Hangzhou was transformative. My chronic back pain is 90% gone. The combination of acupuncture, herbal medicine, and tuina massage was incredible.',
    story_zh: '\u4F5C\u4E3A\u4E00\u540D\u5728\u65E5\u672C\u7EC3\u4E60\u9488\u7078\u7684\u4EBA\uFF0C\u6211\u60F3\u4F53\u9A8C\u4E2D\u56FD\u6B63\u5B97\u7684\u4E2D\u533B\u3002\u5728\u676D\u5DDE\u4E00\u5BB6\u4F20\u7EDF\u533B\u9662\u7684\u4E24\u5468\u7597\u7A0B\u6548\u679C\u663E\u8457\u3002\u6211\u7684\u6162\u6027\u80CC\u75DB\u597D\u4E8690%\u3002\u9488\u7078\u3001\u8349\u836F\u548C\u63A8\u62FF\u7684\u7EC4\u5408\u4EE4\u4EBA\u96BE\u4EE5\u7F6E\u4FE1\u3002',
    date: '2025-05',
  },
]

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
  const isZh = locale === 'zh'
  const t = await getTranslations({ locale, namespace: 'reviewsPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const ts = await getTranslations({ locale, namespace: 'specialties' })

  const avgRating = (sampleReviews.reduce((sum, r) => sum + r.rating, 0) / sampleReviews.length).toFixed(1)

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
              <p className="font-mono text-3xl font-bold text-brand">{sampleReviews.length}</p>
              <p className="mt-1 text-xs text-text-muted">{t('totalReviews')}</p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-center">
              <p className="font-mono text-3xl font-bold text-brand">8</p>
              <p className="mt-1 text-xs text-text-muted">{t('countries')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleReviews.map((review) => (
              <div
                key={review.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Quote icon */}
                <Quote className="mb-3 h-6 w-6 text-brand/20" />

                {/* Story */}
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{isZh ? review.story_zh : review.story_en}&rdquo;
                </p>

                {/* Rating */}
                <div className="mt-4">
                  <StarRating rating={review.rating} />
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-slate-100" />

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-lg">
                      {review.flag}
                    </span>
                    <div>
                      <p className="font-medium text-text-primary">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.country}</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
                    {ts(review.treatment)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Sample disclaimer */}
          <p className="mt-8 text-center text-sm text-text-muted">
            {t('sampleDisclaimer')}
          </p>
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
