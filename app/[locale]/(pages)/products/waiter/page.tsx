import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import { FaPenFancy, FaSyncAlt, FaSearch, FaCheckCircle } from 'react-icons/fa'

import { ProductsHero } from '@/components/products/ProductsHero'
import { FeatureHighlights } from '@/components/products/FeatureHighlights'
import { FeatureBento } from '@/components/products/FeatureBento'
import { locales, type Locale } from '@/lib/locales'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.waiter.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function WaiterPage({ params }: { params: { locale: Locale } }): Promise<React.JSX.Element> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.waiter' })

  const highlights = [
    { key: 'tableside', icon: FaPenFancy },
    { key: 'sync', icon: FaSyncAlt },
    { key: 'search', icon: FaSearch },
    { key: 'accuracy', icon: FaCheckCircle }
  ].map(({ key, icon }) => ({
    icon,
    title: t(`highlights.${key}.title`),
    subtitle: t(`highlights.${key}.subtitle`)
  }))

  const features = [
    {
      title: t('features.multiScreen.title'),
      description: t('features.multiScreen.description'),
      backgroundImage: '/images/products/waiter/feature-1-bg.png',
      deviceImage: '/images/products/waiter/feature-1-device.png',
      backgroundOverlay: 'light'
    },
    {
      title: t('features.orientation.title'),
      description: t('features.orientation.description'),
      backgroundImage: '/images/products/waiter/feature-2-bg.png',
      deviceImage: '/images/products/waiter/feature-2-device.png',
      backgroundOverlay: 'dark'
    },
    {
      title: t('features.simple.title'),
      description: t('features.simple.description'),
      backgroundImage: '/images/products/waiter/feature-1-bg.png',
      deviceImage: '/images/products/waiter/feature-3-device.png',
      backgroundOverlay: 'gradient'
    }
  ]

  return (
    <div className="container mx-auto py-16">
      <div className="space-y-16">
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
            src="/images/products/waiter/hero.png"
            alt={t('hero.imageAlt')}
            width={480}
            height={480}
            priority
            className="h-auto w-[40rem] md:w-[50rem] lg:w-[60rem] object-contain"
          />
        </ProductsHero>
      </div>

      <FeatureHighlights highlights={highlights} />

      <FeatureBento features={features} />
    </div>
  )
}
