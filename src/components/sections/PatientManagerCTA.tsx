import { useTranslations } from 'next-intl'
import { MessageCircle, Mail } from 'lucide-react'

export default function PatientManagerCTA() {
  const t = useTranslations('patientManager')

  return (
    <section className="bg-brand px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:gap-12">
        {/* Coordinator avatar */}
        <div className="flex-shrink-0">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-5xl">
            👩‍⚕️
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-heading text-3xl text-white md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-lg text-white/80">{t('subtitle')}</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/8613800000000?text=Hi,%20I'd%20like%20to%20get%20a%20free%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-body text-base font-semibold text-brand shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <MessageCircle className="h-5 w-5" />
            {t('ctaPrimary')}
          </a>
          <a
            href="#quote-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 font-body text-base font-semibold text-white transition-all duration-200 hover:bg-white/10"
          >
            <Mail className="h-5 w-5" />
            {t('ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
