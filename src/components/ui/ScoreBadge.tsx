import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface ScoreBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const t = useTranslations('doctors')

  let bgColor: string
  let label: string

  if (score >= 9.0) {
    bgColor = 'bg-score-excellent'
    label = t('outstanding')
  } else if (score >= 8.0) {
    bgColor = 'bg-score-good'
    label = t('veryGood')
  } else {
    bgColor = 'bg-score-fair'
    label = t('good')
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl px-3 py-1.5',
        bgColor,
        className
      )}
    >
      <span className="font-mono text-lg font-bold text-white">
        {score.toFixed(1)}
      </span>
      <span className="font-body text-xs font-medium text-white opacity-90">
        {label}
      </span>
    </div>
  )
}
