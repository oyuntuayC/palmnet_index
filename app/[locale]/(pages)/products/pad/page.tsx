import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '平板点单系统 - PalmNet',
    en: 'Tablet Ordering System - PalmNet', 
    es: 'Sistema de Pedidos con Tablet - PalmNet'
  }
  
  const descriptions = {
    zh: '便携式平板点单系统，服务员可随时为顾客点餐，提升服务体验',
    en: 'Portable tablet ordering system allowing servers to take orders anytime, enhancing service experience',
    es: 'Sistema de pedidos con tablet portátil que permite a los camareros tomar pedidos en cualquier momento, mejorando la experiencia del servicio'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

// 静态导出需要为动态段提供静态参数
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function PadPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">平板点单系统</h1>
        <p className="text-lg text-gray-600 mb-8">便携式点餐解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
