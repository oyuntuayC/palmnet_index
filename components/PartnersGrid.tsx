import Image from 'next/image'
import type { Locale } from '@/lib/locales'

interface PartnersGridProps {
  locale: Locale
}

export function PartnersGrid({ locale }: PartnersGridProps) {
  // Partner logos data
  const partners = [
    { name: 'Adyen', logo: '/images/partners/adyen.svg' },
    { name: 'Alipay', logo: '/images/partners/alipay.svg' },
    { name: 'Cashdro', logo: '/images/partners/cashdro.png' },
    { name: 'Deliverect', logo: '/images/partners/deliverect.png' },
    { name: 'Epson', logo: '/images/partners/epson.svg' },
    { name: 'Glovo', logo: '/images/partners/glovo.png' },
    { name: 'Hikvision', logo: '/images/partners/hikvision.svg' },
    { name: 'Just Eat', logo: '/images/partners/justeat.png' },
    { name: 'Samsung', logo: '/images/partners/samsung.svg' },
    { name: 'Stripe', logo: '/images/partners/stripe.svg' },
    { name: 'TP-Link', logo: '/images/partners/tplink.svg' },
    { name: 'Uber Eats', logo: '/images/partners/ubereats.svg' },
    { name: 'Verifone', logo: '/images/partners/verifone.png' },
    { name: 'WeChat Pay', logo: '/images/partners/wechatpay.png' },
    { name: 'Xiaomi', logo: '/images/partners/xiaomi.svg' },
    { name: 'Xprinter', logo: '/images/partners/xprinter.png' }
  ]

  // Multi-language content
  const content = {
    zh: {
      title: '合作伙伴',
      subtitle: '与全球领先的技术和服务提供商合作，为您提供完整的解决方案'
    },
    en: {
      title: 'Partners',
      subtitle: 'Working with leading global technology and service providers to deliver complete solutions'
    },
    es: {
      title: 'Socios',
      subtitle: 'Trabajando con proveedores líderes de tecnología y servicios globales para ofrecer soluciones completas'
    }
  }

  const currentContent = content[locale]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 space-y-4 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center lg:p-4"
            >
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={120}
                height={60}
                className="max-h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
        </div>
      </div>
    </section>
  )
}
