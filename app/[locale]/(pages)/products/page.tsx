import type { Metadata } from 'next'
import Link from 'next/link'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
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
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function ProductsPage(): React.ReactElement {
  const products = [
    { key: 'pos', name: '智能收银台', description: '专业的餐厅收银解决方案' },
    { key: 'kiosk', name: '桌台扫码', description: '智能自助点餐解决方案' },
    { key: 'online', name: '线上点餐', description: '便捷的在线点餐解决方案' },
    { key: 'waiter', name: '跑堂点餐', description: '便携式点餐解决方案' },
    { key: 'pad', name: '大屏点餐', description: '便携式点餐解决方案' },
    { key: 'queue', name: '叫号管理', description: '智能排队管理解决方案' },
    { key: 'smartCash', name: '广告管理', description: '智能广告，精准触达' },
    { key: 'kitchen', name: '后厨KDS', description: '高效的后厨管理解决方案' },
  ]

  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">产品中心</h1>
        <p className="text-lg text-gray-600">探索我们的完整产品解决方案</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link 
            key={product.key}
            href={`/products/${product.key}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-primary font-medium">了解更多 →</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
