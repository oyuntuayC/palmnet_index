import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaMedal, FaPercentage, FaStamp, FaUserCheck } from 'react-icons/fa'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'
import { MarketingFlowScroller } from './MarketingFlowScroller'

type IconType = typeof FaUserCheck

const benefitKeys = ['login', 'level', 'coupon', 'wallet'] as const
const benefitIcons: Record<(typeof benefitKeys)[number], IconType> = {
  login: FaUserCheck,
  level: FaMedal,
  coupon: FaPercentage,
  wallet: FaStamp
}

const flowCards = ['login', 'member', 'points', 'coupon', 'stamp', 'benefits'] as const
const phoneFrame = '/images/products/marketing/phone-frame.svg'
const flowScreens: Record<(typeof flowCards)[number], string> = {
  login: '/images/products/marketing/flow-screens/login.png',
  member: '/images/products/marketing/flow-screens/member.png',
  points: '/images/products/marketing/flow-screens/points.png',
  coupon: '/images/products/marketing/flow-screens/coupon.png',
  stamp: '/images/products/marketing/flow-screens/stamp.png',
  benefits: '/images/products/marketing/flow-screens/benefits.png'
}

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.marketing.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function PadPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.marketing' })

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <IntroSection t={t} />
      <BenefitsSection t={t} />
      <FlowSection t={t} />
      <ConsultCtaSection t={t} />
      <BrandSection t={t} />
      <FooterLeadSection t={t} />
    </main>
  )
}

function HeroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(240,248,255,1)_0%,rgba(255,255,255,1)_90%)]">
      <div className="layout-page grid min-h-[680px] items-center gap-[var(--space-xxl)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[var(--space-section)]">
        <div className="max-w-xl">
          <p className="type-caption-strong uppercase tracking-[0.23em] text-[#71717b]">{t('hero.eyebrow')}</p>
          <h1 className="type-hero-display stack-title-body text-black">{t('hero.title')}</h1>
          <p className="type-body stack-title-body text-black">{t('hero.description')}</p>
          <div className="stack-body-action flex flex-col gap-[var(--space-sm)] sm:flex-row sm:gap-[var(--space-md)]">
            <Link
              href="/contact"
              className="type-body inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full bg-black px-[22px] py-[11px] text-white hover:bg-[#222]"
            >
              {t('hero.primaryButton')}
            </Link>
            <Link
              href="/contact"
              className="type-body inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border border-black px-[22px] py-[11px] text-black hover:bg-black hover:text-white"
            >
              {t('hero.secondaryButton')}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-[760px] items-center justify-center">
          <Image
            src="/images/products/marketing/hero-phones.png"
            alt={t('hero.imageAlt')}
            width={1440}
            height={663}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,0.12)]"
          />
        </div>
      </div>
    </section>
  )
}

function IntroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <>
      <section className="section-space-tight bg-white">
        <div className="layout-page layout-page-narrow text-center">
          <h2 className="type-display-md text-black">{t('intro.title')}</h2>
          <p className="type-body mx-auto stack-title-body max-w-5xl text-black">{t('intro.description')}</p>
        </div>
      </section>
      <section className="bg-white pb-[var(--space-section)]">
        <div className="layout-page overflow-hidden rounded-[var(--rounded-sm)]">
          <Image
            src="/images/products/marketing/showcase.png"
            alt={t('intro.imageAlt')}
            width={1320}
            height={486}
            className="h-auto w-full object-cover"
          />
        </div>
      </section>
    </>
  )
}

function BenefitsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="grid gap-x-[var(--space-xl)] gap-y-[var(--space-xxl)] md:grid-cols-2 xl:grid-cols-4">
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key]
            return (
              <article key={key} className="min-h-[190px] px-[var(--space-xs)] py-[var(--space-md)] text-center">
                <Icon className="mx-auto mb-[var(--space-lg)] text-2xl text-[#007cff]" aria-hidden="true" />
                <h3 className="type-tagline text-black">{t(`benefits.${key}.title`)}</h3>
                <p className="type-body stack-title-body text-[#18181b]">{t(`benefits.${key}.description`)}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FlowSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  const items = flowCards.map((key) => ({
    key,
    tab: t(`flow.tabs.${key}`),
    title: t(`flow.cards.${key}.title`),
    items: [0, 1, 2].map((index) => t(`flow.cards.${key}.items.${index}`)),
    frame: phoneFrame,
    screen: flowScreens[key]
  }))

  return (
    <MarketingFlowScroller
      title={t('flow.title')}
      description={t('flow.description')}
      imageAlt={t('flow.imageAlt')}
      learnMore={t('flow.learnMore')}
      items={items}
    />
  )
}

function ConsultCtaSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="bg-[#f1f5f9] px-[var(--space-lg)] py-[var(--space-section)] md:px-[var(--space-xxl)] lg:px-[120px]">
          <h2 className="type-display-md max-w-lg text-black">{t('consultCta.title')}</h2>
          <p className="type-body stack-title-body max-w-3xl text-[#71717b]">{t('consultCta.description')}</p>
          <Link
            href="/contact"
            className="type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-[var(--rounded-sm)] bg-black px-[var(--space-xl)] text-white hover:bg-[#222]"
          >
            {t('consultCta.button')}
          </Link>
        </div>
      </div>
    </section>
  )
}

function BrandSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <MerchantLogoMarquee
      title={t('brands.title')}
      titleClassName="type-display-md text-center text-black"
    />
  )
}

function FooterLeadSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-[#222] text-center text-white">
      <div className="layout-page">
        <h2 className="type-display-md mx-auto max-w-4xl">
          {t('cta.titleLine1')}
          <br />
          {t('cta.titleLine2')}
        </h2>
        <Link
          href="/contact"
          className="type-button-large stack-title-action inline-flex min-h-[44px] min-w-[240px] items-center justify-center rounded-full bg-white px-7 py-[14px] text-black hover:bg-neutral-100"
        >
          {t('cta.button')}
        </Link>
      </div>
    </section>
  )
}
