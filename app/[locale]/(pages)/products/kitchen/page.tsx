import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaArrowRight, FaBolt, FaCheck, FaLeaf, FaListAlt, FaUsers } from 'react-icons/fa'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

type IconType = typeof FaListAlt

const benefitKeys = ['display', 'speed', 'collaboration', 'paperless'] as const
const benefitIcons: Record<(typeof benefitKeys)[number], IconType> = {
  display: FaListAlt,
  speed: FaBolt,
  collaboration: FaUsers,
  paperless: FaLeaf
}

const featureCards = [
  { key: 'sync', align: 'imageLeft', layered: true as const },
  { key: 'routing', image: '/images/products/kds/feature-routing.png', align: 'imageRight', layered: false as const },
  { key: 'status', image: '/images/products/kds/feature-status.png', align: 'imageLeft', layered: false as const },
  { key: 'priority', image: '/images/products/kds/feature-priority.png', align: 'imageRight', layered: false as const },
  { key: 'timing', image: '/images/products/kds/feature-timing.png', align: 'imageLeft', layered: false as const }
] as const

const terminalCards = [
  { key: 'x1', image: '/images/products/kds/terminal-x1.png' },
  { key: 'sSeries', image: '/images/products/kds/terminal-s-series.png' }
] as const

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.kds.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function KitchenPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.kds' })

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <BenefitsSection t={t} />
      <FeaturesIntroSection t={t} />
      <FeatureSection t={t} />
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
        <div className="relative mx-auto flex w-full max-w-[640px] items-center justify-center">
          <Image
            src="/images/products/kds/hero-banner.png"
            alt={t('hero.imageAlt')}
            width={1096}
            height={878}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

function BenefitsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="grid gap-[var(--space-lg)] md:grid-cols-2 xl:grid-cols-4">
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key]
            return (
              <article
                key={key}
                className="flex min-h-[240px] flex-col items-center justify-center rounded-[var(--rounded-sm)] border border-[#e0e0e0] px-[var(--space-lg)] py-[var(--space-xl)] text-center"
              >
                <Icon className="mb-[var(--space-lg)] text-3xl text-[#007cff]" aria-hidden="true" />
                <h2 className="type-tagline text-black">{t(`benefits.${key}.title`)}</h2>
                <div className="type-caption stack-title-body space-y-[var(--space-xs)] text-[#52525c]">
                  {[0, 1, 2].map((index) => (
                    <p key={index}>{t(`benefits.${key}.lines.${index}`)}</p>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeaturesIntroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page layout-page-narrow text-center">
        <h2 className="type-display-md text-black">{t('featuresTitle')}</h2>
        <p className="type-body mx-auto stack-title-body max-w-4xl text-black">{t('featuresSubtitle')}</p>
      </div>
    </section>
  )
}

function FeatureSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page layout-page-narrow">
        <div className="flex flex-col gap-[var(--space-section)]">
          {featureCards.map((feature) => (
            <FeatureRow key={feature.key} feature={feature} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureRow({
  feature,
  t
}: {
  feature: (typeof featureCards)[number]
  t: Awaited<ReturnType<typeof getTranslations>>
}): React.ReactElement {
  const image = feature.layered ? (
    <SyncFeatureVisual alt={t('featureCards.sync.alt')} />
  ) : (
    <div className="relative min-h-[320px] overflow-hidden rounded-[var(--rounded-sm)] md:min-h-[400px]">
      <Image
        src={feature.image}
        alt={t(`featureCards.${feature.key}.alt`)}
        width={1360}
        height={800}
        className="h-full min-h-[320px] w-full object-cover md:min-h-[400px]"
      />
    </div>
  )
  const copy = (
    <div className="flex flex-col justify-center px-0 py-[var(--space-md)] md:px-[var(--space-md)] lg:px-[var(--space-xl)]">
      <h3 className="type-display-md text-black">{t(`featureCards.${feature.key}.title`)}</h3>
      <p className="type-body stack-title-body max-w-md text-[#666]">{t(`featureCards.${feature.key}.description`)}</p>
      <ul className="stack-body-action space-y-[var(--space-md)]">
        {[0, 1, 2].map((index) => (
          <li key={index} className="type-body flex items-center gap-[var(--space-sm)] text-black">
            <FaCheck className="shrink-0 text-sm text-[#007cff]" aria-hidden="true" />
            {t(`featureCards.${feature.key}.items.${index}`)}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="grid items-center gap-[var(--space-xl)] lg:grid-cols-2 lg:gap-[var(--space-xxl)]">
      {feature.align === 'imageLeft' ? (
        <>
          {image}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {image}
        </>
      )}
    </div>
  )
}

function SyncFeatureVisual({ alt }: { alt: string }): React.ReactElement {
  return (
    <div className="relative flex min-h-[320px] items-end justify-end overflow-hidden rounded-[var(--rounded-sm)] bg-[#eff6ff] md:min-h-[400px]">
      <Image
        src="/images/products/kds/feature-sync-bg.png"
        alt=""
        aria-hidden
        width={1339}
        height={844}
        className="pointer-events-none absolute max-w-none object-cover"
        style={{ height: '110%', width: '94%', left: '-34%', top: '-6%' }}
      />
      <div className="relative z-10 w-[74%] max-w-[506px] pr-2 pb-2 md:pr-4 md:pb-4">
        <Image
          src="/images/products/kds/feature-sync-device.png"
          alt={alt}
          width={1537}
          height={1025}
          className="h-auto w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.1)]"
        />
      </div>
    </div>
  )
}

function TerminalsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page layout-page-narrow">
        <div className="text-center">
          <h2 className="type-display-md text-[#0d0d0d]">{t('terminals.title')}</h2>
          <p className="type-body mx-auto stack-title-body max-w-4xl text-black">{t('terminals.subtitle')}</p>
        </div>
        <div className="mx-auto stack-body-action grid max-w-[960px] gap-[var(--space-xl)] md:grid-cols-2">
          {terminalCards.map((terminal) => (
            <article key={terminal.key} className="overflow-hidden rounded-[var(--rounded-sm)] border border-[#e0e0e0] bg-white">
              <div className="flex min-h-[240px] items-center justify-center overflow-hidden bg-[#f4f4f4] px-[var(--space-md)] py-[var(--space-lg)]">
                <Image
                  src={terminal.image}
                  alt={t(`terminals.${terminal.key}.alt`)}
                  width={terminal.key === 'x1' ? 1214 : 1403}
                  height={terminal.key === 'x1' ? 1000 : 1123}
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
