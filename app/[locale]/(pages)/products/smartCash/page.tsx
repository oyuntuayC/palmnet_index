import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '智能钱箱系统 - PalmNet',
    en: 'Smart Cash Drawer System - PalmNet', 
    es: 'Sistema de Cajón de Efectivo Inteligente - PalmNet'
  }
  
  const descriptions = {
    zh: '智能钱箱系统，自动管理现金收银，提升收银效率和安全性',
    en: 'Smart cash drawer system automatically managing cash transactions, improving efficiency and security',
    es: 'Sistema de cajón de efectivo inteligente que gestiona automáticamente las transacciones en efectivo, mejorando la eficiencia y seguridad'
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

export default function SmartCashPage(): React.ReactElement {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">智能钱箱系统</h1>
        <p className="text-lg text-gray-600 mb-8">智能现金管理解决方案</p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <p className="text-gray-500">产品详情页面正在开发中...</p>
        </div>
      </div>
    </div>
  )
}
