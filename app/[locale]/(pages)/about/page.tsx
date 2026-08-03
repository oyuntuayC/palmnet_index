import Image from 'next/image'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { MerchantLogoMarquee } from '@/components/MerchantLogoMarquee'
import { locales, type Locale } from '@/lib/locales'
import { Link } from '@/lib/navigation'

const capabilityCards = [
  { key: 'payments', href: '/products/pos' },
  { key: 'operations', href: '/products/kitchen' },
  { key: 'retention', href: '/products/pad' },
]

const resourceCards = [
  { key: 'tech', image: '/images/about/article-tech.jpg' },
  { key: 'pos', image: '/images/about/article-pos.png' },
  { key: 'offline', image: '/images/about/article-offline.png' },
]

export async function generateMetadata({ params }: { params: { locale: Locale } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'aboutNew.meta' })
  
  return {
    title: t('title'),
    description: t('description'),
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function AboutPage({ params }: { params: { locale: Locale } }): Promise<React.ReactElement> {
  const t = await getTranslations({ locale: params.locale, namespace: 'aboutNew' })
  
  return (
    <main className="bg-black text-white">
      <section className="relative flex min-h-[669px] items-center justify-center overflow-hidden px-5 py-24 text-center">
        <Image src="/images/about/hero.jpg" alt={t('hero.imageAlt')} fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/25" />
        <h1 className="type-hero-display relative max-w-[760px] text-white">
          {t('hero.title')}
        </h1>
      </section>

      <section className="grid gap-16 px-5 py-24 md:px-12 lg:grid-cols-[380px_minmax(0,533px)] lg:justify-between lg:px-[120px]">
        <div>
          <p className="type-lead text-white/80">{t('story.kicker')}</p>
          <h2 className="type-display-lg mt-10 font-light text-white">{t('story.title')}</h2>
        </div>
        <div className="type-body space-y-6 text-justify font-light text-white/90">
          {[0, 1, 2, 3, 4].map((index) => (
            <p key={index}>{t(`story.paragraphs.${index}`)}</p>
          ))}
        </div>
      </section>

      <section className="overflow-hidden px-5 py-16 md:px-12 lg:px-[60px]">
        <div className="flex gap-8 overflow-x-auto pb-4">
          {capabilityCards.map((card) => (
            <article key={card.key} className="relative flex min-h-[584px] min-w-[320px] items-end overflow-hidden rounded-3xl md:min-w-[380px]">
              <Image src={`/images/about/capability-${card.key}.jpg`} alt={t(`capabilities.${card.key}.imageAlt`)} fill sizes="380px" className="object-cover opacity-60" />
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative w-full p-8">
                <h3 className="type-tagline text-white">{t(`capabilities.${card.key}.title`)}</h3>
                <p className="type-caption mt-4 text-zinc-50">{t(`capabilities.${card.key}.description`)}</p>
                <Link href={card.href} className="type-fine-print mt-6 inline-flex items-center text-[#007cff]">
                  {t('capabilities.learnMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid items-center gap-10 px-5 py-20 md:px-12 lg:grid-cols-[minmax(0,634px)_minmax(0,460px)] lg:justify-between lg:px-[120px]">
        <div className="relative aspect-[634/314] overflow-hidden rounded-2xl bg-white">
          <Image src="/images/about/mission.jpg" alt={t('mission.imageAlt')} fill sizes="634px" className="object-cover" />
        </div>
        <div>
          <h2 className="type-display-lg text-white">{t('mission.title')}</h2>
          <p className="type-body mt-10 max-w-[420px] text-white/85">{t('mission.description')}</p>
        </div>
      </section>

      <section className="px-5 py-20 text-center md:px-12">
        <h2 className="type-display-lg text-white">{t('offices.title')}</h2>
        <div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-3">
          {['europe', 'asia', 'tech'].map((key) => (
            <article key={key} className="border-t border-white/40 pt-10">
              <h3 className="type-tagline text-white">
                {t(`offices.items.${key}.title`)}
                <br />
                {t(`offices.items.${key}.location`)}
              </h3>
              <p className="type-body mt-6 whitespace-pre-line font-light text-white/85">{t(`offices.items.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-black md:px-12">
        <div className="text-center">
          <h2 className="type-display-lg text-black">{t('resources.title')}</h2>
          <p className="type-lead mt-4 text-[#666]">{t('resources.subtitle')}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {resourceCards.map((card) => (
            <article key={card.key} className="overflow-hidden rounded-lg bg-white shadow-[-3px_8px_8px_rgba(0,0,0,0.06)]">
              <div className="relative h-[300px] bg-[#f4f4f4]">
                <Image src={card.image} alt={t(`resources.items.${card.key}.imageAlt`)} fill sizes="360px" className="object-cover" />
              </div>
              <div className="p-8">
                <h3 className="type-tagline text-black">{t(`resources.items.${card.key}.title`)}</h3>
                <Link href="/blogs" className="type-caption mt-8 inline-flex text-neutral-500 hover:text-[#007cff]">
                  {t('resources.learnMore')}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <MerchantLogoMarquee
        title={t('brands.title')}
        sectionClassName="overflow-hidden bg-white px-5 py-20 text-black md:px-12"
        titleClassName="type-display-lg text-center text-black"
      />

      <section className="bg-[#222] px-5 py-24 text-center text-white md:px-12">
        <h2 className="type-display-lg font-normal text-white">
          {t('cta.titleLine1')}
          <br />
          {t('cta.titleLine2')}
        </h2>
        <Link href="/contact" className="type-lead mt-16 inline-flex min-h-[72px] min-w-[240px] items-center justify-center rounded bg-white px-12 font-medium text-black">
          {t('cta.button')}
        </Link>
      </section>
    </main>
  )
}
