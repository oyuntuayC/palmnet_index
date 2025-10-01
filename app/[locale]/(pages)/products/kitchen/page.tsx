import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '后厨KDS系统 - PalmNet',
    en: 'Kitchen Display System - PalmNet', 
    es: 'Sistema de Pantalla de Cocina - PalmNet'
  }
  
  const descriptions = {
    zh: '订单自动同步至后厨显示屏，优化分单流程，加快出餐速度',
    en: 'Orders automatically sync to kitchen display screens, optimizing order distribution and speeding up food preparation',
    es: 'Los pedidos se sincronizan automáticamente con las pantallas de cocina, optimizando la distribución de pedidos y acelerando la preparación de alimentos'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }, { locale: 'es' }]
}

export default function KitchenPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '后厨KDS系统',
      subtitle: '智能后厨，高效出餐',
      description: '订单自动同步至后厨显示屏，优化分单流程，加快出餐速度。',
      features: [
        {
          title: '实时订单同步',
          description: '前台点餐信息秒级传输至后厨KDS。'
        },
        {
          title: '智能分单配单',
          description: '自动分配菜品至不同工作区，提升协作效率。'
        },
        {
          title: '出餐状态跟踪',
          description: '显示每道菜品制作进度，便于管理。'
        },
        {
          title: '支持多终端显示',
          description: '后厨各岗位均可独立查看订单。'
        },
        {
          title: '异常提醒机制',
          description: '缺货、延时等情况自动提醒，减少出错。'
        },
        {
          title: '数据统计分析',
          description: '自动汇总出餐数据，助力后厨管理优化。'
        }
      ]
    },
    en: {
      title: 'Kitchen Display System',
      subtitle: 'Smart Kitchen, Efficient Service',
      description: 'Orders automatically sync to kitchen display screens, optimizing order distribution and speeding up food preparation.',
      features: [
        {
          title: 'Real-time Order Synchronization',
          description: 'Front desk ordering information transmitted to kitchen KDS in seconds.'
        },
        {
          title: 'Intelligent Order Distribution',
          description: 'Automatically assigns dishes to different workstations, improving collaboration efficiency.'
        },
        {
          title: 'Order Status Tracking',
          description: 'Displays preparation progress for each dish, facilitating management.'
        },
        {
          title: 'Multi-terminal Display Support',
          description: 'All kitchen positions can independently view orders.'
        },
        {
          title: 'Exception Alert Mechanism',
          description: 'Automatically alerts for out-of-stock, delays, etc., reducing errors.'
        },
        {
          title: 'Data Statistical Analysis',
          description: 'Automatically summarizes preparation data, aiding kitchen management optimization.'
        }
      ]
    },
    es: {
      title: 'Sistema de Pantalla de Cocina',
      subtitle: 'Cocina Inteligente, Servicio Eficiente',
      description: 'Los pedidos se sincronizan automáticamente con las pantallas de cocina, optimizando la distribución de pedidos y acelerando la preparación de alimentos.',
      features: [
        {
          title: 'Sincronización de Pedidos en Tiempo Real',
          description: 'Información de pedidos del mostrador frontal transmitida al KDS de cocina en segundos.'
        },
        {
          title: 'Distribución Inteligente de Pedidos',
          description: 'Asigna automáticamente platos a diferentes estaciones de trabajo, mejorando la eficiencia de colaboración.'
        },
        {
          title: 'Seguimiento del Estado del Pedido',
          description: 'Muestra el progreso de preparación de cada plato, facilitando la gestión.'
        },
        {
          title: 'Soporte de Visualización Multi-terminal',
          description: 'Todas las posiciones de cocina pueden ver pedidos de forma independiente.'
        },
        {
          title: 'Mecanismo de Alerta de Excepciones',
          description: 'Alertas automáticas por agotamiento de existencias, retrasos, etc., reduciendo errores.'
        },
        {
          title: 'Análisis Estadístico de Datos',
          description: 'Resume automáticamente los datos de preparación, ayudando a optimizar la gestión de cocina.'
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
              <div className="bg-teal-100 text-teal-600 rounded-full p-2 mr-3">
                <span className="font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            <p className="text-gray-600 pl-11">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* 添加KDS工作流程展示 */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 mb-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? '智能后厨工作流程' : 
             params.locale === 'en' ? 'Smart Kitchen Workflow' : 
             'Flujo de Trabajo de Cocina Inteligente'}
          </h3>
          <p className="text-gray-600">
            {params.locale === 'zh' ? '从接单到出餐，全程智能化管理' : 
             params.locale === 'en' ? 'Intelligent management from order receipt to meal service' : 
             'Gestión inteligente desde la recepción del pedido hasta el servicio de comidas'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { 
              step: '1',
              title: '订单接收',
              desc: '前台订单自动推送至后厨',
              enTitle: 'Order Receipt',
              enDesc: 'Front desk orders automatically pushed to kitchen',
              esTitle: 'Recepción de Pedidos',
              esDesc: 'Pedidos del mostrador enviados automáticamente a cocina'
            },
            { 
              step: '2',
              title: '智能分单',
              desc: '按菜品类型分配至不同工位',
              enTitle: 'Smart Distribution',
              enDesc: 'Assign to different stations by dish type',
              esTitle: 'Distribución Inteligente',
              esDesc: 'Asignar a diferentes estaciones por tipo de plato'
            },
            { 
              step: '3',
              title: '进度跟踪',
              desc: '实时显示每道菜品制作状态',
              enTitle: 'Progress Tracking',
              enDesc: 'Real-time display of each dish preparation status',
              esTitle: 'Seguimiento de Progreso',
              esDesc: 'Visualización en tiempo real del estado de preparación de cada plato'
            },
            { 
              step: '4',
              title: '出餐完成',
              desc: '菜品完成后自动通知前台',
              enTitle: 'Meal Completion',
              enDesc: 'Automatically notify front desk when dishes are ready',
              esTitle: 'Finalización de Comida',
              esDesc: 'Notificar automáticamente al mostrador cuando los platos estén listos'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="relative">
                <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                {item.step !== '4' && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-teal-200 -z-10"></div>
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

      {/* 添加后厨工位展示 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { 
            icon: '👨‍🍳',
            title: '热菜工位',
            desc: '负责热菜制作与装盘',
            enTitle: 'Hot Station',
            enDesc: 'Responsible for hot dish preparation and plating',
            esTitle: 'Estación Caliente',
            esDesc: 'Responsable de la preparación y emplatado de platos calientes'
          },
          { 
            icon: '🥗',
            title: '冷菜工位',
            desc: '负责冷盘与沙拉制作',
            enTitle: 'Cold Station',
            enDesc: 'Responsible for cold dishes and salad preparation',
            esTitle: 'Estación Fría',
            esDesc: 'Responsable de platos fríos y preparación de ensaladas'
          },
          { 
            icon: '🍹',
            title: '饮品工位',
            desc: '负责饮料与酒水调制',
            enTitle: 'Beverage Station',
            enDesc: 'Responsible for drink and beverage preparation',
            esTitle: 'Estación de Bebidas',
            esDesc: 'Responsable de la preparación de bebidas'
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

      {/* 添加优势展示 */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {params.locale === 'zh' ? 'KDS系统核心优势' : 
             params.locale === 'en' ? 'KDS System Core Advantages' : 
             'Ventajas Principales del Sistema KDS'}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
              {params.locale === 'zh' ? '📈 效率提升' : 
               params.locale === 'en' ? '📈 Efficiency Improvement' : 
               '📈 Mejora de Eficiencia'}
            </h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '出餐速度提升30%以上' : 
                   params.locale === 'en' ? 'Food preparation speed increased by over 30%' : 
                   'Velocidad de preparación de alimentos aumentada en más del 30%'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '订单错误率降低80%' : 
                   params.locale === 'en' ? 'Order error rate reduced by 80%' : 
                   'Tasa de error de pedidos reducida en un 80%'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '沟通时间减少50%' : 
                   params.locale === 'en' ? 'Communication time reduced by 50%' : 
                   'Tiempo de comunicación reducido en un 50%'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-4 text-lg">
              {params.locale === 'zh' ? '🎯 精准管理' : 
               params.locale === 'en' ? '🎯 Precise Management' : 
               '🎯 Gestión Precisa'}
            </h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '实时掌握每道菜品进度' : 
                   params.locale === 'en' ? 'Real-time tracking of each dish progress' : 
                   'Seguimiento en tiempo real del progreso de cada plato'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '智能预警异常情况' : 
                   params.locale === 'en' ? 'Intelligent alert for abnormal situations' : 
                   'Alerta inteligente para situaciones anormales'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>
                  {params.locale === 'zh' ? '数据驱动运营优化' : 
                   params.locale === 'en' ? 'Data-driven operation optimization' : 
                   'Optimización de operaciones impulsada por datos'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


