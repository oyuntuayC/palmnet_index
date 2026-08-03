import { getTranslations } from 'next-intl/server'

import MarkdownRenderer from '@/components/blog/MarkdownRenderer'
import { getLegalDocument, type LegalDocSlug } from '@/lib/legal'
import type { Locale } from '@/lib/locales'

type LegalPageProps = {
  slug: LegalDocSlug
  locale: Locale
}

export async function LegalPage({ slug, locale }: LegalPageProps): Promise<React.ReactElement> {
  const document = getLegalDocument(locale, slug)
  const t = await getTranslations({ locale, namespace: 'legal' })

  if (!document) {
    return (
      <main className="bg-white text-[#0a0a0a]">
        <section className="section-space">
          <div className="layout-page layout-page-narrow text-center">
            <h1 className="type-display-md text-black">{t('notFound')}</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-white text-[#0a0a0a]">
      <section className="section-space">
        <div className="layout-page layout-page-narrow">
          <h1 className="type-display-md text-black">{document.data.title}</h1>
          <p className="type-caption stack-title-body text-[#71717b]">
            {t('lastUpdated', { date: document.data.lastUpdated })}
          </p>
          <div className="legal-body markdown-body stack-body-action">
            <MarkdownRenderer markdown={document.content} />
          </div>
        </div>
      </section>
    </main>
  )
}
