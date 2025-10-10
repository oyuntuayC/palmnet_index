import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/lib/navigation'
import type { Locale } from '@/lib/locales'

interface Hardware2Props {
  locale: Locale
}

export async function Hardware2({ locale }: Hardware2Props): Promise<React.ReactElement> {
  const t = await getTranslations({ locale, namespace: 'products.kiosk.hardwareSecondary' })

  return (
    <section className="flex flex-col-reverse md:flex-row gap-4 items-start px-16 py-8">
      {/* Image section - positioned on the left */}
      <div className="relative flex flex-col gap-5 items-start max-w-4xl overflow-hidden w-[449px]">
        <div className="h-[568px] relative w-[368px] z-10">
          <Image
            src="/images/products/kiosk/hardware2.png"
            alt={t('imageAlt')}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute h-[398px] bg-gray-200/70 bottom-20 left-0 rounded-3xl top-24 w-[407px] z-0" />
      </div>

      {/* Text content - positioned on the right */}
      <div className="flex-1 flex flex-col gap-10 items-start px-0 py-4 border-t border-gray-200">
        <div className="flex flex-col gap-10 items-start pl-0 lg:pr-20 py-0 w-full">
          {/* Pill label */}
          <div className="bg-white border border-amber-100 flex items-center justify-center px-4 py-1 rounded-3xl">
            <p className="text-xs text-amber-600 tracking-tight">
              {t('pillLabel')}
            </p>
          </div>
          
          {/* Title */}
          <div className="text-5xl text-gray-900 tracking-tight leading-tight">
            <p className="mb-0">{t('title')}</p>
            <p>{t('subtitle')}</p>
          </div>
          
          {/* Description */}
          <p className="text-base text-gray-600 tracking-tight leading-relaxed">
            {t('description')}
          </p>
        </div>
        
        {/* CTA Button */}
        <Link
          href="/contact"
          className="bg-amber-500 flex items-center justify-center px-6 py-4 rounded-full hover:bg-amber-600 transition-colors"
        >
          <p className="text-sm font-bold text-gray-900 text-center tracking-wide">
            {t('buttonLabel')}
          </p>
        </Link>
      </div>
    </section>
  )
}
