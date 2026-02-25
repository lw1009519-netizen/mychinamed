import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-dark">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24 lg:px-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <span className="font-heading text-2xl text-white">MyChinaMed</span>
            <p className="text-sm leading-relaxed text-slate-400">
              {t('description')}
            </p>
          </div>

          {/* Column 2 — Treatments */}
          <div>
            <h4 className="mb-4 font-heading text-lg text-white">
              {t('treatments')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/treatments" className="transition-colors hover:text-white">
                  Dental & Implants
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="transition-colors hover:text-white">
                  Eye & LASIK
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="transition-colors hover:text-white">
                  Oncology & CAR-T
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="transition-colors hover:text-white">
                  Traditional Chinese Medicine
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="transition-colors hover:text-white">
                  Health Screening
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="mb-4 font-heading text-lg text-white">
              {t('company')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-white">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Support */}
          <div>
            <h4 className="mb-4 font-heading text-lg text-white">
              {t('support')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href="/guide" className="transition-colors hover:text-white">
                  {t('guide')}
                </Link>
              </li>
              <li>
                <span className="transition-colors hover:text-white">
                  {t('whatsapp')}
                </span>
              </li>
              <li>
                <span className="transition-colors hover:text-white">
                  {t('telegram')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          {t('copyright')}
        </div>
      </div>
    </footer>
  )
}
