import type { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { getTranslations } from 'next-intl/server'
import { FaSyncAlt, FaMobileAlt, FaListAlt, FaCreditCard } from 'react-icons/fa'

import { ProductsHero } from '@/components/products/ProductsHero'
import { FeatureHighlights } from '@/components/products/FeatureHighlights'
import { HardwareSection1 } from '@/components/products/HardwareSection1'
import { HardwareSection2 } from '@/components/products/HardwareSection2'
import { HardwareSection3 } from '@/components/products/HardwareSection3'
import { locales, type Locale } from '@/lib/locales'

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.online.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function OnlinePage({ params }: { params: { locale: Locale } }): Promise<React.JSX.Element> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.online' })

  const highlights = [
    { key: 'sync', icon: FaSyncAlt },
    { key: 'devices', icon: FaMobileAlt },
    { key: 'menu', icon: FaListAlt },
    { key: 'payments', icon: FaCreditCard }
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
          imageBackgroundColor="#0f172a"
        >
          <Image
            src="/images/products/online/hero.png"
            alt={t('hero.imageAlt')}
            width={1180}
            height={640}
            className="h-auto w-[20rem] md:w-[30rem] lg:w-[40rem] object-contain"
            priority
          />
        </ProductsHero>

        <FeatureHighlights highlights={highlights} />

        <HardwareSection1
          pillLabel={t('hardware.pillLabel')}
          title={t('hardware.title')}
          subtitle={t('hardware.subtitle')}
          description={t('hardware.description')}
          buttonLabel={t('hardware.buttonLabel')}
          imageAlt={t('hardware.imageAlt')}
        />

        <HardwareSection2
          pillLabel={t('hardwareSecondary.pillLabel')}
          title={t('hardwareSecondary.title')}
          subtitle={t('hardwareSecondary.subtitle')}
          description={t('hardwareSecondary.description')}
          buttonLabel={t('hardwareSecondary.buttonLabel')}
          imageAlt={t('hardwareSecondary.imageAlt')}
        />

        <HardwareSection3
          pillLabel={t('hardwareTertiary.pillLabel')}
          title={t('hardwareTertiary.title')}
          subtitle={t('hardwareTertiary.subtitle')}
          description={t('hardwareTertiary.description')}
          buttonLabel={t('hardwareTertiary.buttonLabel')}
          imageAlt={t('hardwareTertiary.imageAlt')}
        />
      </div>
    </div>
  )
}
