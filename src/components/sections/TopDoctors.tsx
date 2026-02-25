import { useTranslations } from 'next-intl'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'

const doctorsData = [
  {
    id: '1',
    name: 'Dr. Zhang Wei',
    title: 'Chief Physician, Professor',
    hospital: 'Peking Union Medical College Hospital',
    specialty: 'oncology',
    specialtyLabel: 'Oncology',
    years: 25,
    treatments: 3200,
    score: 9.6,
    avatar: null,
  },
  {
    id: '2',
    name: 'Dr. Li Mei',
    title: 'Associate Chief Physician',
    hospital: 'West China Hospital',
    specialty: 'dental',
    specialtyLabel: 'Dental',
    years: 18,
    treatments: 5600,
    score: 9.3,
    avatar: null,
  },
  {
    id: '3',
    name: 'Dr. Wang Jun',
    title: 'Chief Physician',
    hospital: 'Zhongshan Hospital, Fudan University',
    specialty: 'cardiac',
    specialtyLabel: 'Cardiac',
    years: 30,
    treatments: 2800,
    score: 9.5,
    avatar: null,
  },
  {
    id: '4',
    name: 'Dr. Chen Ling',
    title: 'Professor, TCM Master',
    hospital: 'Guanganmen Hospital, CACMS',
    specialty: 'tcm',
    specialtyLabel: 'TCM',
    years: 35,
    treatments: 12000,
    score: 9.1,
    avatar: null,
  },
  {
    id: '5',
    name: 'Dr. Liu Yang',
    title: 'Chief Physician',
    hospital: 'Eye & ENT Hospital of Fudan University',
    specialty: 'eye',
    specialtyLabel: 'Ophthalmology',
    years: 20,
    treatments: 8500,
    score: 9.2,
    avatar: null,
  },
  {
    id: '6',
    name: 'Dr. Zhao Peng',
    title: 'Associate Chief Physician',
    hospital: 'Huashan Hospital',
    specialty: 'orthopedic',
    specialtyLabel: 'Orthopedic',
    years: 15,
    treatments: 2100,
    score: 8.8,
    avatar: null,
  },
]

export default function TopDoctors() {
  const t = useTranslations('doctors')

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

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctorsData.map((doc) => (
            <div
              key={doc.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg md:p-8"
            >
              {/* Score badge */}
              <div className="absolute right-6 top-6">
                <ScoreBadge score={doc.score} />
              </div>

              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-brand-light bg-brand-light font-heading text-2xl text-brand">
                {doc.name.split(' ').pop()?.charAt(0)}
              </div>

              {/* Info */}
              <h3 className="mt-4 font-heading text-xl text-text-primary">
                {doc.name}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {doc.title}
              </p>
              <p className="text-sm text-text-muted">{doc.hospital}</p>

              {/* Specialty tag */}
              <span className="mt-3 inline-block rounded-lg bg-brand-light px-3 py-1 text-xs font-medium text-brand">
                {doc.specialtyLabel}
              </span>

              {/* Stats */}
              <p className="mt-3 text-sm text-text-secondary">
                {doc.years} {t('yearsExp')} · {doc.treatments.toLocaleString()}{' '}
                {t('treatments')}
              </p>

              {/* Link */}
              <Link
                href="/doctors"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand-dark"
              >
                {t('viewProfile')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-xl border border-brand bg-white px-8 py-4 font-body text-base font-semibold text-brand transition-all duration-200 hover:bg-brand-light"
          >
            {t('viewAll')}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
