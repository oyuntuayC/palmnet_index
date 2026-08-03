"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Link, usePathname, useRouter } from '@/lib/navigation'
import { SlEnvolope, SlPhone, SlSocialDribbble, SlSocialFacebook, SlSocialTumblr, SlSocialTwitter, SlSocialYoutube } from 'react-icons/sl'
import { FaGlobe } from 'react-icons/fa'
import { useTranslations, useLocale } from 'next-intl'
import type { Locale } from '@/lib/locales'

type FooterNavItem = {
  label: string
  href?: string
}

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
  const footerColumns = [
    {
      title: t('footer.columns.products'),
      links: [
        { label: t('footer.links.posCheckout'), href: '/products/pos' },
        { label: t('footer.links.onlineOrdering'), href: '/products/online' },
        { label: t('footer.links.kioskDisplay'), href: '/products/kiosk' },
        { label: t('footer.links.queue'), href: '/products/queue' },
        { label: t('footer.links.waiterOrdering'), href: '/products/waiter' },
        { label: t('footer.links.kitchenDisplay'), href: '/products/kitchen' },
        { label: t('footer.links.smartAds'), href: '/products/smartCash' },
        { label: t('footer.links.padOrdering'), href: '/products/pad' }
      ]
    },
    {
      title: t('footer.columns.scenes'),
      links: [
        { label: t('footer.links.fastFood') },
        { label: t('footer.links.teaCoffee') },
        { label: t('footer.links.buffet') },
        { label: t('footer.links.bakery') },
        { label: t('footer.links.hotPot') },
        { label: t('footer.links.fullServiceDining') },
        { label: t('footer.links.delivery') },
        { label: t('footer.links.barBistro') }
      ]
    },
    {
      title: t('footer.columns.solutions'),
      links: [
        { label: t('footer.links.deliveryAggregation') },
        { label: t('footer.links.payment') },
        { label: t('footer.links.taxCompliance') },
        { label: t('footer.links.cashChanger') },
        { label: t('footer.links.kitchenEquipment') }
      ]
    },
    {
      title: t('footer.columns.more'),
      links: [
        { label: t('footer.links.blogs'), href: '/blogs' },
        { label: t('footer.links.about'), href: '/about' },
        { label: t('footer.links.careers'), href: '/careers' }
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-20 md:px-12 lg:px-[60px]">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_3.2fr]">
          <div className="max-w-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mb-6 w-[214px]" src="/images/logo-foot.svg" alt="PalmNet" />
            <p className="type-caption mb-8 text-white">{t('footer.about')}</p>

            <div className="type-caption mb-8 space-y-4 text-white">
              <a href="tel:+34675742627" className="flex items-center gap-4 hover:text-primary">
                <SlPhone className="icon-svg text-base" />
                <span>+34 675 742 627</span>
              </a>
              <a href="mailto:info@palmnet.co" className="flex items-center gap-4 hover:text-primary">
                <SlEnvolope className="icon-svg text-base" />
                <span>info@palmnet.co</span>
              </a>
            </div>

            <ul className="social_icons">
              <li><a href="#"><SlSocialFacebook className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialTwitter className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialTumblr className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialYoutube className="icon-svg"/></a></li>
              <li><a href="#"><SlSocialDribbble className="icon-svg"/></a></li>
            </ul>
            
            {/* Language Selector */}
            <div className="mt-6">
              <h6 className="type-caption mb-3 text-white/60">{t('footer.language')}</h6>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="type-caption flex items-center gap-2 px-3 py-2 text-white bg-transparent hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
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
                  <h3 className="type-body-strong text-white mb-4 text-left px-4" style={{ opacity: 0.6 }}>{t('footer.selectLanguage')}</h3>
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
                        <span className="type-caption-strong">{language.name}</span>
                        {language.code === locale && (
                          <span className="type-caption ml-auto text-primary">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 xl:grid-cols-[repeat(5,minmax(0,1fr))]">
            {footerColumns.map((column) => (
              <FooterNavColumn key={column.title} title={column.title} links={column.links} />
            ))}

            <div>
              <h6 className="type-caption-strong mb-3 text-white/60">{t('footer.columns.contact')}</h6>
              <Link href="/contact" className="type-dense-link inline-flex text-white hover:text-primary">
                {t('footer.links.contact')}
              </Link>
            </div>
          </div>
        </div>

        <div className="type-fine-print mt-20 border-t border-white/55 pt-4 text-center text-white">
          <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/cookies" className="hover:text-primary">{t('footer.legal.cookies')}</Link>
            <Link href="/privacy" className="hover:text-primary">{t('footer.legal.privacy')}</Link>
            <Link href="/terms" className="hover:text-primary">{t('footer.legal.terms')}</Link>
          </div>
          <p>© {new Date().getFullYear()} Palmnet Tech SL. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterNavColumn({ title, links }: { title: string; links: FooterNavItem[] }): React.ReactElement {
  return (
    <div>
      <h6 className="type-caption-strong mb-3 text-white/60">{title}</h6>
      <ul className="space-y-1">
        {links.map((item) => (
          <li key={item.label}>
            <FooterNavLink item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterNavLink({ item }: { item: FooterNavItem }): React.ReactElement {
  const className = "type-dense-link inline-flex text-white hover:text-primary"

  if (item.href?.startsWith('/')) {
    return (
      <Link href={item.href} className={className}>
        {item.label}
      </Link>
    )
  }

  return (
    <a href={item.href ?? '#'} className={className}>
      {item.label}
    </a>
  )
}
