'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Search } from 'lucide-react'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="bg-gradient-to-br from-brand-light to-white pt-16 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <span className="text-sm font-semibold uppercase tracking-wider text-brand">
              {t('badge')}
            </span>
            <h1 className="font-heading text-5xl leading-tight text-text-primary md:text-6xl">
              {t('title')}
            </h1>
            <p className="text-lg leading-relaxed text-text-secondary">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-muted">
              <span>{t('stats.patients')}</span>
              <span className="text-slate-300">|</span>
              <span>{t('stats.hospitals')}</span>
              <span className="text-slate-300">|</span>
              <span>{t('stats.free')}</span>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/get-quote"
                className="rounded-xl bg-brand px-8 py-4 text-center font-body text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark hover:shadow-md"
              >
                {t('cta')}
              </Link>
              <Link
                href="/treatments"
                className="rounded-xl border border-brand bg-white px-8 py-4 text-center font-body text-base font-semibold text-brand transition-all duration-200 hover:bg-brand-light"
              >
                {t('ctaSecondary')}
              </Link>
            </div>
          </div>

          {/* Right column — Search card */}
          <div className="rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="mb-6 font-heading text-2xl text-text-primary">
              {t('searchTitle')}
            </h2>
            <div className="space-y-4">
              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base text-text-primary transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                defaultValue=""
              >
                <option value="" disabled>
                  {t('searchTreatment')}
                </option>
                <option value="dental">Dental & Implants</option>
                <option value="eye">Eye & LASIK</option>
                <option value="oncology">Oncology & CAR-T</option>
                <option value="tcm">Traditional Chinese Med</option>
                <option value="orthopedic">Orthopedic & Spine</option>
                <option value="cosmetic">Cosmetic Surgery</option>
                <option value="fertility">Fertility & IVF</option>
                <option value="cardiac">Cardiac Surgery</option>
                <option value="checkup">Health Screening</option>
                <option value="stem_cell">Stem Cell Therapy</option>
                <option value="neurology">Neurology</option>
                <option value="bariatric">Weight Loss Surgery</option>
              </select>

              <select
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base text-text-primary transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                defaultValue=""
              >
                <option value="" disabled>
                  {t('searchCity')}
                </option>
                <option value="beijing">Beijing</option>
                <option value="shanghai">Shanghai</option>
                <option value="guangzhou">Guangzhou</option>
                <option value="shenzhen">Shenzhen</option>
                <option value="hangzhou">Hangzhou</option>
                <option value="chengdu">Chengdu</option>
                <option value="xian">Xi&apos;an</option>
                <option value="changsha">Changsha</option>
              </select>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 font-body text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark hover:shadow-md">
                <Search className="h-5 w-5" />
                {t('searchButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
