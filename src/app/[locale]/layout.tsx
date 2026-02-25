import type { Metadata } from 'next'
import { DM_Serif_Display, Source_Sans_3, DM_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import '../globals.css'

const heading = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
})
const body = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
})
const mono = DM_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'MyChinaMed — World-Class Medical Care in China',
  description:
    'Connect with top-rated Chinese hospitals and verified doctors. Save up to 70% on medical treatments. Our service is 100% free.',
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!routing.locales.includes(locale as 'en' | 'zh' | 'ru')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
