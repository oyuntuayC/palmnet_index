import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '在线点餐系统 - PalmNet',
    en: 'Online Ordering System - PalmNet', 
    es: 'Sistema de Pedidos Online - PalmNet'
  }
  
  const descriptions = {
    zh: '便捷的在线点餐系统，让顾客随时随地轻松下单',
    en: 'Convenient online ordering system allowing customers to place orders anytime, anywhere',
    es: 'Sistema de pedidos online conveniente que permite a los clientes hacer pedidos en cualquier momento y lugar'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function OnlinePage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">在线点餐系统</h1>
        <p className="text-lg text-gray-600 mb-8">便捷的在线点餐解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
