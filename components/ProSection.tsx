import { Link } from '@/lib/navigation'
import type { Locale } from '@/lib/locales'

interface ProSectionProps {
  locale: Locale
}

export function ProSection({ locale }: ProSectionProps) {
  // Multi-language content
  const content = {
    zh: {
      pillLabel: 'PalmKit PRO',
      title: '需要针对中大型餐饮的解决方案？',
      description: '帕尔姆云餐PM PRO提供更全面的大店解决方案，配合平板点餐、KDS后厨管理、库存管理',
      buttonLabel: '查看PM PRO',
      buttonHref: '/products'
    },
    en: {
      pillLabel: 'PalmKit PRO',
      title: 'Need solutions for medium to large restaurants?',
      description: 'PalmKit PM PRO provides comprehensive solutions for large establishments, including tablet ordering, KDS kitchen management, and inventory management',
      buttonLabel: 'View PM PRO',
      buttonHref: '/products'
    },
    es: {
      pillLabel: 'PalmKit PRO',
      title: '¿Necesitas soluciones para restaurantes medianos y grandes?',
      description: 'PalmKit PM PRO ofrece soluciones integrales para establecimientos grandes, incluyendo pedidos por tablet, gestión de cocina KDS y gestión de inventario',
      buttonLabel: 'Ver PM PRO',
      buttonHref: '/products'
    }
  }

  const currentContent = content[locale]

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto">
          {/* Pill Badge */}
          <div className="bg-amber-50 border border-amber-100 rounded-full px-4 py-1">
            <p className="text-xs font-medium text-amber-600 tracking-tight">
              {currentContent.pillLabel}
            </p>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 text-center leading-tight tracking-tight">
            {currentContent.title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 text-center leading-relaxed max-w-3xl">
            {currentContent.description}
          </p>

          {/* CTA Button */}
          <Link
            href={currentContent.buttonHref}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full transition-colors duration-300 text-sm tracking-wide"
          >
            {currentContent.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
