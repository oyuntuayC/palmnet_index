import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { getLegalDocument } from '@/lib/legal'
import { locales, type Locale } from '@/lib/locales'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const document = getLegalDocument(params.locale, 'terms')

  return {
    title: document?.data.title ?? 'Terms of Service - PalmNet',
    description: document?.data.description ?? 'PalmNet terms of service',
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function TermsPage({ params }: { params: { locale: Locale } }): React.ReactElement {
  return <LegalPage slug="terms" locale={params.locale} />
}
