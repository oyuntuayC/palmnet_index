import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/locales'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
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
  return locales.map((locale) => ({ locale }))
}

export default function QueuePage(): React.ReactElement {
  return (
    <main className="bg-white text-[#0a0a0a]">
      <section className="section-space">
        <div className="layout-page layout-page-narrow text-center">
          <h1 className="type-display-md text-black">叫号排队系统</h1>
          <p className="type-body stack-title-body text-[#71717b]">智能排队管理解决方案</p>
          <div className="stack-body-action rounded-[var(--rounded-sm)] bg-[#f1f5f9] p-[var(--space-xl)]">
            <p className="type-body text-[#71717b]">产品详情页面正在开发中...</p>
          </div>
        </div>
      </section>
    </main>
  )
}
