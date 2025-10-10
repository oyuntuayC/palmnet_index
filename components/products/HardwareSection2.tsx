import React from 'react'
import Image from 'next/image'

interface HardwareSection2Props {
  pillLabel: string
  title: string
  subtitle: string
  description: string
  buttonLabel: string
  imageAlt: string
}

export function HardwareSection2({
  pillLabel,
  title,
  subtitle,
  description,
  buttonLabel,
  imageAlt
}: HardwareSection2Props): React.ReactElement {
  return (
    <section className="bg-white relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Image Content - Left */}
          <div className="flex-1 relative lg:order-1">
            <div className="relative">
              {/* Background Shape - Gray */}
              <div className="absolute bg-gray-600 h-[346px] w-[350px] top-0 left-0 rounded-3xl z-10" />
              
              {/* Main Image */}
              <div className="relative z-20">
                <Image
                  src="/images/products/online/hardware-2.png"
                  alt={imageAlt}
                  width={1600}
                  height={1200}
                  className="w-full h-auto object-cover rounded-3xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text Content - Right */}
          <div className="flex-1 flex flex-col gap-10 lg:order-2">
            <div className="relative">
              {/* Pill Label */}
              <div className="inline-flex items-center justify-center px-4 py-1 bg-white border border-amber-100 rounded-3xl mb-10">
                <span className="text-xs font-medium text-amber-600 tracking-tight">
                  {pillLabel}
                </span>
              </div>
              
              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-gray-900 tracking-tight mb-10">
                <span className="block">{title}</span>
                <span className="block">{subtitle}</span>
              </h2>
              
              {/* Description */}
              <p className="text-base leading-relaxed text-gray-600 tracking-tight max-w-lg">
                {description}
              </p>
            </div>
            
            {/* Button */}
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-sm rounded-full transition-colors duration-200 w-fit"
            >
              {buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
