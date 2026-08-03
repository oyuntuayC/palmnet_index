import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import {
  SolutionChallengesSection,
  SolutionConsultCtaSection,
  SolutionFooterLeadSection,
  SolutionGrowthSection,
  SolutionProductsSection
} from '@/components/solutions/SolutionSections'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

const challengeKeys = ['queue', 'complexity', 'mistakes', 'retention'] as const
const tabKeys = ['ordering', 'cashier', 'making', 'pickup', 'retention'] as const
const productKeys = ['pos', 'kiosk', 'ads', 'marketing'] as const

const tabImages: Record<(typeof tabKeys)[number], string> = {
  ordering: '/images/solutions/tea-cafe/ordering.jpg',
  cashier: '/images/solutions/tea-cafe/cashier.jpg',
  making: '/images/solutions/tea-cafe/kitchen.jpg',
  pickup: '/images/solutions/tea-cafe/pickup.jpg',
  retention: '/images/solutions/tea-cafe/retention.jpg'
}

const productImages: Record<(typeof productKeys)[number], { src: string; href: string }> = {
  pos: { src: '/images/solutions/tea-cafe/product-pos.png', href: '/products/pos' },
  kiosk: { src: '/images/solutions/tea-cafe/product-kiosk.png', href: '/products/kiosk' },
  ads: { src: '/images/solutions/tea-cafe/product-ads.png', href: '/products/smartCash' },
  marketing: { src: '/images/solutions/tea-cafe/product-marketing.png', href: '/products/pad' }
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutionsPage.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function SolutionsPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutionsPage' })

  const tabs = tabKeys.map((key) => ({
    key,
    label: t(`tabs.${key}.label`),
    title: t(`tabs.${key}.title`),
    description: t(`tabs.${key}.description`),
    items: [0, 1, 2].map((index) => t(`tabs.${key}.items.${index}`)),
    image: tabImages[key],
    imageAlt: t(`tabs.${key}.imageAlt`)
  }))

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <SolutionChallengesSection t={t} challengeKeys={challengeKeys} />
      <SolutionGrowthSection t={t} tabs={tabs} />
      <SolutionProductsSection t={t} productKeys={productKeys} productImages={productImages} />
      <SolutionConsultCtaSection t={t} />
      <SolutionFooterLeadSection t={t} />
    </main>
  )
}

function HeroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden">
      <Image src="/images/solutions/tea-cafe/hero.jpg" alt={t('hero.imageAlt')} fill priority sizes="100vw" className="object-cover object-bottom" />
      <div className="absolute inset-0 bg-black/15 mix-blend-hard-light" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-white/5" />
      <div className="layout-page relative max-w-2xl text-white">
        <h1 className="type-hero-display text-white">
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2')}
        </h1>
        <p className="type-body stack-title-body max-w-lg text-white/95">
          {t('hero.descriptionLine1')}
          <br />
          {t('hero.descriptionLine2')}
          <br />
          {t('hero.descriptionLine3')}
        </p>
        <Link href="/contact" className="type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#007cff] px-[22px] py-[11px] text-white">
          {t('hero.button')}
        </Link>
      </div>
    </section>
  )
}
