import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/locales'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const titles = {
    zh: '厨房管理系统 - PalmNet',
    en: 'Kitchen Management System - PalmNet', 
    es: 'Sistema de Gestión de Cocina - PalmNet'
  }
  
  const descriptions = {
    zh: '高效的厨房管理系统，优化后厨工作流程，提升出餐效率',
    en: 'Efficient kitchen management system optimizing back-of-house workflow and improving food preparation efficiency',
    es: 'Sistema de gestión de cocina eficiente que optimiza el flujo de trabajo de cocina y mejora la eficiencia de preparación de alimentos'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function KitchenPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">厨房管理系统</h1>
        <p className="text-lg text-gray-600 mb-8">高效的后厨管理解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
