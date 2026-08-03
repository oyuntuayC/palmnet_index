import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaArrowRight, FaCheck, FaCloudUploadAlt, FaDesktop, FaExchangeAlt } from 'react-icons/fa'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

type IconType = typeof FaCloudUploadAlt

const highlightKeys = ['publish', 'devices', 'modes'] as const
const highlightIcons: Record<(typeof highlightKeys)[number], IconType> = {
  publish: FaCloudUploadAlt,
  devices: FaDesktop,
  modes: FaExchangeAlt
}

const featureColumnKeys = ['upload', 'sync', 'displayModes', 'queue'] as const

const terminalCards = [
  { key: 'a132', image: '/images/products/ads/terminal-a132.png', width: 2338, height: 2128 },
  { key: 'a123', image: '/images/products/ads/terminal-a123.png', width: 1204, height: 1017 }
] as const

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.ads.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function SmartCashPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.ads' })

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <HighlightsSection t={t} />
      <ContentIntroSection t={t} />
      <ShowcaseSection t={t} />
      <FeatureColumnsSection t={t} />
      <ConsultCtaSection t={t} />
      <TerminalsSection t={t} />
      <BrandSection t={t} />
      <FooterLeadSection t={t} />
    </main>
  )
}

function HeroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(240,248,255,1)_0%,rgba(255,255,255,1)_90%)]">
      <div className="layout-page grid items-center gap-[var(--space-xxl)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-[var(--space-section)]">
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
        <div className="relative mx-auto flex w-full max-w-[720px] items-center justify-center">
          <Image
            src="/images/products/ads/hero-banner.png"
            alt={t('hero.imageAlt')}
            width={2442}
            height={1628}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

function HighlightsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="grid gap-[var(--space-lg)] md:grid-cols-3">
          {highlightKeys.map((key) => {
            const Icon = highlightIcons[key]
            return (
              <article
                key={key}
                className="flex min-h-[240px] flex-col items-center justify-center rounded-[var(--rounded-sm)] border border-[#e0e0e0] px-[var(--space-lg)] py-[var(--space-xl)] text-center"
              >
                <Icon className="mb-[var(--space-lg)] text-3xl text-[#007cff]" aria-hidden="true" />
                <h2 className="type-tagline text-black">{t(`highlights.${key}.title`)}</h2>
                <p className="type-caption stack-title-body text-[#52525c]">{t(`highlights.${key}.description`)}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContentIntroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page grid items-start gap-[var(--space-xl)] lg:grid-cols-2 lg:gap-[var(--space-section)]">
        <h2 className="type-display-md text-black">{t('contentIntro.title')}</h2>
        <p className="type-body text-black">{t('contentIntro.description')}</p>
      </div>
    </section>
  )
}

function ShowcaseSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="bg-white pb-[var(--space-section)]">
      <div className="layout-page overflow-hidden rounded-[var(--rounded-sm)]">
        <Image
          src="/images/products/ads/showcase.png"
          alt={t('showcaseAlt')}
          width={2640}
          height={972}
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  )
}

function FeatureColumnsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <div className="grid gap-[var(--space-lg)] md:grid-cols-2 xl:grid-cols-4">
          {featureColumnKeys.map((key) => (
            <article key={key} className="rounded-[var(--rounded-sm)] border border-[#e0e0e0] px-[var(--space-lg)] py-[var(--space-xl)]">
              <h3 className="type-tagline text-black">{t(`featureColumns.${key}.title`)}</h3>
              <ul className="stack-body-action space-y-[var(--space-md)]">
                {[0, 1, 2].map((index) => (
                  <li key={index} className="type-body flex items-start gap-[var(--space-sm)] text-black">
                    <FaCheck className="mt-1 shrink-0 text-sm text-[#007cff]" aria-hidden="true" />
                    {t(`featureColumns.${key}.items.${index}`)}
                  </li>
                ))}
              </ul>
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
        <div className="mx-auto stack-body-action grid max-w-[960px] gap-[var(--space-xl)] md:grid-cols-2">
          {terminalCards.map((terminal) => (
            <article key={terminal.key} className="overflow-hidden rounded-[var(--rounded-sm)] border border-[#e0e0e0] bg-white">
              <div className="flex min-h-[240px] items-center justify-center overflow-hidden bg-[#f4f4f4] px-[var(--space-md)] py-[var(--space-lg)]">
                <Image
                  src={terminal.image}
                  alt={t(`terminals.${terminal.key}.alt`)}
                  width={terminal.width}
                  height={terminal.height}
                  className="h-auto w-full max-w-[420px] object-contain"
                />
              </div>
              <div className="p-[var(--space-lg)] text-left">
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
