"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'

type FeatureItem = { img: string; title: string; desc?: string }

const items: FeatureItem[] = [
  { img:'/images/feature-img-1.png', title:'CREATIVE' },
  { img:'/images/feature-img-2.png', title:'MODERN' },
  { img:'/images/feature-img-3.png', title:'COMFORT' },
]

export default function Features(): React.ReactElement {
  const t = useTranslations()
  // Map requested titles/descriptions onto first three items; keep 4th as-is until provided
  const features: FeatureItem[] = items.map((it, idx) => {
    if (idx === 0) return { ...it, title: 'PalmPOS', desc: 'The next-gen POS software that increase your personal efficiency.' }
    if (idx === 1) return { ...it, title: 'PalmKiosk' }
    if (idx === 2) return { ...it, title: 'PalmADS' }
    return it
  })

  // Embla carousel for mobile view (snaps to center after release)
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    skipSnaps: false,
    dragFree: false,
    startIndex: 0,
    inViewThreshold: 0.6
  })

  return (
    <section className="white-bg padding-top-60 padding-bottom-60">
      <div className="mx-auto max-w-screen-xl">
        {/* Mobile: Embla carousel */}
        <div className="block md:hidden">
          <div className="overflow-hidden touch-pan-y select-none cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -mx-2 will-change-transform">
              {features.map((it, idx) => (
                <div className="shrink-0 basis-[80%] px-2" key={idx}>
                  <article
                    className="light-gray-bg rounded p-5 text-center h-120 flex flex-col items-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="rounded object-contain h-24 w-auto" src={it.img} alt="" />
                    <h5 className="font-inter mt-4 mb-1">{it.title}</h5>
                    {it.desc ? <p className="text-sm text-muted mb-3">{it.desc}</p> : null}
                    <a href="#products" className="btn btn-small btn-round mt-auto">{t('nav.shopNow')}</a>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: regular 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {features.map((it,idx)=> (
            <article className="light-gray-bg rounded p-5 text-center h-120 flex flex-col items-center" key={idx}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rounded object-contain h-24 w-auto" src={it.img} alt="" />
              <h5 className="font-inter mt-4 mb-1">{it.title}</h5>
              {it.desc ? <p className="text-sm text-muted mb-3">{it.desc}</p> : null}
              <a href="#products" className="btn btn-small btn-round mt-auto">{t('nav.shopNow')}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

