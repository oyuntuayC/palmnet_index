import Image from 'next/image'
import { FaArrowRight, FaExclamation } from 'react-icons/fa'

import { Link } from '@/lib/navigation'
import { SolutionTabs } from '@/app/[locale]/(pages)/solutions/SolutionTabs'

type Translator = (key: string) => string

type SolutionTabsProps = Parameters<typeof SolutionTabs>[0]['tabs']

export function SolutionChallengesSection({
  t,
  challengeKeys
}: {
  t: Translator
  challengeKeys: readonly string[]
}): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <h2 className="type-display-md text-center text-black">{t('challenges.title')}</h2>
        <div className="section-head-gap mx-auto grid max-w-[1298px] gap-[var(--space-xl)] rounded-[var(--rounded-sm)] bg-[#f3f1f1] px-[var(--space-lg)] py-[var(--space-xl)] md:grid-cols-2 lg:grid-cols-4 lg:px-[var(--space-section)]">
          {challengeKeys.map((key) => (
            <article key={key} className="text-center">
              <FaExclamation className="mx-auto mb-[var(--space-md)] text-2xl text-[#c91616]" aria-hidden="true" />
              <h3 className="type-tagline text-black">{t(`challenges.items.${key}.title`)}</h3>
              <p className="type-body stack-title-body text-[#18181b]">{t(`challenges.items.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SolutionIntroSection({ t }: { t: Translator }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page layout-page-narrow text-center">
        <h2 className="type-display-md text-black">{t('intro.title')}</h2>
        <p className="type-body mx-auto stack-title-body max-w-5xl text-black">{t('intro.description')}</p>
      </div>
    </section>
  )
}

export function SolutionGrowthSection({
  t,
  tabs
}: {
  t: Translator
  tabs: SolutionTabsProps
}): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page layout-page-narrow">
        <h2 className="type-display-md max-w-xl text-black">{t('growth.title')}</h2>
        <p className="type-body stack-title-body max-w-3xl text-black">{t('growth.description')}</p>
        <div className="stack-body-action">
          <SolutionTabs tabs={tabs} />
        </div>
      </div>
    </section>
  )
}

export function SolutionProductsSection({
  t,
  productKeys,
  productImages
}: {
  t: Translator
  productKeys: readonly string[]
  productImages: Record<string, { src: string; href: string }>
}): React.ReactElement {
  return (
    <section className="section-space bg-white">
      <div className="layout-page text-center">
        <h2 className="type-display-md text-black">{t('products.title')}</h2>
        <p className="type-body stack-title-body text-[#666]">{t('products.subtitle')}</p>
        <div className="section-head-gap grid gap-[var(--space-xl)] md:grid-cols-2 xl:grid-cols-4">
          {productKeys.map((key) => (
            <article key={key} className="flex min-h-[520px] flex-col items-center justify-center rounded-[var(--rounded-sm)] bg-[#f6f6f6] p-[var(--space-xl)] text-center">
              <h3 className="type-tagline text-black">{t(`products.items.${key}.title`)}</h3>
              <div className="mt-[var(--space-lg)] flex h-[250px] w-full items-center justify-center">
                <Image src={productImages[key].src} alt={t(`products.items.${key}.imageAlt`)} width={320} height={260} className="max-h-[230px] w-auto object-contain" />
              </div>
              <p className="type-caption stack-title-body max-w-[240px] text-black">{t(`products.items.${key}.description`)}</p>
              <Link href={productImages[key].href} className="type-caption mt-[var(--space-lg)] inline-flex items-center gap-[var(--space-xs)] text-neutral-500 hover:text-[#007cff]">
                {t('products.learnMore')}
                <FaArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SolutionConsultCtaSection({ t }: { t: Translator }): React.ReactElement {
  return (
    <section className="section-space-tight bg-white">
      <div className="layout-page">
        <div className="bg-[#f1f5f9] px-[var(--space-lg)] py-[var(--space-section)] md:px-[var(--space-xxl)] lg:px-[120px]">
          <h2 className="type-display-md max-w-md text-black">{t('consultCta.title')}</h2>
          <p className="type-body stack-title-body max-w-4xl text-[#71717b]">{t('consultCta.description')}</p>
          <Link href="/contact" className="type-body stack-body-action inline-flex min-h-[44px] items-center justify-center rounded-[var(--rounded-sm)] bg-black px-[var(--space-xl)] text-white">
            {t('consultCta.button')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SolutionFooterLeadSection({ t }: { t: Translator }): React.ReactElement {
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
