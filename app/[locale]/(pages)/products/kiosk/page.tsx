import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaUsers, FaQrcode, FaClock, FaShieldAlt } from 'react-icons/fa'

import { ProductsHero } from '@/components/products/ProductsHero'
import { FeatureHighlights } from '@/components/products/FeatureHighlights'
import { FeatureCards } from './FeatureCards'
import { Hardware } from './Hardware'
import { Hardware2 } from './Hardware2'
import { locales, type Locale } from '@/lib/locales'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.kiosk.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function KioskPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.kiosk' })

  const highlights = [
    { key: 'qr', icon: FaQrcode },
    { key: 'multilingual', icon: FaUsers },
    { key: 'waitTimes', icon: FaClock },
    { key: 'compliance', icon: FaShieldAlt }
  ].map(({ key, icon }) => ({
    icon,
    title: t(`highlights.${key}.title`),
    subtitle: t(`highlights.${key}.subtitle`)
  }))

  const featureCards = [
    { key: 'smartOrdering', imageSrc: '/images/products/kiosk/feature-1.png' },
    { key: 'paymentOptions', imageSrc: '/images/products/kiosk/feature-2.png' },
    { key: 'realTimeOrders', imageSrc: '/images/products/kiosk/feature-3.png' }
  ].map(({ key, imageSrc }) => ({
    title: t(`featureCards.${key}.title`),
    description: t(`featureCards.${key}.description`),
    imageSrc,
    imageAlt: t(`featureCards.${key}.imageAlt`)
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
          imageBackgroundColor="#2563EB"
        >
          <Image
            src="/images/products/kiosk/hero.png"
            alt={t('hero.imageAlt')}
            width={480}
            height={480}
            priority
            className="relative translate-y-24 h-auto w-[22rem] md:w-[30rem] lg:w-[30rem] object-contain"
          />
        </ProductsHero>

        <FeatureHighlights highlights={highlights} />

        <FeatureCards cards={featureCards} />

        <Hardware locale={params.locale} />

        <Hardware2 locale={params.locale} />
      </div>
    </div>
  )
}
