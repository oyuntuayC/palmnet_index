import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaBullhorn, FaChartLine, FaFileInvoiceDollar, FaSyncAlt } from 'react-icons/fa'

import { FeatureHighlights } from '@/components/products/FeatureHighlights'
import { ProductsHero } from '@/components/products/ProductsHero'
import { Hardware } from '@/app/[locale]/(pages)/products/pos/Hardware'
import { locales, type Locale } from '@/lib/locales'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.pos.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function POSPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.pos' })

  const highlights = [
    { key: 'sync', icon: FaSyncAlt },
    { key: 'analytics', icon: FaChartLine },
    { key: 'invoice', icon: FaFileInvoiceDollar },
    { key: 'marketing', icon: FaBullhorn }
  ].map(({ key, icon }) => ({
    icon,
    title: t(`highlights.${key}.title`),
    subtitle: t(`highlights.${key}.subtitle`)
  }))

  return (
    <div className="container mx-auto py-16">
      <div>
        <ProductsHero
          pillLabel={t('hero.pillLabel')}
          title={t('hero.title')}
          description={t('hero.description')}
          primaryButton={{
            label: t('hero.primaryButton.label'),
            href: '/contact'
          }}
          secondaryButton={{
            label: t('hero.secondaryButton.label'),
            href: '/products'
          }}
          imageBackgroundColor="#d8af33"
        >
          <Image
            src="/images/products/pos/hero.png"
            alt={t('hero.imageAlt')}
            width={480}
            height={480}
            priority
            className="h-auto w-[40rem] md:w-[50rem] lg:w-[60rem] object-contain"
          />
        </ProductsHero>

        <FeatureHighlights highlights={highlights} />

        <Hardware locale={params.locale} />
      </div>
    </div>
  )
}
