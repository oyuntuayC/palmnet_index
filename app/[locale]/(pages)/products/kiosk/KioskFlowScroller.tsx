'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaCheck } from 'react-icons/fa'

import { Link } from '@/lib/navigation'

type FlowItem = {
  key: string
  tab: string
  title: string
  items: string[]
}

type KioskFlowScrollerProps = {
  title: string
  description: string
  imageAlt: string
  learnMore: string
  items: FlowItem[]
}

export function KioskFlowScroller({ title, description, imageAlt, learnMore, items }: KioskFlowScrollerProps): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)
  const cardRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visibleEntry) return

        const index = Number((visibleEntry.target as HTMLElement).dataset.flowIndex)
        if (!Number.isNaN(index)) {
          setActiveIndex(index)
        }
      },
      { root: null, rootMargin: '-32% 0px -42% 0px', threshold: [0.25, 0.45, 0.65, 0.85] }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToItem = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="section-space bg-white">
      <div className="layout-page">
        <div className="max-w-3xl">
          <h2 className="type-display-md text-black">{title}</h2>
          <p className="type-body stack-title-body text-[#71717b]">{description}</p>
        </div>

        <div className="kiosk-flow-stage stack-body-action grid gap-[var(--space-xxl)] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,0.86fr)] lg:items-start">
          <div className="kiosk-pinned-flow-sticky lg:sticky lg:top-24">
            <div className="grid gap-[var(--space-lg)] lg:grid-cols-[150px_minmax(0,1fr)] lg:items-center">
              <div className="flex flex-wrap gap-[var(--space-sm)] lg:flex-col lg:items-start">
                {items.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => scrollToItem(index)}
                    className={`kiosk-flow-tab type-body inline-flex h-12 min-w-[112px] items-center justify-center rounded-full border border-[#9f9fa9] px-5 text-[#222] ${
                      activeIndex === index ? 'is-active' : ''
                    }`}
                  >
                    {item.tab}
                  </button>
                ))}
              </div>

              <div className="flex justify-center p-[var(--space-md)]">
                <Image
                  src="/images/products/kiosk/flow-screen-transparent.png"
                  alt={imageAlt}
                  width={1756}
                  height={2926}
                  className="kiosk-flow-device-image h-auto max-h-[720px] w-auto object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.08)]"
                />
              </div>
            </div>
          </div>

          <div className="kiosk-flow-card-track grid gap-[var(--space-xl)]">
            {items.map((item, index) => (
              <article
                key={item.key}
                ref={(element) => {
                  cardRefs.current[index] = element
                }}
                data-flow-index={index}
                tabIndex={0}
                className={`kiosk-flow-card flex min-h-[54vh] flex-col justify-center py-[var(--space-xl)] outline-none lg:min-h-[72vh] ${
                  activeIndex === index ? 'is-active' : ''
                }`}
              >
                <h3 className="type-display-md text-black">{item.title}</h3>
                <ul className="stack-title-body space-y-[var(--space-md)]">
                  {item.items.map((copy) => (
                    <li key={copy} className="type-body flex items-center gap-[var(--space-sm)] text-black">
                      <FaCheck className="shrink-0 text-[#007cff]" aria-hidden="true" />
                      {copy}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="type-body stack-title-body inline-flex items-center gap-[var(--space-sm)] text-[#007cff]">
                  {learnMore}
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
