// server component (no client directive to allow generateStaticParams)
import Link from 'next/link'
import { getTranslations, getMessages } from 'next-intl/server'

export default async function CareersPage({ params }: { params: { locale: 'zh' | 'en' | 'es' } }): Promise<React.ReactElement> {
  const locale = params.locale
  const t = await getTranslations({ locale, namespace: 'careers' })
  // Read array content from messages for the current locale
  const messages = await getMessages({ locale }) as any
  const whoWeSeekItems: string[] = (messages?.careers?.whoWeSeek?.items ?? []) as string[]
  const vision = messages?.careers?.whyUnique?.vision
  const mission = messages?.careers?.whyUnique?.mission

  return (
    <main>
      {/* Banner */}
      <section className="relative bg-cover bg-center min-h-[60vh]" style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}>
        <div className="container mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center text-white py-16 md:py-24">
          <h1 className="font-inter text-4xl md:text-6xl mb-4 max-w-4xl mx-auto">{t('banner.title')}</h1>
          <p className="font-montserrat text-base md:text-xl mb-8 max-w-2xl mx-auto">{t('banner.subtitle')}</p>
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Link href={`/${locale}/jobs`} className="btn btn-round">{t('banner.viewJobs')}</Link>
            <a href="#about" className="btn btn-outline btn-round">{t('banner.learnMore')}</a>
          </div>
        </div>
      </section>

      {/* Who we seek */}
      <section className="container mx-auto py-14 md:py-16">
        <h2 className="text-2xl md:text-3xl font-inter mb-6 text-center">{t('whoWeSeek.title')}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch [list-style:none] p-0 m-0 max-w-6xl mx-auto">
          {whoWeSeekItems.map((it: string, idx: number) => {
            const backgroundImages = [
              'url(/images/careers/feature-1.png)',
              'url(/images/careers/feature-2.png)',
              'url(/images/careers/feature-3.png)'
            ]
            return (
              <li key={idx} className="h-full min-h-[200px] p-6 border border-gray-100 rounded shadow-sm bg-white text-center flex items-center justify-center relative overflow-hidden group">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ backgroundImage: backgroundImages[idx] }}
                />
                <span className="max-w-[28ch] relative z-10 font-medium">{it}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Why unique */}
      <section id="about" className="bg-gray-50">
        <div className="container mx-auto py-14 md:py-16">
          <h2 className="text-2xl md:text-3xl font-inter mb-6 text-center">{t('whyUnique.title')}</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(/images/careers/feature-4.png)' }}></div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl font-inter mb-4 text-gray-900">{vision?.title}</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm lg:text-base">
                  {vision?.content}
                </div>
              </div>
            </div>
            
            {/* Mission */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{ backgroundImage: 'url(/images/careers/feature-5.png)' }}></div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl md:text-2xl font-inter mb-4 text-gray-900">{mission?.title}</h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm lg:text-base">
                  {mission?.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative bg-cover bg-center min-h-[50vh]" style={{ backgroundImage: 'url(/images/slide-bg-2.jpg)' }}>
        <div className="container mx-auto min-h-[50vh] flex flex-col items-center justify-center text-center text-white py-12 md:py-16">
          <h3 className="text-2xl md:text-3xl font-inter mb-4 max-w-3xl mx-auto">{t('ctaBanner.title')}</h3>
          <Link href={`/${locale}/jobs`} className="btn btn-round mt-2 md:mt-3">{t('ctaBanner.button')}</Link>
        </div>
      </section>
    </main>
  )
}


