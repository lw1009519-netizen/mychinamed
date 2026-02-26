'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { Link, useRouter } from '@/i18n/routing'

const localeLabels: Record<string, string> = {
  en: 'English',
  zh: '中文',
  ru: 'Русский',
}

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/treatments' as const, label: t('treatments') },
    { href: '/hospitals' as const, label: t('hospitals') },
    { href: '/doctors' as const, label: t('doctors') },
    { href: '/pricing' as const, label: t('pricing') },
    { href: '/reviews' as const, label: t('reviews') },
    { href: '/blog' as const, label: t('blog') },
  ]

  const currentLocale = pathname.split('/')[1] || 'en'

  function handleLocaleChange(locale: string) {
    const pathWithoutLocale = pathname.replace(/^\/(en|zh|ru)/, '') || '/'
    router.replace(pathWithoutLocale as '/', { locale: locale as 'en' | 'zh' | 'ru' })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300 md:h-20 ${
        scrolled
          ? 'bg-white/80 shadow-sm backdrop-blur-lg'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl text-brand md:text-2xl">
          MyChinaMed
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right section */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language switcher */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:text-brand"
              onClick={() => {
                const locales = ['en', 'zh', 'ru']
                const nextIndex = (locales.indexOf(currentLocale) + 1) % locales.length
                handleLocaleChange(locales[nextIndex])
              }}
            >
              <Globe className="h-4 w-4" />
              <span>{localeLabels[currentLocale] || 'English'}</span>
            </button>
          </div>

          {/* CTA */}
          <Link
            href="/get-quote"
            className="rounded-xl bg-brand px-6 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark hover:shadow-md"
          >
            {t('getQuote')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-text-primary" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 font-body text-sm font-medium text-text-secondary transition-colors hover:bg-brand-light hover:text-brand"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-slate-100" />
            <div className="flex gap-2">
              {(['en', 'zh', 'ru'] as const).map((locale) => (
                <button
                  key={locale}
                  onClick={() => {
                    handleLocaleChange(locale)
                    setMobileOpen(false)
                  }}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    currentLocale === locale
                      ? 'bg-brand text-white'
                      : 'bg-slate-100 text-text-secondary hover:bg-brand-light'
                  }`}
                >
                  {localeLabels[locale]}
                </button>
              ))}
            </div>
            <Link
              href="/get-quote"
              className="mt-2 rounded-xl bg-brand px-6 py-3 text-center font-body text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark"
              onClick={() => setMobileOpen(false)}
            >
              {t('getQuote')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
