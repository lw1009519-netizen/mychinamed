import { Link } from '@/i18n/routing'
import { ArrowRight, Clock } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import QuoteForm from '@/components/sections/QuoteForm'
import { getBlogPosts, blogCategories } from '@/data/blog-posts'
import type { BlogCategory } from '@/data/blog-posts'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface BlogPageProps {
  params: { locale: string }
  searchParams: { category?: string }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'blogPage' })
  const title = t('metaTitle')
  const description = t('metaDescription')
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/blog`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/en/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        zh: `${SITE_URL}/zh/blog`,
        ru: `${SITE_URL}/ru/blog`,
      },
    },
  }
}

const categoryEmoji: Record<string, string> = {
  dental: '\u{1F9B7}',
  eye: '\u{1F441}\uFE0F',
  cosmetic: '\u2728',
  oncology: '\u{1F397}\uFE0F',
  orthopedic: '\u{1F9B4}',
  general: '\u{1F30F}',
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const locale = params.locale
  const isZh = locale === 'zh'
  const isRu = locale === 'ru'
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })
  const ts = await getTranslations({ locale, namespace: 'specialties' })

  const activeCategory = searchParams.category as BlogCategory | undefined
  const allPosts = getBlogPosts()
  const posts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts

  function getTitle(post: { title_en: string; title_zh: string; title_ru: string }) {
    if (isZh) return post.title_zh
    if (isRu) return post.title_ru
    return post.title_en
  }

  function getExcerpt(post: { excerpt_en: string; excerpt_zh: string; excerpt_ru: string }) {
    if (isZh) return post.excerpt_zh
    if (isRu) return post.excerpt_ru
    return post.excerpt_en
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(
      isZh ? 'zh-CN' : isRu ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
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

      {/* Category Filter + Posts */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Category Pills */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !activeCategory
                  ? 'bg-brand text-white'
                  : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
              }`}
            >
              {t('allCategories')}
            </Link>
            {blogCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}` as '/blog'}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand text-white'
                    : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
                }`}
              >
                {categoryEmoji[cat]} {ts(cat)}
              </Link>
            ))}
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <p className="py-12 text-center text-text-muted">{t('noPosts')}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}` as '/blog'}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Thumbnail placeholder */}
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-brand-light to-slate-100">
                    <span className="text-5xl">{categoryEmoji[post.category]}</span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {/* Category + Date */}
                    <div className="mb-3 flex items-center gap-3 text-xs text-text-muted">
                      <span className="rounded-full bg-brand-light px-2.5 py-0.5 font-medium text-brand">
                        {ts(post.category)}
                      </span>
                      <span>{formatDate(post.date)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} {t('minRead')}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 font-heading text-lg text-text-primary group-hover:text-brand">
                      {getTitle(post)}
                    </h2>

                    {/* Excerpt */}
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {getExcerpt(post)}
                    </p>

                    {/* Read More */}
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      {t('readMore')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
        <QuoteForm sourcePage="/blog" embedded />
      </section>
    </div>
  )
}
