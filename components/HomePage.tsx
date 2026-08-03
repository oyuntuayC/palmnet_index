"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/navigation'
import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { SectionHeader } from '@/components/typography/SectionHeader'

type SceneCard = {
  key: 'restaurant' | 'fastFood' | 'teaCafe' | 'buffetSushi'
  image: string
  href: string
}

const productCards = [
  { key: 'pos', href: '/products/pos', image: '/images/home/product-pos.png', imageClassName: 'h-56 w-auto' },
  { key: 'ads', href: '/products/smartCash', image: '/images/home/product-ads.png', imageClassName: 'h-52 w-auto' },
  { key: 'kds', href: '/products/kitchen', image: '/images/home/product-kds.png', imageClassName: 'h-52 w-auto' },
  { key: 'ordering', href: '/products/online', image: '/images/home/product-ordering.png', imageClassName: 'h-56 w-auto' }
] as const

const sceneCards: readonly SceneCard[] = [
  { key: 'restaurant', image: '/images/home/scene-restaurant.jpg', href: '/products/pos' },
  { key: 'fastFood', image: '/images/home/scene-fast-food.jpg', href: '/products/kiosk' },
  { key: 'teaCafe', image: '/images/home/scene-tea-cafe.jpg', href: '/products/online' },
  { key: 'buffetSushi', image: '/images/home/scene-buffet-sushi.jpg', href: '/products/waiter' }
]

const faqColumns = [
  ['storeTypes', 'singleStore', 'chainBrands', 'multiLanguage', 'taxCompliance'],
  ['deliveryPlatforms', 'installationTraining', 'pricing', 'customization', 'gettingStarted']
] as const

export default function HomePage(): React.ReactElement {
  return (
    <main id="wrap" className="bg-white text-[#0a0a0a]">
      <HeroSection />
      <ProductSolutionsSection />
      <RestaurantScenesSection />
      <PricingCtaSection />
      <FaqSection />
      <BrandWallSection />
      <FooterLeadSection />
      <BackToTop />
    </main>
  )
}

function HeroSection(): React.ReactElement {
  const t = useTranslations('homeLanding.hero')

  return (
    <section className="section-space bg-white">
      <div className="layout-page grid min-h-[560px] items-center gap-[var(--space-xxl)] md:grid-cols-[0.9fr_1.1fr] md:gap-[var(--space-section)]">
        <div className="max-w-2xl">
          <h1 className="motion-reveal type-hero-display text-black">
            {t('titleLine1')}
            <br />
            {t('titleLine2')}
          </h1>
          <div className="motion-reveal stack-body-action flex flex-col gap-[var(--space-sm)] sm:flex-row sm:gap-[var(--space-md)]" style={{ animationDelay: '80ms' }}>
            <Link
              href="/contact"
              className="motion-press type-body inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-[22px] py-[11px] text-white hover:bg-[#222]"
            >
              {t('primaryCta')}
            </Link>
            <Link
              href="/contact"
              className="motion-press type-body inline-flex min-h-[44px] items-center justify-center rounded-full border border-black px-[22px] py-[11px] text-black hover:bg-black hover:text-white"
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>
        <div className="motion-reveal overflow-hidden rounded-[var(--rounded-lg)] bg-[#f6f1ec] shadow-sm" style={{ animationDelay: '140ms' }}>
          <img
            src="/images/home/hero.jpg"
            alt={t('imageAlt')}
            className="h-full min-h-[320px] w-full object-cover md:min-h-[520px]"
          />
        </div>
      </div>
    </section>
  )
}

function ProductSolutionsSection(): React.ReactElement {
  const t = useTranslations('homeLanding')
  const tr = (key: string) => t(key as any)

  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <SectionHeader title={t('solutions.title')} subtitle={t('solutions.subtitle')} />
        <div className="product-solutions-grid">
          {productCards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="product-solution-card motion-card group flex min-h-[520px] min-w-0 flex-col justify-between overflow-hidden rounded-[var(--rounded-lg)] bg-gradient-to-b from-black via-[#333] to-black p-[var(--space-lg)] text-white"
            >
              <div className="product-solution-copy">
                <h3 className="type-tagline text-white">{tr(`products.${card.key}.title`)}</h3>
                <p className="type-body stack-title-body max-w-[18rem] text-white/80">{tr(`products.${card.key}.description`)}</p>
              </div>
              <div className="flex flex-1 items-center justify-center py-[var(--space-xl)]">
                <img
                  src={card.image}
                  alt={tr(`products.${card.key}.alt`)}
                  className={`motion-card-image ${card.imageClassName} object-contain`}
                />
              </div>
              <span className="type-caption flex items-center justify-end gap-[var(--space-xs)] text-neutral-400">
                {t('products.learnMore')}
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function RestaurantScenesSection(): React.ReactElement {
  const t = useTranslations('homeLanding')
  const tr = (key: string) => t(key as any)

  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <SectionHeader title={t('scenes.title')} subtitle={t('scenes.subtitle')} />
        <div className="grid gap-[var(--space-xl)] lg:grid-cols-2">
          {sceneCards.map((card) => (
            <Link key={card.key} href={card.href} className="scene-card group relative min-h-[360px] overflow-hidden rounded-[var(--rounded-sm)] bg-black md:min-h-[440px]">
              <img
                src={card.image}
                alt={tr(`scenes.${card.key}.alt`)}
                className="scene-card-image absolute inset-0 h-full w-full object-cover"
              />
              <div className="scene-card-vignette" aria-hidden="true" />
              <div className="scene-card-light" aria-hidden="true" />
              <div className="scene-card-content relative flex h-full min-h-[360px] flex-col justify-between p-[var(--space-xl)] text-white md:min-h-[440px] md:p-[var(--space-xxl)]">
                <h3 className="scene-card-title type-display-md text-white">{tr(`scenes.${card.key}.title`)}</h3>
                <div className="scene-card-footer flex items-end justify-between gap-[var(--space-lg)]">
                  <p className="scene-card-description type-body max-w-2xl text-white/90">
                    {tr(`scenes.${card.key}.description`)}
                  </p>
                  <span className="scene-card-cue" aria-hidden="true">
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCtaSection(): React.ReactElement {
  const t = useTranslations('homeLanding.pricingCta')

  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="relative overflow-hidden rounded-[var(--rounded-sm)] bg-black px-[var(--space-lg)] py-[var(--space-section)] text-center text-white md:px-[var(--space-xxl)]">
          <img src="/images/home/cta-bg.jpg" alt={t('alt')} className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="type-display-md">{t('title')}</h2>
            <p className="type-body stack-title-body text-white/85">{t('subtitle')}</p>
            <Link href="/contact" className="motion-press type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-[22px] py-[11px] text-white hover:bg-white hover:text-black">
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BrandWallSection(): React.ReactElement {
  const t = useTranslations('homeLanding.brands')

  return <MerchantLogoMarquee title={t('title')} />
}

function FaqSection(): React.ReactElement {
  const t = useTranslations('homeLanding.faq')
  const tr = (key: string) => t(key as any)

  return (
    <section className="section-space bg-[#fafafa]">
      <div className="layout-page layout-page-narrow grid gap-[var(--space-xxl)] md:grid-cols-[180px_1fr] md:items-start">
        <h2 className="type-lead-airy text-black">{t('title')}</h2>
        <div className="grid gap-x-[var(--space-xxl)] gap-y-0 lg:grid-cols-2">
          {faqColumns.map((column, index) => (
            <div key={index}>
              {column.map((key) => (
                key === 'gettingStarted' ? (
                  <Link
                    key={key}
                    href="/contact"
                    className="motion-press type-body list-row-y flex w-full items-center justify-between border-b border-[#e4e4e4] text-left text-[#67787c] hover:text-black"
                  >
                    <span>{tr(key)}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <div
                    key={key}
                    className="type-body list-row-y flex w-full items-center justify-between border-b border-[#e4e4e4] text-left text-[#67787c]"
                  >
                    <span>{tr(key)}</span>
                  </div>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FooterLeadSection(): React.ReactElement {
  const t = useTranslations('homeLanding.footerLead')

  return (
    <section className="section-space bg-[#222] text-center text-white">
      <div className="layout-page">
        <h2 className="type-display-md mx-auto max-w-4xl">
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h2>
        <Link
          href="/contact"
          className="motion-press type-button-large stack-title-action inline-flex min-h-[44px] min-w-[220px] items-center justify-center rounded-full bg-white px-7 py-[14px] text-black hover:bg-neutral-100 md:min-w-[240px]"
        >
          {t('button')}
        </Link>
      </div>
    </section>
  )
}

function BackToTop(): React.ReactElement | null {
  const [show, setShow] = React.useState(false)
  React.useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return show ? (
    <a href="#wrap" className="go-up" aria-label="Back to top">↑</a>
  ) : null
}
