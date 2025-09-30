import { NextIntlClientProvider } from 'next-intl'
import type { Metadata } from 'next'

type Params = { locale: 'zh' | 'en' | 'es' }

// 集中处理 hreflang 和基础 SEO metadata
export function generateMetadata({ params }: { params: Params }): Metadata {
  const lang = params.locale === 'en' ? 'en_US' : params.locale === 'es' ? 'es_ES' : 'zh_CN'
  return {
    alternates: {
      languages: {
        en: '/en',
        zh: '/zh',
        es: '/es',
      },
    },
    openGraph: { locale: lang },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { locale } = params
  const messages = (await import(`../../messages/${locale}.json`)).default
  
  return (
    <NextIntlClientProvider locale={locale} messages={messages as Record<string, unknown>}>
      <div id="wrap">
        {children}
      </div>
    </NextIntlClientProvider>
  )
}

// Ensure static export for all locales
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}
