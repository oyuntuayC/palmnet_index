import { Link } from '@/lib/navigation'
import { ReactNode } from 'react'

type ButtonConfig = {
  label: string
  href: string
}

type ImageConfig = {
  src: string
  alt: string
}

interface ProductsHeroProps {
  pillLabel: string
  title: string
  description?: string
  primaryButton: ButtonConfig
  secondaryButton: ButtonConfig
  image?: ImageConfig
  imageBackgroundColor?: string
  children?: ReactNode
}

export function ProductsHero({
  pillLabel,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageBackgroundColor = 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)',
  children
}: ProductsHeroProps): React.ReactElement {
  return (
    <section className="section-space gap-[var(--space-xxl)] text-center">
      <div className="layout-page lg:pr-[var(--space-xl)]">
        <span className="type-caption-strong inline-flex items-center rounded-full bg-gray-200 px-[var(--space-md)] py-[var(--space-xs)] uppercase tracking-[0.23em] text-gray-700">
          {pillLabel}
        </span>
        <h1 className="type-hero-display stack-title-body text-gray-900">
          {title}
        </h1>
        {description ? (
          <p className="type-body stack-title-body text-gray-500">{description}</p>
        ) : null}
        <div className="stack-body-action flex justify-center gap-[var(--space-sm)]">
          <Link
            href={primaryButton.href}
            className="type-body inline-flex min-h-[44px] items-center justify-center rounded-full bg-black px-[22px] py-[11px] !text-white hover:bg-[#222]"
          >
            {primaryButton.label}
          </Link>
          <Link
            href={secondaryButton.href}
            className="type-body inline-flex min-h-[44px] items-center justify-center rounded-full border border-gray-300 px-[22px] py-[11px] text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            {secondaryButton.label}
          </Link>
        </div>
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div 
          className="group relative mt-[var(--space-section)] h-96 w-full max-w-[1180px] animate-fadeIn p-[var(--space-lg)] motion-reduce:animate-none motion-reduce:translate-y-0 md:mt-[var(--space-section)] lg:mt-[var(--space-section)]"
          style={{
            background: imageBackgroundColor,
            borderTopLeftRadius: '36px',
            borderTopRightRadius: '36px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 mx-auto overflow-hidden ">
            <div className="translate-y-0 opacity-0 animate-fadeIn [--translate-y:48px] [--duration:600ms] md:translate-y-24">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
