import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import {
  SolutionChallengesSection,
  SolutionConsultCtaSection,
  SolutionFooterLeadSection,
  SolutionGrowthSection,
  SolutionIntroSection,
  SolutionProductsSection
} from '@/components/solutions/SolutionSections'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

const challengeKeys = ['queue', 'combo', 'kitchen', 'membership'] as const
const tabKeys = ['ordering', 'cashier', 'kitchen', 'pickup', 'member'] as const
const productKeys = ['kiosk', 'kds', 'ads', 'marketing'] as const

const tabImages: Record<(typeof tabKeys)[number], string> = {
  ordering: '/images/solutions/fast-food/ordering.jpg',
  cashier: '/images/solutions/fast-food/cashier.jpg',
  kitchen: '/images/solutions/fast-food/kitchen.jpg',
  pickup: '/images/solutions/fast-food/pickup.jpg',
  member: '/images/solutions/fast-food/member.jpg'
}

const productImages: Record<(typeof productKeys)[number], { src: string; href: string }> = {
  kiosk: { src: '/images/solutions/fast-food/product-kiosk.png', href: '/products/kiosk' },
  kds: { src: '/images/solutions/fast-food/product-kds.png', href: '/products/kitchen' },
  ads: { src: '/images/solutions/fast-food/product-ads.png', href: '/products/smartCash' },
  marketing: { src: '/images/solutions/fast-food/product-marketing.png', href: '/products/pad' }
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutionsFastFoodPage.meta' })
  return { title: t('title'), description: t('description') }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function FastFoodSolutionPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'solutionsFastFoodPage' })
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
      <SolutionIntroSection t={t} />
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
      <Image src="/images/solutions/fast-food/hero.jpg" alt={t('hero.imageAlt')} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      <div className="layout-page relative max-w-2xl text-white">
        <h1 className="type-hero-display">
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2')}
        </h1>
        <p className="type-body stack-title-body max-w-[520px] text-white/95">{t('hero.description')}</p>
        <Link href="/contact" className="type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#007cff] px-[22px] py-[11px] text-white">
          {t('hero.button')}
        </Link>
      </div>
    </section>
  )
}
