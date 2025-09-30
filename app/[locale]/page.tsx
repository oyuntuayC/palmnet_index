import Footer from 'components/Footer'
import HomePage from '../../components/HomePage'
import DarkHeader from 'components/DarkHeader'
import { getAllPosts } from '../../lib/blog'
import type { Metadata } from 'next'

// Required for output: 'export' to enumerate dynamic [locale] routes
export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

// 主页独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
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

export default function LocalizedPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }) {
  const posts = getAllPosts(params.locale)
  
  return (
    <>
      <DarkHeader />
        <HomePage posts={posts} />
      <Footer />
    </>
  )
}

