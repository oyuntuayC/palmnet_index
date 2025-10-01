import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '广告管理系统 - PalmNet',
    en: 'Advertising Management System - PalmNet', 
    es: 'Sistema de Gestión Publicitaria - PalmNet'
  }
  
  const descriptions = {
    zh: '门店可灵活管理广告内容，精准触达目标客户，提升营销效果',
    en: 'Stores can flexibly manage advertising content, accurately reach target customers, and improve marketing effectiveness',
    es: 'Las tiendas pueden gestionar flexiblemente el contenido publicitario, llegar con precisión a los clientes objetivo y mejorar la efectividad del marketing'
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

export default function SmartCashPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '广告管理系统',
      subtitle: '智能广告，精准触达',
      description: '门店可灵活管理广告内容，精准触达目标客户，提升营销效果。',
      features: [
        {
          title: '广告内容自定义',
          description: '支持图片、视频、文字等多种广告形式。'
        },
        {
          title: '定时投放策略',
          description: '可设定广告播放时间与频率，提升曝光率。'
        },
        {
          title: '精准客户推送',
          description: '根据点餐数据智能推荐广告内容。'
        },
        {
          title: '多终端同步展示',
          description: '收银台、点餐屏、平板等多设备同步显示。'
        },
        {
          title: '活动促销联动',
          description: '广告与门店促销活动无缝结合，提升转化率。'
        },
        {
          title: '数据分析反馈',
          description: '广告效果实时统计，优化营销策略。'
        }
      ]
    },
    en: {
      title: 'Advertising Management System',
      subtitle: 'Smart Advertising, Precise Reach',
      description: 'Stores can flexibly manage advertising content, accurately reach target customers, and improve marketing effectiveness.',
      features: [
        {
          title: 'Customizable Ad Content',
          description: 'Supports various ad formats including images, videos, and text.'
        },
        {
          title: 'Scheduled Delivery Strategy',
          description: 'Set ad playback time and frequency to increase exposure.'
        },
        {
          title: 'Precise Customer Targeting',
          description: 'Intelligently recommend ad content based on ordering data.'
        },
        {
          title: 'Multi-device Synchronized Display',
          description: 'Synchronized display across multiple devices like cashier counters, ordering screens, and tablets.'
        },
        {
          title: 'Promotion Activity Integration',
          description: 'Seamless integration of ads with store promotions to improve conversion rates.'
        },
        {
          title: 'Data Analysis Feedback',
          description: 'Real-time ad performance statistics to optimize marketing strategies.'
        }
      ]
    },
    es: {
      title: 'Sistema de Gestión Publicitaria',
      subtitle: 'Publicidad Inteligente, Alcance Preciso',
      description: 'Las tiendas pueden gestionar flexiblemente el contenido publicitario, llegar con precisión a los clientes objetivo y mejorar la efectividad del marketing.',
      features: [
        {
          title: 'Contenido Publicitario Personalizable',
          description: 'Admite varios formatos de publicidad incluyendo imágenes, videos y texto.'
        },
        {
          title: 'Estrategia de Entrega Programada',
          description: 'Establecer tiempo de reproducción y frecuencia de anuncios para aumentar la exposición.'
        },
        {
          title: 'Segmentación Precisa de Clientes',
          description: 'Recomienda inteligentemente contenido publicitario basado en datos de pedidos.'
        },
        {
          title: 'Visualización Sincronizada Multi-dispositivo',
          description: 'Visualización sincronizada en múltiples dispositivos como mostradores de caja, pantallas de pedidos y tabletas.'
        },
        {
          title: 'Integración de Actividades Promocionales',
          description: 'Integración perfecta de anuncios con promociones de tienda para mejorar las tasas de conversión.'
        },
        {
          title: 'Retroalimentación de Análisis de Datos',
          description: 'Estadísticas de rendimiento de anuncios en tiempo real para optimizar estrategias de marketing.'
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
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加广告投放流程展示 */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '智能广告投放流程' : 
             params.locale === 'en' ? 'Smart Ad Delivery Process' : 
             'Proceso de Entrega de Publicidad Inteligente'}
          </h3>
          <p className="text-gray-600">
            {params.locale === 'zh' ? '从创建到分析，全程智能化管理' : 
             params.locale === 'en' ? 'Intelligent management from creation to analysis' : 
             'Gestión inteligente desde la creación hasta el análisis'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              step: '1',
              title: '内容创建',
              desc: '制作多种形式广告内容',
              enTitle: 'Content Creation',
              enDesc: 'Create various forms of ad content',
              esTitle: 'Creación de Contenido',
              esDesc: 'Crear varias formas de contenido publicitario'
            },
            { 
              step: '2',
              title: '精准定位',
              desc: '基于数据分析选择受众',
              enTitle: 'Precise Targeting',
              enDesc: 'Select audience based on data analysis',
              esTitle: 'Segmentación Precisa',
              esDesc: 'Seleccionar audiencia basada en análisis de datos'
            },
            { 
              step: '3',
              title: '多端投放',
              desc: '同步推送到所有终端设备',
              enTitle: 'Multi-device Delivery',
              enDesc: 'Sync to all terminal devices',
              esTitle: 'Entrega Multi-dispositivo',
              esDesc: 'Sincronizar a todos los dispositivos terminales'
            },
            { 
              step: '4',
              title: '效果分析',
              desc: '实时统计广告投放效果',
              enTitle: 'Performance Analysis',
              enDesc: 'Real-time ad performance statistics',
              esTitle: 'Análisis de Rendimiento',
              esDesc: 'Estadísticas de rendimiento de anuncios en tiempo real'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-indigo-200 -z-10"></div>
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

      {/* 添加广告形式展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { 
            icon: '🖼️',
            title: '图片广告',
            desc: '高清图片展示促销信息',
            enTitle: 'Image Ads',
            enDesc: 'HD image display of promotion information',
            esTitle: 'Anuncios de Imagen',
            esDesc: 'Pantalla de imagen HD de información promocional'
          },
          { 
            icon: '🎬',
            title: '视频广告',
            desc: '动态视频吸引顾客注意',
            enTitle: 'Video Ads',
            enDesc: 'Dynamic videos attract customer attention',
            esTitle: 'Anuncios de Video',
            esDesc: 'Videos dinámicos atraen la atención del cliente'
          },
          { 
            icon: '📝',
            title: '文字广告',
            desc: '简洁文字传达核心信息',
            enTitle: 'Text Ads',
            enDesc: 'Concise text conveys core information',
            esTitle: 'Anuncios de Texto',
            esDesc: 'Texto conciso transmite información central'
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

      {/* 添加投放终端展示 */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '多终端广告展示' : 
             params.locale === 'en' ? 'Multi-device Ad Display' : 
             'Visualización de Anuncios Multi-dispositivo'}
          </h3>
          <p className="text-gray-600">
            {params.locale === 'zh' ? '广告内容同步推送到所有终端设备' : 
             params.locale === 'en' ? 'Ad content synchronized to all terminal devices' : 
             'Contenido publicitario sincronizado a todos los dispositivos terminales'}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              device: '收银台',
              icon: '💳',
              enDevice: 'Cashier',
              esDevice: 'Cajero'
            },
            { 
              device: '点餐屏', 
              icon: '📱',
              enDevice: 'Ordering Screen',
              esDevice: 'Pantalla de Pedidos'
            },
            { 
              device: '平板',
              icon: '💻',
              enDevice: 'Tablet',
              esDevice: 'Tableta'
            },
            { 
              device: '叫号屏',
              icon: '📺',
              enDevice: 'Calling Screen',
              esDevice: 'Pantalla de Llamada'
            }
          ].map((item) => (
            <div key={item.device} className="bg-white p-4 rounded-lg text-center shadow-sm">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-gray-800">
                {params.locale === 'zh' ? item.device : 
                 params.locale === 'en' ? item.enDevice : item.esDevice}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


