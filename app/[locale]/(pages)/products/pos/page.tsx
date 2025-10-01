import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '智能收银台 - PalmNet',
    en: 'Smart Cashier System - PalmNet', 
    es: 'Sistema de Caja Inteligente - PalmNet'
  }
  
  const descriptions = {
    zh: '一体化收银解决方案，提升门店运营效率，支持多种支付方式与智能数据分析',
    en: 'Integrated cashier solution that enhances store operational efficiency, supports multiple payment methods and intelligent data analysis',
    es: 'Solución de caja integrada que mejora la eficiencia operativa de la tienda, admite múltiples métodos de pago y análisis de datos inteligentes'
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

export default function POSPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): React.ReactElement {
  // 多语言内容配置
  const content = {
    zh: {
      title: '智能收银台',
      subtitle: '高效收银，智慧管理',
      description: '一体化收银解决方案，提升门店运营效率，支持多种支付方式与智能数据分析。',
      features: [
        {
          title: '多渠道支付接入',
          description: '支持现金、银行卡、移动支付等主流方式，满足顾客多样化需求。'
        },
        {
          title: '自动订单同步',
          description: '前台收银与后厨KDS系统实时联动，减少沟通误差，加快出餐速度。'
        },
        {
          title: '支持电子发票',
          description: '自动生成并发送电子发票，符合欧洲税务合规要求，提升财务管理效率。'
        },
        {
          title: '智能数据分析',
          description: '自动统计销售、客流、收银数据，帮助商家精准决策和优化运营。'
        },
        {
          title: '广告与促销管理',
          description: '收银界面可推送门店活动及广告，促进二次消费与会员转化。'
        },
        {
          title: '灵活权限设置',
          description: '支持多角色分级管理，保障数据安全，便于团队协作与门店管理。'
        }
      ]
    },
    en: {
      title: 'Smart Cashier System',
      subtitle: 'Efficient Checkout, Smart Management',
      description: 'Integrated cashier solution that enhances store operational efficiency, supports multiple payment methods and intelligent data analysis.',
      features: [
        {
          title: 'Multi-channel Payment Access',
          description: 'Supports cash, bank cards, mobile payments and other mainstream methods to meet diverse customer needs.'
        },
        {
          title: 'Automatic Order Synchronization',
          description: 'Real-time linkage between front desk cashier and back kitchen KDS system, reducing communication errors and speeding up meal delivery.'
        },
        {
          title: 'Electronic Invoice Support',
          description: 'Automatically generate and send electronic invoices, compliant with European tax requirements, improving financial management efficiency.'
        },
        {
          title: 'Intelligent Data Analysis',
          description: 'Automatically collect sales, customer flow, and cashier data to help merchants make precise decisions and optimize operations.'
        },
        {
          title: 'Advertising and Promotion Management',
          description: 'Cashier interface can push store activities and advertisements, promoting repeat purchases and member conversion.'
        },
        {
          title: 'Flexible Permission Settings',
          description: 'Supports multi-role hierarchical management, ensuring data security and facilitating team collaboration and store management.'
        }
      ]
    },
    es: {
      title: 'Sistema de Caja Inteligente',
      subtitle: 'Cobro Eficiente, Gestión Inteligente',
      description: 'Solución de caja integrada que mejora la eficiencia operativa de la tienda, admite múltiples métodos de pago y análisis de datos inteligentes.',
      features: [
        {
          title: 'Acceso a Pagos Multicanal',
          description: 'Soporta efectivo, tarjetas bancarias, pagos móviles y otros métodos principales para satisfacer las diversas necesidades de los clientes.'
        },
        {
          title: 'Sincronización Automática de Pedidos',
          description: 'Vinculación en tiempo real entre la caja del mostrador frontal y el sistema KDS de cocina, reduciendo errores de comunicación y acelerando la entrega de comidas.'
        },
        {
          title: 'Soporte de Factura Electrónica',
          description: 'Genera y envía automáticamente facturas electrónicas, cumpliendo con los requisitos fiscales europeos, mejorando la eficiencia de la gestión financiera.'
        },
        {
          title: 'Análisis de Datos Inteligente',
          description: 'Recopila automáticamente datos de ventas, flujo de clientes y caja para ayudar a los comerciantes a tomar decisiones precisas y optimizar operaciones.'
        },
        {
          title: 'Gestión de Publicidad y Promociones',
          description: 'La interfaz de caja puede mostrar actividades de la tienda y anuncios, promoviendo compras repetidas y conversión de miembros.'
        },
        {
          title: 'Configuración Flexible de Permisos',
          description: 'Admite gestión jerárquica de múltiples roles, garantizando la seguridad de los datos y facilitando la colaboración del equipo y la gestión de la tienda.'
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
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

