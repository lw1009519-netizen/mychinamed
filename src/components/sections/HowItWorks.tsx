import { useTranslations } from 'next-intl'

const steps = [
  { emoji: '📋', step: '01', titleKey: 'step1Title', descKey: 'step1Desc' },
  { emoji: '🏥', step: '02', titleKey: 'step2Title', descKey: 'step2Desc' },
  { emoji: '✈️', step: '03', titleKey: 'step3Title', descKey: 'step3Desc' },
  { emoji: '😊', step: '04', titleKey: 'step4Title', descKey: 'step4Desc' },
] as const

export default function HowItWorks() {
  const t = useTranslations('howItWorks')

  return (
    <section className="bg-bg-soft px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <div key={s.step} className="relative text-center">
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-8 hidden border-t-2 border-dashed border-slate-300 lg:block" />
              )}

              {/* Icon circle */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-light text-2xl">
                {s.emoji}
              </div>

              {/* Step number */}
              <span className="mt-4 inline-block font-mono text-xs text-text-muted">
                STEP {s.step}
              </span>

              {/* Title */}
              <h3 className="mt-2 font-heading text-xl text-text-primary">
                {t(s.titleKey)}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {t(s.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
