import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { FaArrowRight, FaChartLine, FaCheck, FaClock, FaCreditCard, FaReceipt, FaSyncAlt, FaUsers } from 'react-icons/fa'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

type IconType = typeof FaClock

const benefitKeys = ['wait', 'staff', 'revenue', 'sync'] as const
const benefitIcons: Record<(typeof benefitKeys)[number], IconType> = {
  wait: FaClock,
  staff: FaUsers,
  revenue: FaChartLine,
  sync: FaSyncAlt
}

const featureCards = [
  { key: 'checkout', image: '/images/products/pos/feature-ordering.png', align: 'imageLeft' },
  { key: 'tables', image: '/images/products/pos/feature-tables.png', align: 'imageRight' },
  { key: 'members', image: '/images/products/pos/feature-members.png', align: 'imageLeft' },
  { key: 'inventory', image: '/images/products/pos/feature-inventory.png', align: 'imageRight' },
  { key: 'reports', image: '/images/products/pos/feature-reports.png', align: 'imageLeft' }
] as const

const checkoutOrderCards = [
  { id: '093', name: 'Emilo', price: '€19.80', badge: false },
  { id: '094', name: 'Emilo', price: '€19.80', badge: false },
  { id: '221', name: 'Emilo', price: '€19.80', badge: true }
] as const

const solutionCards = ['tax', 'payment'] as const
const solutionIcons: Record<(typeof solutionCards)[number], IconType> = {
  tax: FaReceipt,
  payment: FaCreditCard
}

const terminalCards = [
  { key: 'd3', image: '/images/products/pos/terminal-d3.png' },
  { key: 'mpos', image: '/images/products/pos/terminal-mpos.png' }
] as const

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.pos.meta' })

  return {
    title: t('title'),
    description: t('description')
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function POSPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'products.pos' })

  return (
    <main className="bg-white text-[#0a0a0a]">
      <HeroSection t={t} />
      <BenefitsSection t={t} />
      <FeatureSection t={t} />
      <TerminalsSection t={t} />
      <ToolkitSection t={t} />
      <BrandSection t={t} />
      <FooterLeadSection t={t} />
    </main>
  )
}

function HeroSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page text-center">
        <h1 className="type-hero-display mx-auto max-w-4xl text-black">
          {t('newHero.titleLine1')}
          <br />
          {t('newHero.titleLine2')}
        </h1>
        <p className="type-body mx-auto stack-title-body max-w-4xl text-black">{t('newHero.description')}</p>
        <div className="stack-body-action flex flex-col items-center justify-center gap-[var(--space-sm)] sm:flex-row sm:gap-[var(--space-md)]">
          <Link
            href="/contact"
            className="type-body inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full bg-[#007cff] px-[22px] py-[11px] text-white hover:bg-[#006ee3]"
          >
            {t('newHero.primaryButton')}
          </Link>
          <Link
            href="/contact"
            className="type-body inline-flex min-h-[44px] min-w-[200px] items-center justify-center rounded-full border border-[#007cff] px-[22px] py-[11px] text-[#007cff] hover:bg-[#f0f7ff]"
          >
            {t('newHero.secondaryButton')}
          </Link>
        </div>
        <div className="relative mx-auto stack-body-action max-w-[920px] overflow-hidden rounded-[var(--rounded-sm)] bg-white">
          <Image
            src="/images/products/pos/hero-banner.png"
            alt={t('newHero.imageAlt')}
            width={1320}
            height={720}
            priority
            className="mx-auto h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

function BenefitsSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space-tight bg-[#fbfaf9]">
      <div className="layout-page">
        <div className="grid gap-[var(--space-xl)] md:grid-cols-2 xl:grid-cols-4">
          {benefitKeys.map((key) => {
            const Icon = benefitIcons[key]
            return (
              <article key={key} className="rounded-[var(--rounded-sm)] bg-[#fbfaf9] px-[var(--space-xs)] py-[var(--space-xl)]">
                <Icon className="mb-[var(--space-lg)] text-2xl text-black" aria-hidden="true" />
                <h2 className="type-tagline text-[#222]">{t(`benefits.${key}.title`)}</h2>
                <p className="type-body stack-title-body text-[#666]">{t(`benefits.${key}.description`)}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page layout-page-narrow">
        <h2 className="type-display-md section-head-gap text-center text-black">{t('featuresTitle')}</h2>
        <div className="flex flex-col gap-[var(--space-section)]">
          {featureCards.map((feature) => (
            <FeatureRow key={feature.key} feature={feature} t={t} />
          ))}
          <div className="grid gap-[var(--space-xl)] md:grid-cols-2">
            {solutionCards.map((key) => {
              const Icon = solutionIcons[key]
              return (
                <article key={key} className="flex min-h-[190px] flex-col justify-between rounded-[var(--rounded-sm)] bg-[#f4f4f4] p-[var(--space-lg)]">
                  <div>
                    <Icon className="mb-[var(--space-md)] text-xl text-[#007cff]" aria-hidden="true" />
                    <h3 className="type-tagline text-black">{t(`solutionCards.${key}.title`)}</h3>
                    <p className="type-body stack-title-body text-[#4b5563]">{t(`solutionCards.${key}.description`)}</p>
                  </div>
                  <Link href="/contact" className="type-caption mt-[var(--space-lg)] inline-flex items-center justify-end gap-[var(--space-sm)] text-neutral-500 hover:text-[#007cff]">
                    {t(`solutionCards.${key}.link`)}
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
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
  const image = (
    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[var(--rounded-sm)] bg-white md:min-h-[470px]">
      <Image
        src={feature.image}
        alt={t(`featureCards.${feature.key}.alt`)}
        width={626}
        height={470}
        className={`h-full w-full object-contain ${feature.key === 'members' ? 'pos-member-base-image' : ''}`}
      />
      {feature.key === 'checkout' && (
        <div className="pos-order-card-stack" aria-hidden="true">
          {checkoutOrderCards.map((order, index) => (
            <div key={order.id} className="pos-order-card" style={{ ['--order-index' as string]: index }}>
              <div className="pos-order-card-id-row">
                <span className="pos-order-card-id">{order.id}</span>
                {order.badge && (
                  <span className="pos-order-card-badge">
                    <Image src="/images/products/pos/order-grab.png" alt="" width={30} height={17} className="h-auto w-[30px] object-contain" />
                  </span>
                )}
              </div>
              <div className="pos-order-card-meta">
                <span>{order.name}</span>
                <span className="pos-order-card-price">
                  <Image src="/images/products/pos/order-mastercard.png" alt="" width={20} height={12} className="h-3 w-5 object-contain" />
                  <strong>{order.price}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {feature.key === 'members' && <MemberOverlays />}
    </div>
  )
  const copy = (
    <div className="flex min-h-[320px] flex-col justify-center rounded-[var(--rounded-sm)] bg-white py-[var(--space-xl)] md:min-h-[470px] md:px-[var(--space-xxl)] lg:px-[var(--space-section)]">
      <h3 className="type-display-md text-black">{t(`featureCards.${feature.key}.title`)}</h3>
      <p className="type-body stack-title-body max-w-md text-[#3f3f46]">{t(`featureCards.${feature.key}.description`)}</p>
      <ul className="stack-body-action space-y-[var(--space-md)]">
        {[0, 1, 2].map((index) => (
          <li key={index} className="type-body flex items-center gap-[var(--space-sm)] text-[#3f3f46]">
            <FaCheck className="shrink-0 text-[#007cff]" aria-hidden="true" />
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

function MemberOverlays(): React.ReactElement {
  return (
    <div className="pos-member-overlays" aria-hidden="true">
      <div className="pos-member-stamp-card">
        <Image src="/images/products/pos/member-card-cover.png" alt="" width={285} height={70} className="h-[70px] w-full object-cover" />
        <div className="pos-member-stamp-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className={`pos-member-stamp-cell ${index < 7 ? 'is-collected' : 'is-pending'}`}>
              <Image
                src="/images/products/pos/member-stamp-empty.png"
                alt=""
                width={45}
                height={38}
                className="h-full w-full object-contain"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="pos-member-wallet-card">
        <Image src="/images/products/pos/member-avatar.png" alt="" width={92} height={92} className="pos-member-avatar" />
        <div className="pos-member-wallet-content">
          <div className="pos-member-wallet-row">
            <div>
              <span>Name</span>
              <strong>Emily Carter</strong>
            </div>
            <strong>Starter</strong>
          </div>
          <div className="pos-member-wallet-button">Add to Wallet</div>
        </div>
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
            <article key={terminal.key} className="overflow-hidden rounded-[var(--rounded-sm)] bg-[#f4f4f4] shadow-[-6px_6px_8px_-1px_rgba(0,0,0,0.07)]">
              <div className="flex min-h-[240px] items-center justify-center px-[var(--space-xl)] py-[var(--space-lg)]">
                <Image src={terminal.image} alt={t(`terminals.${terminal.key}.alt`)} width={300} height={260} className="max-h-[230px] w-auto object-contain" />
              </div>
              <div className="bg-gradient-to-t from-white to-white/0 p-[var(--space-lg)] text-left">
                <h3 className="type-terminal-card-title text-black">{t(`terminals.${terminal.key}.title`)}</h3>
                <p className="type-caption mt-4 text-[#4a5565]">{t(`terminals.${terminal.key}.description`)}</p>
                <div className="mt-6 flex items-center justify-between gap-[var(--space-lg)]">
                  <Link href="/contact" className="type-body inline-flex items-center gap-3 text-[#007cff]">
                    {t('terminals.learnMore')}
                    <FaArrowRight aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="type-caption-strong inline-flex h-10 items-center justify-center rounded bg-black px-7 text-white hover:bg-[#222]">
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

function ToolkitSection({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page grid items-center gap-[var(--space-xxl)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[var(--space-section)]">
        <div>
          <h2 className="type-display-md text-black">
            {t('toolkit.titleLine1')}
            <br />
            {t('toolkit.titleLine2')}
          </h2>
          <p className="type-body stack-title-body text-[#666]">{t('toolkit.description')}</p>
          <Link href="/contact" className="type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-[var(--rounded-sm)] bg-black px-[var(--space-lg)] text-white">
            {t('toolkit.button')}
          </Link>
          <div className="stack-body-action flex flex-col gap-[var(--space-sm)]">
            <Link href="/contact" className="type-caption inline-flex items-center gap-[var(--space-sm)] text-neutral-500 hover:text-[#007cff]">
              {t('toolkit.accessories')}
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link href="/contact" className="type-caption inline-flex items-center gap-[var(--space-sm)] text-neutral-500 hover:text-[#007cff]">
              {t('toolkit.compatibility')}
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
        <Image src="/images/products/pos/toolkit.png" alt={t('toolkit.alt')} width={740} height={493} className="h-auto w-full object-contain" />
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
    <section className="section-space bg-[#0c0c0c] text-center text-white">
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
