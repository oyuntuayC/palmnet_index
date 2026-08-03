import type { Metadata } from 'next'
import { Link } from '@/lib/navigation'
import { locales, type Locale } from '@/lib/locales'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const titles = {
    zh: '产品中心 - PalmNet',
    en: 'Products - PalmNet', 
    es: 'Productos - PalmNet'
  }
  
  const descriptions = {
    zh: '探索 PalmNet 完整的餐厅数字化产品解决方案',
    en: 'Explore PalmNet\'s complete digital restaurant product solutions',
    es: 'Explora las soluciones completas de productos digitales para restaurantes de PalmNet'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

// 为静态导出提供 locale 取值
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function ProductsPage(): React.ReactElement {
  const products = [
    { key: 'pos', name: '智能收银台', description: '专业的餐厅收银解决方案' },
    { key: 'kiosk', name: '桌台扫码', description: '智能自助点餐解决方案' },
    { key: 'online', name: '线上点餐', description: '便捷的在线点餐解决方案' },
    { key: 'waiter', name: '大屏点餐', description: '便携式点餐解决方案' },
    { key: 'pad', name: '大屏点餐', description: '便携式点餐解决方案' },
    { key: 'queue', name: '叫号管理', description: '智能排队管理解决方案' },
    { key: 'smartCash', name: '广告管理', description: '智能广告，精准触达' },
    { key: 'kitchen', name: '后厨KDS', description: '高效的后厨管理解决方案' },
  ]

  return (
    <main className="bg-white text-[#0a0a0a]">
      <section className="section-space">
        <div className="layout-page">
          <div className="section-head-gap text-center">
            <h1 className="type-display-md text-black">产品中心</h1>
            <p className="type-body text-[#71717b]">探索我们的完整产品解决方案</p>
          </div>
          
          <div className="grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link 
                key={product.key}
                href={`/products/${product.key}`}
                className="block rounded-[var(--rounded-sm)] bg-white p-[var(--space-lg)] shadow-md transition-shadow duration-300 hover:shadow-lg"
              >
                <h3 className="type-tagline stack-title-body text-black">{product.name}</h3>
                <p className="type-body stack-title-body text-[#71717b]">{product.description}</p>
                <div className="type-caption-strong text-primary">了解更多 →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
