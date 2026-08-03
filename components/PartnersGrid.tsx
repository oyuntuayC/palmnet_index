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
    <section className="section-space-tight bg-gray-50">
      <div className="layout-page">
        <div className="section-head-gap mx-auto max-w-2xl text-center">
          <h2 className="type-display-md text-gray-900">
            {currentContent.title}
          </h2>
          <p className="type-body stack-title-body text-gray-600">
            {currentContent.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-[var(--space-xl)] lg:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-[var(--space-md)] lg:p-[var(--space-lg)]"
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
      </div>
    </section>
  )
}
