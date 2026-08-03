import Footer from 'components/Footer'
import HomePage from '../../components/HomePage'
import Header from 'components/Header'
import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/locales'

// Required for output: 'export' to enumerate dynamic [locale] routes
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

// 主页独立的标题和描述
export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const titles = {
    zh: 'PalmNet - 餐厅数字化解决方案',
    en: 'PalmNet - Restaurant Digital Solutions', 
    es: 'PalmNet - Soluciones Digitales para Restaurantes'
  }
  
  const descriptions = {
    zh: '为欧洲餐厅提供完整的数字化解决方案，包括POS、在线点餐、厨房管理等',
    en: 'Complete digital solutions for European restaurants including POS, online ordering, kitchen management',
    es: 'Soluciones digitales completas para restaurantes europeos incluyendo POS, pedidos online, gestión de cocina'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export default function LocalizedPage({ params }: { params: { locale: Locale } }) {
  return (
    <>
      <Header theme="light" />
      <HomePage />
      <Footer />
    </>
  )
}
