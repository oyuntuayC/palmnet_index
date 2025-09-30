import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import InteractiveMap from '../../../../components/InteractiveMap'
import OfficeInfo from '../../../../components/OfficeInfo'

export async function generateMetadata() {
  const t = await getTranslations('about')
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  
  return (
    <div className="min-h-screen bg-white">
      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('map.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('map.subtitle')}
            </p>
          </div>
          
          <InteractiveMap />
        </div>
      </section>
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-inter text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Office Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <OfficeInfo />
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-inter text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {t('story.title')}
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-6">
                {t('story.content1')}
              </p>
              <p className="mb-6">
                {t('story.content2')}
              </p>
              <p>
                {t('story.content3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Distinct sections for contact customers vs apply careers */}
      <section id="contact-section" className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('cta.contactUs')}</h3>
            <p className="text-gray-600 mb-6">{t('cta.subtitle')}</p>
            <a href="../contact" className="btn btn-round">{t('cta.contactUs')}</a>
          </div>
        </div>
      </section>

      <section id="careers-section" className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('cta.viewCareers')}</h3>
            <p className="text-gray-600 mb-6">{t('cta.subtitle')}</p>
            <a href="../careers" className="btn btn-round">{t('cta.viewCareers')}</a>
          </div>
        </div>
      </section>
    </div>
  )
}
