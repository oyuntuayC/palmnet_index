import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: 'POS 收银系统 - PalmNet',
    en: 'POS Cashier System - PalmNet', 
    es: 'Sistema de Caja POS - PalmNet'
  }
  
  const descriptions = {
    zh: '专业的POS收银系统，为餐厅提供高效的点餐和收银解决方案',
    en: 'Professional POS cashier system providing efficient ordering and payment solutions for restaurants',
    es: 'Sistema de caja POS profesional que proporciona soluciones eficientes de pedidos y pagos para restaurantes'
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

export default function POSPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">POS 收银系统</h1>
        <p className="text-lg text-gray-600 mb-8">专业的餐厅收银解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
