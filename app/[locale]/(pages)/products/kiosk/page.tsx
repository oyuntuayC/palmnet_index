import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaArrowRight, FaChartLine, FaCheck, FaClock, FaMousePointer, FaSyncAlt, FaUsers } from 'react-icons/fa'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'
import { KioskFlowScroller } from './KioskFlowScroller'

type IconType = typeof FaClock

const benefitKeys = ['wait', 'revenue', 'staff', 'accuracy', 'sync', 'easy'] as const
const benefitIcons: Record<(typeof benefitKeys)[number], IconType> = {
  wait: FaClock,
  revenue: FaChartLine,
  staff: FaUsers,
  accuracy: FaCheck,
  sync: FaSyncAlt,
  easy: FaMousePointer
}

const flowCards = ['language', 'category', 'product', 'offer', 'member', 'payment'] as const

const terminalCards = [
  { key: 'k01', image: '/images/products/kiosk/terminal-k01.png', width: 1242, height: 1442 },
  { key: 'mk01', image: '/images/products/kiosk/terminal-mk01.png', width: 1242, height: 1364 }
] as const

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

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <IntroSection t={t} />
      <BenefitsSection t={t} />
      <FlowSection t={t} />
      <TerminalsSection t={t} />
      <ConsultCtaSection t={t} />
      <BrandSection t={t} />
      <FooterLeadSection t={t} />
    </main>
  )
}

function HeroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(240,248,255,1)_0%,rgba(255,255,255,1)_90%)]">
      <div className="layout-page grid items-center gap-[var(--space-xxl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-[var(--space-section)]">
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
        <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center">
          <Image
            src="/images/products/kiosk/hero-banner.png"
            alt={t('hero.imageAlt')}
            width={1725}
            height={2705}
            priority
            className="h-auto max-h-[560px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)]"
          />
        </div>
      </div>
    </section>
  )
}

function IntroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page layout-page-narrow text-center">
        <h2 className="type-display-md text-black">{t('intro.title')}</h2>
        <div className="type-body mx-auto stack-title-body max-w-5xl text-black">
          <p>{t('intro.line1')}</p>
          <p>{t('intro.line2')}</p>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-[#f8fafc]">
      <div className="layout-page">
        <div className="grid gap-x-[var(--space-xl)] gap-y-[var(--space-xxl)] md:grid-cols-2 xl:grid-cols-3">
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key]
            return (
              <article key={key} className="min-h-[180px] px-[var(--space-xs)] py-[var(--space-md)]">
                <Icon className="mb-[var(--space-lg)] text-2xl text-[#007cff]" aria-hidden="true" />
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
    items: [0, 1, 2].map((index) => t(`flow.cards.${key}.items.${index}`))
  }))

  return (
    <KioskFlowScroller
      title={t('flow.title')}
      description={t('flow.description')}
      imageAlt={t('flow.imageAlt')}
      learnMore={t('flow.learnMore')}
      items={items}
    />
  )
}

function TerminalsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page layout-page-narrow">
        <div className="text-center">
          <h2 className="type-display-md text-[#0d0d0d]">{t('terminals.title')}</h2>
          <p className="type-body mx-auto stack-title-body max-w-4xl text-black">
            {t('terminals.subtitleLine1')}
            <br />
            {t('terminals.subtitleLine2')}
          </p>
        </div>
        <div className="mx-auto stack-body-action grid max-w-[1260px] gap-[var(--space-xl)] md:grid-cols-2">
          {terminalCards.map((terminal) => (
            <article key={terminal.key} className="overflow-hidden rounded-[var(--rounded-sm)] border border-[#e0e0e0] bg-white">
              <div className="flex min-h-[420px] items-center justify-center overflow-hidden bg-[#f4f4f4] px-[var(--space-lg)] py-[var(--space-xl)] md:min-h-[520px]">
                <Image
                  src={terminal.image}
                  alt={t(`terminals.${terminal.key}.alt`)}
                  width={terminal.width}
                  height={terminal.height}
                  className="h-auto w-full max-w-[390px] object-contain"
                />
              </div>
              <div className="p-[var(--space-lg)] text-left md:p-[var(--space-xl)]">
                <h3 className="type-terminal-card-title text-black">{t(`terminals.${terminal.key}.title`)}</h3>
                <p className="type-caption mt-4 text-[#4a5565]">{t(`terminals.${terminal.key}.description`)}</p>
                <div className="mt-6 flex items-center justify-between gap-[var(--space-lg)]">
                  <Link href="/contact" className="type-body inline-flex items-center gap-3 text-[#007cff]">
                    {t('terminals.learnMore')}
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="type-caption-strong inline-flex h-10 items-center justify-center rounded bg-black px-7 text-white hover:bg-[#222]"
                  >
                    {t('terminals.quote')}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
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
