import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '桌台扫码点餐 - PalmNet',
    en: 'Table QR Code Ordering - PalmNet', 
    es: 'Pedido por Código QR en Mesa - PalmNet'
  }
  
  const descriptions = {
    zh: '顾客通过扫码即可自助下单，无需等待服务员，提高翻台率和顾客满意度',
    en: 'Customers self-order by scanning QR codes, no need to wait for staff, improving table turnover and customer satisfaction',
    es: 'Los clientes realizan pedidos automáticamente escaneando códigos QR, sin necesidad de esperar al personal, mejorando la rotación de mesas y la satisfacción del cliente'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function KioskPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '桌台扫码点餐',
      subtitle: '自助点餐，提升效率',
      description: '顾客通过扫码即可自助下单，无需等待服务员，提高翻台率和顾客满意度。',
      features: [
        {
          title: '快速扫码下单',
          description: '顾客用手机扫码桌台二维码，直接进入点餐页面，操作便捷。'
        },
        {
          title: '实时菜单同步',
          description: '菜单内容与库存实时同步，避免缺货点单，提升体验。'
        },
        {
          title: '支持多语言界面',
          description: '自动适配中、英、西等多语言，满足不同顾客需求。'
        },
        {
          title: '多渠道支付集成',
          description: '点餐后可直接选择微信、支付宝、银行卡等多种支付方式。'
        },
        {
          title: '自动订单推送后厨',
          description: '顾客下单后订单自动同步至后厨KDS系统，缩短等待时间。'
        },
        {
          title: '订单状态实时跟踪',
          description: '顾客可随时查看订单进度，提升透明度和服务感受。'
        }
      ]
    },
    en: {
      title: 'Table QR Code Ordering',
      subtitle: 'Self-Service Ordering, Enhanced Efficiency',
      description: 'Customers self-order by scanning QR codes, no need to wait for staff, improving table turnover and customer satisfaction.',
      features: [
        {
          title: 'Quick Scan to Order',
          description: 'Customers scan the table QR code with their phone to directly access the ordering page with convenient operation.'
        },
        {
          title: 'Real-time Menu Sync',
          description: 'Menu content synchronizes with inventory in real-time, avoiding out-of-stock orders and enhancing experience.'
        },
        {
          title: 'Multi-language Interface Support',
          description: 'Automatically adapts to Chinese, English, Spanish and other languages to meet diverse customer needs.'
        },
        {
          title: 'Multi-channel Payment Integration',
          description: 'After ordering, customers can directly choose from various payment methods like WeChat Pay, Alipay, bank cards, etc.'
        },
        {
          title: 'Automatic Order Push to Kitchen',
          description: 'Orders automatically sync to the back kitchen KDS system after customer placement, reducing wait times.'
        },
        {
          title: 'Real-time Order Status Tracking',
          description: 'Customers can check order progress anytime, improving transparency and service experience.'
        }
      ]
    },
    es: {
      title: 'Pedido por Código QR en Mesa',
      subtitle: 'Pedido Autoservicio, Eficiencia Mejorada',
      description: 'Los clientes realizan pedidos automáticamente escaneando códigos QR, sin necesidad de esperar al personal, mejorando la rotación de mesas y la satisfacción del cliente.',
      features: [
        {
          title: 'Pedido Rápido por Escaneo',
          description: 'Los clientes escanean el código QR de la mesa con su teléfono para acceder directamente a la página de pedidos con operación conveniente.'
        },
        {
          title: 'Sincronización de Menú en Tiempo Real',
          description: 'El contenido del menú se sincroniza con el inventario en tiempo real, evitando pedidos de productos agotados y mejorando la experiencia.'
        },
        {
          title: 'Soporte de Interfaz Multilingüe',
          description: 'Se adapta automáticamente a chino, inglés, español y otros idiomas para satisfacer las diversas necesidades de los clientes.'
        },
        {
          title: 'Integración de Pagos Multicanal',
          description: 'Después de realizar el pedido, los clientes pueden elegir directamente entre varios métodos de pago como WeChat Pay, Alipay, tarjetas bancarias, etc.'
        },
        {
          title: 'Envío Automático de Pedidos a Cocina',
          description: 'Los pedidos se sincronizan automáticamente con el sistema KDS de cocina después de que el cliente los realiza, reduciendo los tiempos de espera.'
        },
        {
          title: 'Seguimiento de Estado del Pedido en Tiempo Real',
          description: 'Los clientes pueden verificar el progreso del pedido en cualquier momento, mejorando la transparencia y la experiencia de servicio.'
        }
      ]
    }
  }

  const currentContent = content[params.locale]

  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{currentContent.title}</h1>
        <h2 className="text-2xl text-gray-700 mb-6">{currentContent.subtitle}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{currentContent.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentContent.features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start mb-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加一个模拟扫码点餐的展示区域 */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">扫码点餐体验</h3>
          <p className="text-gray-600">简单四步，完成点餐</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: '扫码桌台', desc: '打开手机扫描二维码' },
            { step: '2', title: '浏览菜单', desc: '查看实时更新的菜单' },
            { step: '3', title: '自助点餐', desc: '选择菜品加入购物车' },
            { step: '4', title: '在线支付', desc: '多种支付方式选择' }
          ].map((item) => (
            <div key={item.step} className="text-center bg-white p-4 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                {item.step}
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


