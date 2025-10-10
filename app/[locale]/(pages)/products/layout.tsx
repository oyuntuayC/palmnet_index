import React from 'react'
import { PartnersGrid } from '@/components/PartnersGrid'
import { ProSection } from '@/components/ProSection'
import type { Locale } from '@/lib/locales'

export default function ProductsLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: Locale }
}): React.ReactElement {
  // Render shared sections for all product subpages
  return (
    <>
      {children}
      <PartnersGrid locale={params.locale} />
      <ProSection locale={params.locale} />
    </>
  )
}

