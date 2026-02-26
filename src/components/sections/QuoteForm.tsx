'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Lock, Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

interface QuoteFormProps {
  defaultTreatment?: string
  sourcePage?: string
  embedded?: boolean
}

interface QuoteFormData {
  name: string
  email: string
  phone: string
  treatment: string
  contactMethod: 'whatsapp' | 'telegram' | 'email' | 'phone'
  contactHandle: string
  description: string
}

const treatmentOptions = [
  'dental',
  'eye',
  'oncology',
  'tcm',
  'orthopedic',
  'cosmetic',
  'fertility',
  'cardiac',
  'checkup',
  'stem_cell',
  'neurology',
  'bariatric',
] as const

export default function QuoteForm({
  defaultTreatment,
  sourcePage,
  embedded = false,
}: QuoteFormProps) {
  const t = useTranslations('quoteForm')
  const ts = useTranslations('specialties')
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    defaultValues: {
      contactMethod: 'whatsapp',
      treatment: defaultTreatment ?? '',
    },
  })

  const contactMethod = watch('contactMethod')

  async function onSubmit(data: QuoteFormData) {
    setSubmitError(false)

    const { error } = await supabase.from('quotes').insert({
      patient_name: data.name,
      email: data.email,
      phone: data.phone || null,
      treatment_interest: data.treatment,
      description: data.description || null,
      contact_method: data.contactMethod,
      contact_handle: data.contactHandle || null,
      source_page: sourcePage ?? null,
    })

    if (error) {
      setSubmitError(true)
      return
    }

    setSubmitted(true)
  }

  const successContent = (
    <div className="mx-auto max-w-2xl text-center py-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
        <CheckCircle className="h-8 w-8 text-brand" />
      </div>
      <h2 className="font-heading text-3xl text-text-primary">
        {t('success')}
      </h2>
    </div>
  )

  const formContent = (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl lg:col-span-2 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                  {t('name')} *
                </label>
                <input
                  {...register('name', {
                    required: t('validation.nameRequired'),
                  })}
                  placeholder={t('namePlaceholder')}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                  {t('email')} *
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: t('validation.emailRequired'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('validation.emailInvalid'),
                    },
                  })}
                  placeholder={t('emailPlaceholder')}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                {t('phone')}
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder={t('phonePlaceholder')}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Treatment */}
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                {t('treatment')} *
              </label>
              <select
                {...register('treatment', {
                  required: t('validation.treatmentRequired'),
                })}
                defaultValue={defaultTreatment ?? ''}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="" disabled>
                  {t('treatmentPlaceholder')}
                </option>
                {treatmentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {ts(opt)}
                  </option>
                ))}
              </select>
              {errors.treatment && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.treatment.message}
                </p>
              )}
            </div>

            {/* Contact method */}
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                {t('contactMethod')}
              </label>
              <div className="flex flex-wrap gap-4">
                {(['whatsapp', 'telegram', 'email', 'phone'] as const).map(
                  (method) => (
                    <label
                      key={method}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        value={method}
                        {...register('contactMethod')}
                        className="h-4 w-4 accent-brand"
                      />
                      <span className="text-sm text-text-secondary">
                        {t(
                          method === 'email'
                            ? 'emailOption'
                            : method === 'phone'
                              ? 'phoneOption'
                              : method
                        )}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Contact handle */}
            {contactMethod !== 'email' && (
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                  {t('contactHandle')}
                </label>
                <input
                  {...register('contactHandle')}
                  placeholder={t('contactHandlePlaceholder')}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                {t('description')}
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder={t('descriptionPlaceholder')}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 font-body text-base transition-colors duration-200 placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Error message */}
            {submitError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {t('errorMessage')}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-brand px-8 py-4 font-body text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-dark hover:shadow-md disabled:opacity-60"
            >
              {isSubmitting ? t('submitting') : t('submit')}
            </button>
          </form>
        </div>

        {/* Trust info */}
        <div className="space-y-6 lg:pt-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <Lock className="h-5 w-5 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('trustSecure')}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <Clock className="h-5 w-5 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('trustFast')}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-light">
              <DollarSign className="h-5 w-5 text-brand" />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {t('trustFree')}
            </p>
          </div>
        </div>
      </div>
    </>
  )

  if (embedded) {
    return (
      <div className="mx-auto max-w-7xl">
        {!embedded && (
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
          </div>
        )}
        {submitted ? successContent : formContent}
      </div>
    )
  }

  return (
    <section id="quote-form" className="bg-bg-soft px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl leading-tight text-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>
        {submitted ? successContent : formContent}
      </div>
    </section>
  )
}
