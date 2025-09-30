import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '叫号排队系统 - PalmNet',
    en: 'Queue Management System - PalmNet', 
    es: 'Sistema de Gestión de Colas - PalmNet'
  }
  
  const descriptions = {
    zh: '智能叫号排队系统，有序管理顾客排队，提升服务效率',
    en: 'Smart queue management system organizing customer lines and improving service efficiency',
    es: 'Sistema inteligente de gestión de colas que organiza las filas de clientes y mejora la eficiencia del servicio'
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

export default function QueuePage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">叫号排队系统</h1>
        <p className="text-lg text-gray-600 mb-8">智能排队管理解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
