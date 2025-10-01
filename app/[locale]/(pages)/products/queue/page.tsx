import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '叫号管理系统 - PalmNet',
    en: 'Number Calling System - PalmNet', 
    es: 'Sistema de Llamada por Número - PalmNet'
  }
  
  const descriptions = {
    zh: '智能叫号系统自动提醒顾客取餐，提升门店运营效率与顾客体验',
    en: 'Smart number calling system automatically notifies customers for pickup, improving store operational efficiency and customer experience',
    es: 'Sistema inteligente de llamada por número notifica automáticamente a los clientes para recoger, mejorando la eficiencia operativa de la tienda y la experiencia del cliente'
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

export default function QueuePage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '叫号管理系统',
      subtitle: '高效叫号，有序取餐',
      description: '智能叫号系统自动提醒顾客取餐，提升门店运营效率与顾客体验。',
      features: [
        {
          title: '自动叫号推送',
          description: '订单完成后自动推送叫号信息至顾客。'
        },
        {
          title: '多渠道提醒',
          description: '支持短信、屏幕显示、语音播报等方式。'
        },
        {
          title: '订单状态实时更新',
          description: '顾客可随时查询取餐进度。'
        },
        {
          title: '灵活号码管理',
          description: '支持自定义号码格式，适应不同门店需求。'
        },
        {
          title: '取餐高峰分流',
          description: '智能分流，避免拥堵，提升效率。'
        },
        {
          title: '数据统计分析',
          description: '叫号数据自动记录，便于后续优化。'
        }
      ]
    },
    en: {
      title: 'Number Calling System',
      subtitle: 'Efficient Calling, Orderly Pickup',
      description: 'Smart number calling system automatically notifies customers for pickup, improving store operational efficiency and customer experience.',
      features: [
        {
          title: 'Automatic Number Calling',
          description: 'Automatically pushes calling information to customers after order completion.'
        },
        {
          title: 'Multi-channel Notifications',
          description: 'Supports SMS, screen display, voice broadcast and other methods.'
        },
        {
          title: 'Real-time Order Status Updates',
          description: 'Customers can check pickup progress anytime.'
        },
        {
          title: 'Flexible Number Management',
          description: 'Supports custom number formats to adapt to different store needs.'
        },
        {
          title: 'Peak Hour Distribution',
          description: 'Intelligent distribution avoids congestion and improves efficiency.'
        },
        {
          title: 'Data Statistical Analysis',
          description: 'Calling data automatically recorded for subsequent optimization.'
        }
      ]
    },
    es: {
      title: 'Sistema de Llamada por Número',
      subtitle: 'Llamada Eficiente, Recogida Ordenada',
      description: 'Sistema inteligente de llamada por número notifica automáticamente a los clientes para recoger, mejorando la eficiencia operativa de la tienda y la experiencia del cliente.',
      features: [
        {
          title: 'Llamada Automática por Número',
          description: 'Empuja automáticamente la información de llamada a los clientes después de completar el pedido.'
        },
        {
          title: 'Notificaciones Multicanal',
          description: 'Admite SMS, pantalla de visualización, transmisión de voz y otros métodos.'
        },
        {
          title: 'Actualizaciones de Estado de Pedido en Tiempo Real',
          description: 'Los clientes pueden verificar el progreso de recogida en cualquier momento.'
        },
        {
          title: 'Gestión Flexible de Números',
          description: 'Admite formatos de números personalizados para adaptarse a las necesidades de diferentes tiendas.'
        },
        {
          title: 'Distribución en Horas Pico',
          description: 'La distribución inteligente evita la congestión y mejora la eficiencia.'
        },
        {
          title: 'Análisis Estadístico de Datos',
          description: 'Datos de llamada registrados automáticamente para su posterior optimización.'
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
              <div className="bg-orange-100 text-orange-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加叫号流程展示 */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '智能叫号流程' : 
             params.locale === 'en' ? 'Smart Calling Process' : 
             'Proceso de Llamada Inteligente'}
          </h3>
          <p className="text-gray-600">
            {params.locale === 'zh' ? '从下单到取餐，全程智能化管理' : 
             params.locale === 'en' ? 'Intelligent management from ordering to pickup' : 
             'Gestión inteligente desde el pedido hasta la recogida'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              step: '1',
              title: '下单取号',
              desc: '顾客完成支付获取号码',
              enTitle: 'Order & Get Number',
              enDesc: 'Customer completes payment to get number',
              esTitle: 'Pedido y Obtener Número',
              esDesc: 'El cliente completa el pago para obtener el número'
            },
            { 
              step: '2',
              title: '后厨制作',
              desc: '订单自动推送至后厨',
              enTitle: 'Kitchen Preparation',
              enDesc: 'Order automatically pushed to kitchen',
              esTitle: 'Preparación en Cocina',
              esDesc: 'Pedido enviado automáticamente a cocina'
            },
            { 
              step: '3',
              title: '自动叫号',
              desc: '完成后系统自动叫号',
              enTitle: 'Automatic Calling',
              enDesc: 'System automatically calls number when ready',
              esTitle: 'Llamada Automática',
              esDesc: 'El sistema llama automáticamente al número cuando está listo'
            },
            { 
              step: '4',
              title: '顾客取餐',
              desc: '凭号取餐，流程结束',
              enTitle: 'Customer Pickup',
              enDesc: 'Pick up with number, process complete',
              esTitle: 'Recogida del Cliente',
              esDesc: 'Recoger con número, proceso completo'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-orange-200 -z-10"></div>
                )}
              </div>
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

      {/* 添加通知方式展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: '📱',
            title: '短信通知',
            desc: '订单状态实时短信提醒',
            enTitle: 'SMS Notification',
            enDesc: 'Real-time SMS notifications for order status',
            esTitle: 'Notificación SMS',
            esDesc: 'Notificaciones SMS en tiempo real del estado del pedido'
          },
          { 
            icon: '📺',
            title: '屏幕显示',
            desc: '大屏实时显示叫号信息',
            enTitle: 'Screen Display',
            enDesc: 'Large screen real-time number display',
            esTitle: 'Pantalla de Visualización',
            esDesc: 'Pantalla grande en tiempo real de números'
          },
          { 
            icon: '🔊',
            title: '语音播报',
            desc: '清晰语音提示顾客取餐',
            enTitle: 'Voice Broadcast',
            enDesc: 'Clear voice prompts for customer pickup',
            esTitle: 'Transmisión de Voz',
            esDesc: 'Indicaciones de voz claras para la recogida de clientes'
          }
        ].map((item) => (
          <div key={item.title} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="font-semibold text-gray-800 mb-2 text-lg">
              {params.locale === 'zh' ? item.title : 
               params.locale === 'en' ? item.enTitle : item.esTitle}
            </h4>
            <p className="text-gray-600">
              {params.locale === 'zh' ? item.desc : 
               params.locale === 'en' ? item.enDesc : item.esDesc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}


