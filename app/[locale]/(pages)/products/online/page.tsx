import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '线上点餐系统 - PalmNet',
    en: 'Online Ordering System - PalmNet', 
    es: 'Sistema de Pedidos Online - PalmNet'
  }
  
  const descriptions = {
    zh: '顾客通过线上平台自主点餐，无需排队等待，显著提升点餐效率和用户体验',
    en: 'Customers place orders independently through online platforms without queuing, significantly improving ordering efficiency and user experience',
    es: 'Los clientes realizan pedidos de forma independiente a través de plataformas en línea sin hacer cola, mejorando significativamente la eficiencia de pedidos y la experiencia del usuario'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function OnlinePage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '线上点餐系统',
      subtitle: '便捷下单，随时随地',
      description: '顾客通过线上平台自主点餐，无需排队等待，显著提升点餐效率和用户体验。',
      features: [
        {
          title: '多终端支持',
          description: '手机、平板、电脑均可访问点餐系统，灵活适应不同场景。'
        },
        {
          title: '实时菜单展示',
          description: '菜单内容与库存信息实时更新，确保顾客点到现有商品。'
        },
        {
          title: '个性化推荐',
          description: '根据用户历史订单和偏好，智能推荐热门菜品。'
        },
        {
          title: '多语言切换',
          description: '支持中文、西班牙语、英语等多语言，服务更多客户群体。'
        },
        {
          title: '在线支付集成',
          description: '支持微信、支付宝、银行卡等多种支付方式，结账更便捷。'
        },
        {
          title: '自动订单同步后厨',
          description: '下单后订单自动推送至后厨KDS系统，加快出餐速度，减少等待时间。'
        }
      ]
    },
    en: {
      title: 'Online Ordering System',
      subtitle: 'Convenient Ordering, Anytime Anywhere',
      description: 'Customers place orders independently through online platforms without queuing, significantly improving ordering efficiency and user experience.',
      features: [
        {
          title: 'Multi-device Support',
          description: 'Mobile phones, tablets, and computers can all access the ordering system, flexibly adapting to different scenarios.'
        },
        {
          title: 'Real-time Menu Display',
          description: 'Menu content and inventory information are updated in real-time, ensuring customers order available items.'
        },
        {
          title: 'Personalized Recommendations',
          description: 'Intelligently recommends popular dishes based on user order history and preferences.'
        },
        {
          title: 'Multi-language Switching',
          description: 'Supports multiple languages including Chinese, Spanish, and English, serving more customer groups.'
        },
        {
          title: 'Online Payment Integration',
          description: 'Supports various payment methods like WeChat Pay, Alipay, bank cards, making checkout more convenient.'
        },
        {
          title: 'Automatic Order Sync to Kitchen',
          description: 'Orders are automatically pushed to the back kitchen KDS system after placement, speeding up food preparation and reducing wait times.'
        }
      ]
    },
    es: {
      title: 'Sistema de Pedidos Online',
      subtitle: 'Pedido Conveniente, En Cualquier Momento y Lugar',
      description: 'Los clientes realizan pedidos de forma independiente a través de plataformas en línea sin hacer cola, mejorando significativamente la eficiencia de pedidos y la experiencia del usuario.',
      features: [
        {
          title: 'Soporte Multi-dispositivo',
          description: 'Teléfonos móviles, tabletas y computadoras pueden acceder al sistema de pedidos, adaptándose flexiblemente a diferentes escenarios.'
        },
        {
          title: 'Visualización de Menú en Tiempo Real',
          description: 'El contenido del menú y la información del inventario se actualizan en tiempo real, garantizando que los clientes pidan artículos disponibles.'
        },
        {
          title: 'Recomendaciones Personalizadas',
          description: 'Recomienda inteligentemente platos populares basándose en el historial de pedidos y las preferencias del usuario.'
        },
        {
          title: 'Cambio de Múltiples Idiomas',
          description: 'Admite varios idiomas incluidos chino, español e inglés, atendiendo a más grupos de clientes.'
        },
        {
          title: 'Integración de Pago Online',
          description: 'Admite varios métodos de pago como WeChat Pay, Alipay, tarjetas bancarias, haciendo el pago más conveniente.'
        },
        {
          title: 'Sincronización Automática de Pedidos a Cocina',
          description: 'Los pedidos se envían automáticamente al sistema KDS de cocina después de realizarlos, acelerando la preparación de alimentos y reduciendo los tiempos de espera.'
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {currentContent.features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-start mb-3">
              <div className="bg-green-100 text-green-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加多终端展示区域 */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">全平台支持</h3>
          <p className="text-gray-600">无论使用何种设备，都能获得一致的优质体验</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              device: '手机', 
              icon: '📱', 
              desc: '移动端优化界面，触控操作流畅',
              enDevice: 'Mobile',
              enDesc: 'Mobile-optimized interface with smooth touch controls',
              esDevice: 'Móvil',
              esDesc: 'Interfaz optimizada para móviles con controles táctiles fluidos'
            },
            { 
              device: '平板', 
              icon: '💻', 
              desc: '大屏展示更清晰，操作更便捷',
              enDevice: 'Tablet',
              enDesc: 'Larger screen for clearer display and more convenient operation',
              esDevice: 'Tableta',
              esDesc: 'Pantalla más grande para visualización más clara y operación más conveniente'
            },
            { 
              device: '电脑', 
              icon: '🖥️', 
              desc: '完整功能体验，管理更高效',
              enDevice: 'Desktop',
              enDesc: 'Full feature experience for more efficient management',
              esDevice: 'Escritorio',
              esDesc: 'Experiencia completa de funciones para una gestión más eficiente'
            }
          ].map((item) => (
            <div key={item.device} className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-lg">
                {params.locale === 'zh' ? item.device : 
                 params.locale === 'en' ? item.enDevice : item.esDevice}
              </h4>
              <p className="text-gray-600">
                {params.locale === 'zh' ? item.desc : 
                 params.locale === 'en' ? item.enDesc : item.esDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


