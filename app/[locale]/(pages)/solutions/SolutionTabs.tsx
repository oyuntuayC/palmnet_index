'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

type SolutionTab = {
  key: string
  label: string
  title: string
  description: string
  items: string[]
  image: string
  imageAlt: string
}

type SolutionTabsProps = {
  tabs: SolutionTab[]
}

export function SolutionTabs({ tabs }: SolutionTabsProps): React.ReactElement {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key)
  const activeTab = tabs.find((tab) => tab.key === activeKey) ?? tabs[0]

  return (
    <div className="mx-auto max-w-[1080px]">
      <div className="mx-auto flex w-fit flex-wrap justify-center gap-[var(--space-sm)] rounded-full bg-[#f3f4f6] p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            className={`type-caption-strong h-14 min-w-[116px] rounded-full px-8 transition ${
              activeTab.key === tab.key ? 'bg-white text-[#222] shadow-[0_0_4px_rgba(0,0,0,0.22)]' : 'text-[#222] hover:bg-white/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-[var(--space-xxl)] grid items-center gap-[var(--space-xxl)] lg:grid-cols-[500px_minmax(0,1fr)]">
        <div className="relative aspect-square overflow-hidden bg-white">
          <Image src={activeTab.image} alt={activeTab.imageAlt} fill sizes="500px" className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-[var(--space-sm)]">
            <FaCheck className="shrink-0 text-[#007cff]" aria-hidden="true" />
            <h3 className="type-display-md text-black">{activeTab.title}</h3>
          </div>
          <p className="type-body stack-title-body text-[#71717b]">{activeTab.description}</p>
          <ul className="type-body stack-body-action space-y-[var(--space-md)] text-black">
            {activeTab.items.map((item) => (
              <li key={item} className="flex gap-[var(--space-sm)]">
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
