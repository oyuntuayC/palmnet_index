"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Link, usePathname, useRouter } from '@/lib/navigation'
import { SlSocialFacebook, SlSocialTwitter, SlSocialTumblr, SlSocialYoutube, SlSocialDribbble } from 'react-icons/sl'
import { FaGlobe } from 'react-icons/fa'
import { useTranslations, useLocale } from 'next-intl'
import type { Locale } from '@/lib/locales'

export default function Footer(): React.ReactElement {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside (ignore clicks inside modal content)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const clickedInsideTrigger = dropdownRef.current?.contains(target)
      const clickedInsideModal = modalRef.current?.contains(target)
      if (!clickedInsideTrigger && !clickedInsideModal) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mb-6" src="/images/logo-foot.svg" alt="PalmNet" />
            <p className="mb-6 text-sm">{t('footer.about')}</p>
            <ul className="social_icons">
              <li><a href="#"><SlSocialFacebook className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialTwitter className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialTumblr className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialYoutube className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialDribbble className="icon-svg"/></a></li>
            </ul>
            
            {/* Language Selector */}
            <div className="mt-6">
              <h6 style={{ fontSize: '14px', color: 'white', opacity: 0.6, marginBottom: '12px' }}>Language</h6>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-transparent hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                >
                  <FaGlobe className="text-sm" />
                  <span>{currentLanguage.name}</span>
                </button>
              </div>
            </div>

            {/* Language Modal */}
            {isLanguageDropdownOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center">
                {/* Modal Content */}
                <div ref={modalRef} className="relative bg-black/60 backdrop-blur-md rounded-lg shadow-2xl p-6 min-w-[280px]">
                  <h3 className="text-white text-lg font-medium mb-4 text-left px-4" style={{ opacity: 0.6 }}>Select Language</h3>
                  <div className="space-y-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        style={{
                          color: 'white'
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 text-left ${
                          language.code === locale 
                            ? 'opacity-60' 
                            : hoveredLanguage && hoveredLanguage === language.code
                            ? 'opacity-100'
                            : hoveredLanguage
                            ? 'opacity-50'
                            : 'opacity-100'
                        }`}
                        onClick={() => {
                          if (language.code !== locale) {
                            router.push(pathname, { locale: language.code })
                          }
                          setIsLanguageDropdownOpen(false)
                        }}
                        onMouseEnter={() => setHoveredLanguage(language.code)}
                        onMouseLeave={() => setHoveredLanguage(null)}
                      >
                        <span className="font-medium">{language.name}</span>
                        {language.code === locale && (
                          <span className="ml-auto text-primary text-sm">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <h6 style={{ fontSize: '14px', color: 'white', opacity: 0.6, marginBottom: '12px' }}>{t('nav.products')}</h6>
            <ul className="space-y-2">
              <li><Link href="/products/pos" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.pos')}</Link></li>
              <li><Link href="/products/online" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.online')}</Link></li>
              <li><Link href="/products/kiosk" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.kiosk')}</Link></li>
              <li><Link href="/products/kitchen" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.kitchen')}</Link></li>
              <li><Link href="/products/queue" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.queue')}</Link></li>
              <li><Link href="/products/smartCash" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.smartCash')}</Link></li>
              <li><Link href="/products/pad" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.productCategories.pad')}</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h6 style={{ fontSize: '14px', color: 'white', opacity: 0.6, marginBottom: '12px' }}>{t('nav.solutions')}</h6>
            <ul className="space-y-2">
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.fastFood')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.teaCoffee')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.buffet')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.bakery')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.hotPot')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.barbecue')}</a></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.solutionTypes.fullServiceDining')}</a></li>
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h6 style={{ fontSize: '14px', color: 'white', opacity: 0.6, marginBottom: '12px' }}>{t('nav.support')}</h6>
            <ul className="space-y-2 mb-6">
              <li><Link href="/blogs" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.blogs')}</Link></li>
              <li><Link href="/contact" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.support')}</Link></li>
              <li><Link href="/careers" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.careers')}</Link></li>
            </ul>
            
            <h6 style={{ fontSize: '14px', color: 'white', opacity: 0.6, marginBottom: '12px' }}>Company</h6>
            <ul className="space-y-2">
              <li><Link href="/about" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.about')}</Link></li>
              <li><a href="#" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">Partners</a></li>
              <li><Link href="/careers" style={{ color: 'white', fontSize: '13px' }} className="hover:text-primary">{t('nav.careers')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="rights">
        <div className="container">
          <p>© {new Date().getFullYear()} PalmNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
