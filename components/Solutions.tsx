"use client"
import React from 'react'
import { useTranslations } from 'next-intl'

type FeatureItem = { img: string; title: string; desc?: string }

const items: FeatureItem[] = [
  { img:'/images/feature-img-1.png', title:'nav.solutionTypes.fastFood' },
  { img:'/images/feature-img-2.png', title:'nav.solutionTypes.teaCoffee' },
  { img:'/images/feature-img-3.png', title:'nav.solutionTypes.bakery' },
  { img:'/images/feature-img-4.png', title:'nav.solutionTypes.fullServiceDining' },
]

export default function Solutions(): React.ReactElement {
  const t = useTranslations()
  return (
    <section className="white-bg padding-top-60 padding-bottom-60">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((it,idx)=> (
            <article className="light-gray-bg rounded p-5 text-center h-full flex flex-col items-center" key={idx}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="rounded object-contain h-24 w-auto" src={it.img} alt="" />
              <h5 className="font-inter mt-4 mb-1">{t(it.title as any)}</h5>
              {it.desc ? <p className="text-sm text-muted mb-3">{it.desc}</p> : null}
              <a href="#products" className="btn btn-small btn-round mt-auto">{t('nav.shopNow')}</a>
              </article>
          ))}
        </div>
      </div>
    </section>
  )
}

