import { Link } from '@/lib/navigation'
import Image from 'next/image'
import { ReactElement, ReactNode } from 'react'

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
    <section className="gap-12 text-center">
      <div className="lg:pr-8">
        <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1 text-sm font-medium text-gray-700">
          {pillLabel}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-[44px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 text-base text-gray-500 md:text-lg">{description}</p>
        ) : null}
        <div className="mt-10 flex gap-3 justify-center">
          <Link
            href={primaryButton.href}
            className="inline-flex items-center justify-center bg-black !text-white rounded-md px-6 py-3 font-semibold"
          >
            {primaryButton.label}
          </Link>
          <Link
            href={secondaryButton.href}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            {secondaryButton.label}
          </Link>
        </div>
      </div>
      <div className="relative flex w-full items-center justify-center">
        <div 
          className="group relative w-full max-w-[1180px] h-96 mt-32 md:mt-42 lg:mt-64 p-6 animate-fadeIn motion-reduce:animate-none motion-reduce:translate-y-0"
          style={{
            background: imageBackgroundColor,
            borderTopLeftRadius: '36px',
            borderTopRightRadius: '36px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 mx-auto overflow-hidden ">
            <div className="translate-y-0 md:translate-y-24 opacity-0 animate-fadeIn [--translate-y:48px] [--duration:600ms]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
