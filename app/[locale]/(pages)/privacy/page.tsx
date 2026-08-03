import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { getLegalDocument } from '@/lib/legal'
import { locales, type Locale } from '@/lib/locales'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const document = getLegalDocument(params.locale, 'privacy')

  return {
    title: document?.data.title ?? 'Privacy Policy - PalmNet',
    description: document?.data.description ?? 'PalmNet privacy policy',
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }): React.ReactElement {
  return <LegalPage slug="privacy" locale={params.locale} />
}
