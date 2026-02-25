import { useTranslations } from 'next-intl'

export default function TrustBar() {
  const t = useTranslations('trustBar')
  const items = t('items')

  return (
    <section className="overflow-hidden bg-dark py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="mx-8 inline-block font-body text-sm text-slate-400"
          >
            {items}
          </span>
        ))}
      </div>
    </section>
  )
}
