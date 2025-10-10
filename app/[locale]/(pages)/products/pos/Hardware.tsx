import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/lib/navigation'
import type { Locale } from '@/lib/locales'

interface HardwareProps {
  locale: Locale
}

export async function Hardware({ locale }: HardwareProps): Promise<React.ReactElement> {
  const t = await getTranslations({ locale, namespace: 'products.pos.hardware' })
  const features = ['screenOptions', 'design', 'system', 'bracket'].map((key) =>
    t(`features.${key}`)
  )

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start lg:items-center">
          {/* Text Content */}
          <div className="flex-1 space-y-10">
            {/* Title Section */}
            <div className="space-y-10">
              {/* Pill Badge */}
              <div className="bg-amber-50 border border-amber-100 rounded-full px-4 py-1 w-fit">
                <p className="text-xs font-medium text-amber-600 tracking-tight">
                  {t('pillLabel')}
                </p>
              </div>

              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                {t('title')}
              </h2>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex gap-8 items-start py-5 border-t border-gray-200 first:border-t-0"
                >
                  <p className="text-sm font-bold text-gray-600 w-8 flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-gray-900 leading-relaxed flex-1">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="bg-[#d8af33] hover:bg-amber-600 text-gray-900 font-bold px-6 py-3 rounded-full transition-colors duration-300 text-sm tracking-wide inline-block"
            >
              {t('buttonLabel')}
            </Link>
          </div>

          {/* Image Section */}
          <div className="w-full lg:flex-1 relative">
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <Image
                src="/images/products/pos/s1.png"
                alt={t('imageAlt')}
                width={568}
                height={640}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
