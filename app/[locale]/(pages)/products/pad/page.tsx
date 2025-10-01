import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '大屏点餐系统 - PalmNet',
    en: 'Large Screen Ordering System - PalmNet', 
    es: 'Sistema de Pedidos en Pantalla Grande - PalmNet'
  }
  
  const descriptions = {
    zh: '顾客通过门店自助大屏快速下单，提升互动感与自助服务效率',
    en: 'Customers quickly place orders through in-store self-service large screens, enhancing interaction and self-service efficiency',
    es: 'Los clientes realizan pedidos rápidamente a través de pantallas grandes de autoservicio en la tienda, mejorando la interacción y la eficiencia del autoservicio'
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

export default function PadPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '大屏点餐系统',
      subtitle: '自助点餐，视觉体验',
      description: '顾客通过门店自助大屏快速下单，提升互动感与自助服务效率。',
      features: [
        {
          title: '触控大屏自助',
          description: '顾客自主选择菜品，操作直观便捷。'
        },
        {
          title: '菜品图片展示',
          description: '大屏高清展示菜品，增强点餐吸引力。'
        },
        {
          title: '多人同时操作',
          description: '支持多用户并行点餐，提高高峰期效率。'
        },
        {
          title: '实时订单推送',
          description: '下单后订单自动同步至后厨KDS。'
        },
        {
          title: '多语言界面',
          description: '支持中、英、西等多语种切换。'
        },
        {
          title: '支持多渠道支付',
          description: '自助完成支付，流程无缝衔接。'
        }
      ]
    },
    en: {
      title: 'Large Screen Ordering System',
      subtitle: 'Self-Service Ordering, Visual Experience',
      description: 'Customers quickly place orders through in-store self-service large screens, enhancing interaction and self-service efficiency.',
      features: [
        {
          title: 'Touch Screen Self-Service',
          description: 'Customers independently select dishes with intuitive and convenient operation.'
        },
        {
          title: 'Dish Image Display',
          description: 'High-definition display of dishes on large screens enhances ordering appeal.'
        },
        {
          title: 'Multi-user Simultaneous Operation',
          description: 'Supports multiple users ordering in parallel, improving efficiency during peak hours.'
        },
        {
          title: 'Real-time Order Push',
          description: 'Orders automatically sync to the back kitchen KDS after placement.'
        },
        {
          title: 'Multi-language Interface',
          description: 'Supports Chinese, English, Spanish and other language switching.'
        },
        {
          title: 'Multi-channel Payment Support',
          description: 'Self-service payment completion with seamless process integration.'
        }
      ]
    },
    es: {
      title: 'Sistema de Pedidos en Pantalla Grande',
      subtitle: 'Pedido Autoservicio, Experiencia Visual',
      description: 'Los clientes realizan pedidos rápidamente a través de pantallas grandes de autoservicio en la tienda, mejorando la interacción y la eficiencia del autoservicio.',
      features: [
        {
          title: 'Autoservicio en Pantalla Táctil',
          description: 'Los clientes seleccionan platos de forma independiente con operación intuitiva y conveniente.'
        },
        {
          title: 'Visualización de Imágenes de Platos',
          description: 'Pantalla de alta definición de platos en pantallas grandes mejora el atractivo del pedido.'
        },
        {
          title: 'Operación Simultánea Múltiple',
          description: 'Admite múltiples usuarios que realizan pedidos en paralelo, mejorando la eficiencia durante las horas pico.'
        },
        {
          title: 'Envío de Pedidos en Tiempo Real',
          description: 'Los pedidos se sincronizan automáticamente con el KDS de cocina después de realizarlos.'
        },
        {
          title: 'Interfaz Multilingüe',
          description: 'Admite cambio entre chino, inglés, español y otros idiomas.'
        },
        {
          title: 'Soporte de Pago Multicanal',
          description: 'Finalización de pago autoservicio con integración de proceso perfecta.'
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
              <div className="bg-purple-100 text-purple-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加大屏点餐流程展示 */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '大屏点餐优势' : 
             params.locale === 'en' ? 'Large Screen Ordering Advantages' : 
             'Ventajas de Pedidos en Pantalla Grande'}
          </h3>
          <p className="text-gray-600">
            {params.locale === 'zh' ? '提升顾客体验，优化门店运营' : 
             params.locale === 'en' ? 'Enhancing customer experience, optimizing store operations' : 
             'Mejorando la experiencia del cliente, optimizando las operaciones de la tienda'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: '👆', 
              title: '触控操作',
              desc: '直观易用的触控界面',
              enTitle: 'Touch Operation',
              enDesc: 'Intuitive and easy-to-use touch interface',
              esTitle: 'Operación Táctil',
              esDesc: 'Interfaz táctil intuitiva y fácil de usar'
            },
            { 
              icon: '🖼️', 
              title: '高清展示',
              desc: '菜品图片清晰诱人',
              enTitle: 'HD Display',
              enDesc: 'Clear and appealing dish images',
              esTitle: 'Pantalla HD',
              esDesc: 'Imágenes de platos claras y atractivas'
            },
            { 
              icon: '👥', 
              title: '多人使用',
              desc: '支持同时点餐不排队',
              enTitle: 'Multi-user',
              enDesc: 'Supports simultaneous ordering without queuing',
              esTitle: 'Multi-usuario',
              esDesc: 'Admite pedidos simultáneos sin colas'
            },
            { 
              icon: '⚡', 
              title: '快速下单',
              desc: '简化流程提升效率',
              enTitle: 'Fast Ordering',
              enDesc: 'Simplified process improves efficiency',
              esTitle: 'Pedido Rápido',
              esDesc: 'Proceso simplificado mejora la eficiencia'
            }
          ].map((item) => (
            <div key={item.title} className="text-center bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">
                {params.locale === 'zh' ? item.title : 
                 params.locale === 'en' ? item.enTitle : item.esTitle}
              </h4>
              <p className="text-gray-600 text-sm">
                {params.locale === 'zh' ? item.desc : 
                 params.locale === 'en' ? item.enDesc : item.esDesc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 添加应用场景展示 */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '适用场景' : 
             params.locale === 'en' ? 'Application Scenarios' : 
             'Escenarios de Aplicación'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              scenario: '快餐店',
              icon: '🍔',
              enScenario: 'Fast Food Restaurants',
              esScenario: 'Restaurantes de Comida Rápida'
            },
            { 
              scenario: '美食广场', 
              icon: '🏪',
              enScenario: 'Food Courts',
              esScenario: 'Patios de Comida'
            },
            { 
              scenario: '连锁餐厅',
              icon: '🏬',
              enScenario: 'Chain Restaurants',
              esScenario: 'Restaurantes Cadena'
            }
          ].map((item) => (
            <div key={item.scenario} className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="font-semibold text-gray-800">
                {params.locale === 'zh' ? item.scenario : 
                 params.locale === 'en' ? item.enScenario : item.esScenario}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


