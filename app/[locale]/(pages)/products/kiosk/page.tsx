import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '自助点餐机 - PalmNet',
    en: 'Self-Service Kiosk - PalmNet', 
    es: 'Kiosco de Autoservicio - PalmNet'
  }
  
  const descriptions = {
    zh: '智能自助点餐机，提升顾客体验，减少排队等待时间',
    en: 'Smart self-service kiosk enhancing customer experience and reducing wait times',
    es: 'Kiosco de autoservicio inteligente que mejora la experiencia del cliente y reduce los tiempos de espera'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function KioskPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">自助点餐机</h1>
        <p className="text-lg text-gray-600 mb-8">智能自助点餐解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
