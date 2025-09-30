import ContactForm from '../../../../components/ContactForm'
import type { Metadata } from 'next'

// 页面独立的标题和描述
export function generateMetadata({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Metadata {
  const titles = {
    zh: '联系我们 - PalmNet',
    en: 'Contact Us - PalmNet', 
    es: 'Contáctanos - PalmNet'
  }
  
  const descriptions = {
    zh: '联系 PalmNet 获取餐厅解决方案支持',
    en: 'Contact PalmNet for restaurant solution support',
    es: 'Contacta PalmNet para soporte de soluciones de restaurante'
  }

  return {
    title: titles[params.locale],
    description: descriptions[params.locale],
  }
}

export default function ContactPage(): React.ReactElement {
  return <ContactForm />
}
