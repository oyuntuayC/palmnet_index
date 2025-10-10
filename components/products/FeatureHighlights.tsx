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
    <section className="px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="flex flex-col items-start gap-4 p-6 border-t-2 border-gray-100/80">
              <div className="flex h-12 w-12 items-center justify-center text-gray-800">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
