import type { MetadataRoute } from 'next'
import { getHospitals, getTreatments } from '@/lib/supabase/queries'
import { getBlogPosts } from '@/data/blog-posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mychinamed.com'
const locales = ['en', 'zh', 'ru']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [hospitals, treatments] = await Promise.all([
    getHospitals(),
    getTreatments(),
  ])

  const staticPages = ['', '/hospitals', '/treatments', '/pricing', '/reviews', '/blog', '/get-quote']

  const staticEntries = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
    }))
  )

  const hospitalEntries = hospitals.flatMap((hospital) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/hospitals/${hospital.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const treatmentEntries = treatments.flatMap((treatment) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/treatments/${treatment.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const blogPostEntries = getBlogPosts().flatMap((post) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )

  return [...staticEntries, ...hospitalEntries, ...treatmentEntries, ...blogPostEntries]
}
