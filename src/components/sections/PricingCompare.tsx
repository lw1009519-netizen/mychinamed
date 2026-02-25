import { useTranslations } from 'next-intl'

const pricingData = [
  {
    key: 'dentalImplant',
    usa: '$3,000–5,000',
    uk: '$2,500–4,000',
    germany: '$2,000–3,500',
    thailand: '$1,200–2,000',
    india: '$600–1,500',
    china: '$800–1,500',
  },
  {
    key: 'lasik',
    usa: '$4,000–6,000',
    uk: '$3,000–5,000',
    germany: '$2,500–4,000',
    thailand: '$1,500–2,500',
    india: '$800–1,500',
    china: '$1,200–2,000',
  },
  {
    key: 'kneeReplace',
    usa: '$30k–50k',
    uk: '$15k–25k',
    germany: '$12k–20k',
    thailand: '$8k–12k',
    india: '$5k–8k',
    china: '$6k–10k',
  },
  {
    key: 'carT',
    usa: '$400k–500k',
    uk: '$350k–400k',
    germany: '$300k–380k',
    thailand: 'N/A',
    india: 'N/A',
    china: '$30k–80k',
  },
  {
    key: 'ivf',
    usa: '$15k–25k',
    uk: '$8k–12k',
    germany: '$5k–8k',
    thailand: '$4k–6k',
    india: '$3k–5k',
    china: '$4k–8k',
  },
  {
    key: 'healthCheck',
    usa: '$2k–5k',
    uk: '$1k–3k',
    germany: '$800–2k',
    thailand: '$400–800',
    india: '$200–500',
    china: '$300–1k',
  },
] as const

const countries = [
  { flag: '🇺🇸', label: 'USA', key: 'usa' },
  { flag: '🇬🇧', label: 'UK', key: 'uk' },
  { flag: '🇩🇪', label: 'Germany', key: 'germany' },
  { flag: '🇹🇭', label: 'Thailand', key: 'thailand' },
  { flag: '🇮🇳', label: 'India', key: 'india' },
  { flag: '🇨🇳', label: 'China', key: 'china' },
] as const

export default function PricingCompare() {
  const t = useTranslations('pricing')

  return (
    <section className="bg-bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        {/* Table wrapper */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[800px] text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-bg-subtle">
                <th className="sticky left-0 bg-bg-subtle px-6 py-4 font-body text-sm font-semibold text-text-primary">
                  {t('treatment')}
                </th>
                {countries.map((c) => (
                  <th
                    key={c.key}
                    className={`px-4 py-4 text-center font-body text-sm font-semibold ${
                      c.key === 'china'
                        ? 'bg-brand-light text-brand'
                        : 'text-text-primary'
                    }`}
                  >
                    <span className="text-lg">{c.flag}</span>
                    <br />
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingData.map((row, idx) => (
                <tr
                  key={row.key}
                  className={
                    idx % 2 === 0 ? 'bg-white' : 'bg-bg-subtle'
                  }
                >
                  <td className="sticky left-0 bg-inherit px-6 py-4 font-body text-sm font-medium text-text-primary">
                    {t(row.key)}
                  </td>
                  {countries.map((c) => (
                    <td
                      key={c.key}
                      className={`px-4 py-4 text-center font-mono text-sm ${
                        c.key === 'china'
                          ? 'bg-brand-light font-bold text-brand'
                          : 'text-text-secondary'
                      }`}
                    >
                      {row[c.key]}
                      {c.key === 'china' && ' ✨'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-center text-xs text-text-muted">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  )
}
