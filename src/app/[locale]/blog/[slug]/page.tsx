import { Link } from '@/i18n/routing'
import { ArrowRight, Clock, ChevronRight, User, MessageCircle } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import QuoteForm from '@/components/sections/QuoteForm'
import { getBlogPostBySlug, getBlogPosts } from '@/data/blog-posts'
import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'

interface BlogPostPageProps {
  params: { locale: string; slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: 'Not Found' }

  const isZh = params.locale === 'zh'
  const isRu = params.locale === 'ru'
  const title = isZh ? post.title_zh : isRu ? post.title_ru : post.title_en
  const description = isZh ? post.metaDescription_zh : isRu ? post.metaDescription_ru : post.metaDescription_en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${params.locale}/blog/${params.slug}`,
      siteName: 'MyChinaMed',
      locale: params.locale,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: {
      canonical: `${SITE_URL}/en/blog/${params.slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${params.slug}`,
        zh: `${SITE_URL}/zh/blog/${params.slug}`,
        ru: `${SITE_URL}/ru/blog/${params.slug}`,
      },
    },
  }
}

function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = []
  const regex = /<h([23])\s+id="([^"]+)"[^>]*>(.*?)<\/h[23]>/g
  let match
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    })
  }
  return headings
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params
  const isZh = locale === 'zh'
  const isRu = locale === 'ru'
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const title = isZh ? post.title_zh : isRu ? post.title_ru : post.title_en
  const content = isZh ? post.content_zh : isRu ? post.content_ru : post.content_en
  const headings = extractHeadings(content)

  const formattedDate = new Date(post.date).toLocaleDateString(
    isZh ? 'zh-CN' : isRu ? 'ru-RU' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  // Related posts (same category, excluding current)
  const relatedPosts = getBlogPosts()
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2)

  return (
    <div className="pt-16 md:pt-20">
      {/* Breadcrumbs */}
      <div className="border-b border-slate-100 bg-white px-4 py-3 md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 text-sm text-text-muted">
          <Link href="/" className="hover:text-brand">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="hover:text-brand">
            {t('breadcrumbBlog')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate text-text-secondary">{title}</span>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-gradient-to-br from-brand-light to-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {t('author')}
            </span>
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime} {t('minRead')}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body + Sidebar */}
      <section className="bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main Content */}
            <article
              className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-6 prose-h3:text-xl prose-p:leading-relaxed prose-p:text-text-secondary prose-a:text-brand prose-li:text-text-secondary prose-strong:text-text-primary"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <nav className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="mb-3 font-heading text-sm font-bold text-text-primary">
                      {t('tableOfContents')}
                    </h3>
                    <ul className="space-y-2">
                      {headings.map((heading) => (
                        <li
                          key={heading.id}
                          className={heading.level === 3 ? 'pl-3' : ''}
                        >
                          <a
                            href={`#${heading.id}`}
                            className="block text-sm leading-snug text-text-muted transition-colors hover:text-brand"
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}

                {/* Sidebar CTA */}
                <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-5 text-white">
                  <h3 className="font-heading text-base">{t('ctaTitle')}</h3>
                  <p className="mt-2 text-sm text-white/80">{t('ctaDesc')}</p>
                  <Link
                    href="/get-quote"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand transition-shadow hover:shadow-md"
                  >
                    {tNav('getQuote')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Author Info */}
      <section className="border-t border-slate-100 bg-bg-white px-4 py-8 md:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-6">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-2xl">
              {'\u{1F3E5}'}
            </span>
            <div>
              <p className="font-heading text-base text-text-primary">{t('author')}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {t('authorBio')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-100 bg-bg-white px-4 py-12 md:px-8 md:py-16 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 font-heading text-2xl text-text-primary">
              {t('relatedPosts')}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((rp) => {
                const rpTitle = isZh ? rp.title_zh : isRu ? rp.title_ru : rp.title_en
                const rpExcerpt = isZh ? rp.excerpt_zh : isRu ? rp.excerpt_ru : rp.excerpt_en
                return (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}` as '/blog'}
                    className="group rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <h3 className="font-heading text-base text-text-primary group-hover:text-brand">
                      {rpTitle}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                      {rpExcerpt}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-brand px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <div className="mx-auto max-w-4xl text-center text-white">
          <h2 className="font-heading text-2xl md:text-3xl">{t('ctaTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/80">{t('ctaDesc')}</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-body text-base font-semibold text-brand shadow-md transition-all duration-200 hover:shadow-lg"
            >
              {tNav('getQuote')}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-10 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="bg-bg-soft px-4 py-12 md:px-8 md:py-16 lg:px-16">
        <QuoteForm sourcePage={`/blog/${slug}`} embedded />
      </section>
    </div>
  )
}
