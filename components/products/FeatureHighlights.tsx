import React from 'react'
import type { IconType } from 'react-icons'

type Highlight = {
  icon: IconType
  title: string
  subtitle: string
}

interface FeatureHighlightsProps {
  highlights: ReadonlyArray<Highlight>
}

export function FeatureHighlights({ highlights }: FeatureHighlightsProps): React.ReactElement | null {
  if (highlights.length === 0) {
    return null
  }

  return (
    <section className="section-space-tight">
      <div className="layout-page">
        <div className="mx-auto grid max-w-6xl gap-[var(--space-xl)] md:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex flex-col items-start gap-[var(--space-md)] border-t-2 border-gray-100/80 p-[var(--space-lg)]">
                <div className="flex h-12 w-12 items-center justify-center text-gray-800">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <h3 className="type-tagline text-gray-900">{item.title}</h3>
                  <p className="type-body stack-title-body text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
