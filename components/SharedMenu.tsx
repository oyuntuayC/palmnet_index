"use client"
import React, { useState, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { Link, usePathname, useRouter } from '@/lib/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { LuSearch } from 'react-icons/lu'
import { HiBars3 } from 'react-icons/hi2'
import type { Locale } from '@/lib/locales'

const navLinkClass = 'type-body block px-6 py-2.5'
const mobileNavLinkClass = 'type-body-strong'
const headerActionIconClass = 'h-5 w-5 shrink-0'
const headerActionIconStroke = 2.25
const headerActionIconProps = {
  className: headerActionIconClass,
  strokeLinecap: 'square' as const,
  strokeLinejoin: 'miter' as const,
  strokeWidth: headerActionIconStroke,
}

const languages: Array<{ code: Locale; label: string }> = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' }
]

const productMenuItems = [
  { key: 'pos', href: '/products/pos', image: '/images/products/pos/hero.png', labelKey: 'products.pos.tabs.pos' },
  { key: 'ordering', href: '/products/online', image: '/images/home/product-ordering.png', labelKey: 'products.pos.tabs.ordering' },
  { key: 'kiosk', href: '/products/kiosk', image: '/images/home/product-pos.png', labelKey: 'products.pos.tabs.kiosk' },
  { key: 'kds', href: '/products/kitchen', image: '/images/home/product-kds.png', labelKey: 'products.pos.tabs.kds' },
  { key: 'ads', href: '/products/smartCash', image: '/images/home/product-ads.png', labelKey: 'products.pos.tabs.ads' },
  { key: 'marketing', href: '/products/pad', image: '/images/home/product-ordering.png', labelKey: 'products.pos.tabs.marketing' }
] as const

const solutionMenuItems = [
  { key: 'fastFood', href: '/solutions/fast-food', labelKey: 'nav.solutionTypes.fastFood' },
  { key: 'teaCoffee', href: '/solutions', labelKey: 'nav.solutionTypes.teaCoffee' },
  { key: 'buffet', href: '/solutions/buffet', labelKey: 'nav.solutionTypes.buffet' },
  { key: 'fullServiceDining', href: '/solutions/chinese-dining', labelKey: 'nav.solutionTypes.fullServiceDining' },
  { key: 'chainBrands', href: '/solutions/chain-brands', labelKey: 'nav.solutionTypes.chainBrands' }
] as const

interface SharedMenuProps {
  theme: 'light' | 'dark'
  open: boolean
  setOpen: (open: boolean) => void
  activeMegaMenu: 'about' | 'products' | 'solutions' | null
  setActiveMegaMenu: (menu: 'about' | 'products' | 'solutions' | null) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

export default function SharedMenu({
  theme,
  open,
  setOpen,
  activeMegaMenu,
  setActiveMegaMenu,
  searchOpen,
  setSearchOpen
}: SharedMenuProps): React.ReactElement {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()
  const productsRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const leaveTimer = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (menu: 'about' | 'products' | 'solutions') => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMegaMenu(menu)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveMegaMenu(null)
    }, 200)
  }

  useLayoutEffect(() => {
    let newHeight = 0
    if (activeMegaMenu === 'products' && productsRef.current) {
      newHeight = productsRef.current.scrollHeight
    } else if (activeMegaMenu === 'solutions' && solutionsRef.current) {
      newHeight = solutionsRef.current.scrollHeight
    } else if (activeMegaMenu === 'about' && aboutRef.current) {
      newHeight = aboutRef.current.scrollHeight
    }
    setContentHeight(newHeight)
  }, [activeMegaMenu])


  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white'
  const getHoverColor = () => theme === 'light' ? 'hover:text-primary' : 'hover:text-yellow-400'
  const getSubTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-300'
  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale !== locale) {
      router.push(pathname, { locale: nextLocale })
    }
  }

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-4">
        <ul className="group flex items-center gap-0 [list-style:none] m-0 p-0">
          {/* Products megamenu */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}} className={`${getTextColor()} ${navLinkClass} transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.products')}</a>
          </li>
          {/* Solutions megamenu */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}} className={`${getTextColor()} ${navLinkClass} transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.solutions')}</a>
          </li>
          {/* About megamenu (after Solutions) - hover to open, click to navigate */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
            <Link href="/about" className={`${getTextColor()} ${navLinkClass} transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'about' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.about')}</Link>
          </li>
        </ul>
        <div 
          onMouseEnter={() => leaveTimer.current && clearTimeout(leaveTimer.current)} 
          onMouseLeave={handleMouseLeave}
          className={`fixed left-0 top-[3.75rem] w-screen border-gray-200 bg-white text-gray-900 shadow-sm z-[1001] overflow-hidden transition-[opacity,transform] duration-200 ease-[var(--ease-out-strong)] md:top-[4rem] ${activeMegaMenu ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0 pointer-events-none'}`}
          style={{ height: `${contentHeight}px` }}
        >
          <div className="relative">
            {/* About Content */}
            <div
              ref={aboutRef}
              className={`absolute top-0 left-0 w-full transition-opacity duration-200 ${activeMegaMenu === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <ul className="group space-y-3">
                        {[
                          { key: 'about', name: t('nav.about'), href: '/about' },
                          { key: 'blogs', name: t('nav.blogs'), href: '/blogs' },
                          { key: 'careers', name: t('nav.careers'), href: '/careers' },
                        ].map((item, index) => (
                          <li
                            key={item.key}
                            className={`transition-opacity duration-200 ${activeMegaMenu === 'about' ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: activeMegaMenu === 'about' ? `${20 + index * 20}ms` : '0ms' }}
                          >
                            <Link href={item.href} className="type-body-strong block hover:text-primary transition-opacity duration-200 group-hover:opacity-50 hover:opacity-100">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Products Content */}
            <div
              ref={productsRef}
              className={`transition-opacity duration-200 ${activeMegaMenu === 'products' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto max-w-[1180px]">
                  <div className="grid grid-cols-6 gap-3">
                    {productMenuItems.map((item, index) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className={`group/product flex min-h-[150px] flex-col items-center justify-between rounded-xl border border-neutral-100 bg-white px-4 py-4 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-[opacity,transform,background-color,border-color] duration-200 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:border-neutral-200 hover:bg-[#f7f7f7] ${activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transitionDelay: activeMegaMenu === 'products' ? `${20 + index * 20}ms` : '0ms' }}
                      >
                        <span className="flex h-20 w-full items-center justify-center">
                          <Image src={item.image} alt="" width={112} height={82} className="max-h-20 w-auto object-contain transition-transform duration-200 group-hover/product:scale-[1.03]" />
                        </span>
                        <span className="type-caption-strong mt-3 text-black">{t(item.labelKey)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Solutions Content */}
            <div
              ref={solutionsRef}
              className={`absolute top-0 left-0 w-full transition-opacity duration-200 ${activeMegaMenu === 'solutions' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <ul className="group space-y-3">
                        {solutionMenuItems.map((item, index) => (
                          <li key={item.key} className={`transition-opacity duration-200 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? `${20 + index * 20}ms` : '0ms'}}>
                            <Link href={item.href} className="type-body-strong block hover:text-primary transition-opacity duration-200 group-hover:opacity-50 hover:opacity-100">
                              {t(item.labelKey)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      {/* Empty space - industrial solutions removed */}
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h5 className={`type-tagline mb-2 transition-opacity duration-200 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '80ms' : '0ms'}}>Tailored for Your Business</h5>
                      <p className={`type-caption mb-3 transition-opacity duration-200 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '100ms' : '0ms'}}>Custom solutions designed specifically for European restaurant operations, from small cafes to large chains.</p>
                      <a href="#solutions" className={`btn btn-small btn-round transition-opacity duration-200 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '120ms' : '0ms'}}>Explore Solutions</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right actions */}
      <div className="flex items-center gap-2">
        <div>
          <a href="#" onClick={(e)=>{e.preventDefault(); setSearchOpen(true)}} className="inline-flex items-center justify-center w-9 h-9 rounded"><LuSearch {...headerActionIconProps} /></a>
          {searchOpen && (
            <div className="fixed inset-0 z-[1100]">
              <div className="absolute inset-0 bg-black/50" onClick={()=>setSearchOpen(false)}></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white text-gray-900 p-4 rounded shadow-sm">
                <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
                  <input type="search" placeholder={t('nav.searchPlaceholder')} className="type-caption flex-1 border border-gray-200 rounded px-3 py-2" />
                  <button type="submit" className="btn">Go</button>
                </form>
                <button className="type-caption absolute right-3 top-3" onClick={()=>setSearchOpen(false)}>✕</button>
              </div>
            </div>
          )}
        </div>
        <select
          aria-label="Language"
          value={locale}
          onChange={(event) => switchLocale(event.target.value as Locale)}
          className={`type-body hidden h-10 rounded-full border px-3 outline-none transition md:block ${
            theme === 'light'
              ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-500'
              : 'border-white/30 bg-black text-white hover:border-white'
          }`}
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
        <Link
          href="/contact"
          className={`type-body hidden h-10 items-center justify-center rounded-full px-5 transition md:inline-flex ${
            theme === 'light'
              ? 'bg-black text-white hover:bg-black/80'
              : 'bg-white text-black hover:bg-white/80'
          }`}
        >
          {t('footer.contact')}
        </Link>
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button type="button" className="rounded px-3 py-2" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            <HiBars3 className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </>
  )
}

export function MobileMenu({
  theme,
  open,
  setOpen,
  activeMegaMenu,
  setActiveMegaMenu,
}: Omit<SharedMenuProps, 'searchOpen' | 'setSearchOpen'>): React.ReactElement {
  const t = useTranslations()
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white'
  const getHoverColor = () => theme === 'light' ? 'hover:text-primary' : 'hover:text-yellow-400'
  const getSubTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-300'
  const getMenuBg = () => theme === 'light' ? 'bg-white/90 text-gray-900' : 'bg-black/50 text-white'
  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale !== locale) {
      router.push(pathname, { locale: nextLocale })
    }
  }

  return (
    <div className={`${open ? 'visible' : 'invisible'} fixed inset-0 z-40 md:hidden`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 top-[3.75rem] bg-black/40 transition-opacity duration-200 md:top-[4rem] ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={()=>setOpen(false)}
      />
      {/* Menu */}
      <div className={`${open ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-[220ms] ease-[var(--ease-out-strong)] absolute top-[3.75rem] right-0 h-[calc(100vh-3.75rem)] w-[70vw] max-w-[260px] shadow-lg p-4 backdrop-blur-xl md:top-[4rem] md:h-[calc(100vh-4rem)] ${getMenuBg()} overflow-y-auto`}>
        <ul className="flex flex-col items-start gap-4 py-2 [list-style:none] m-0 p-0">
          {/* Products with mobile submenu */}
          <li className="w-full">
            <button
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}
              className={`flex items-center justify-between w-full py-2 transition-colors ${mobileNavLinkClass} ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.products')}
              <span className={`transform transition-transform ${activeMegaMenu === 'products' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'products' && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {productMenuItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-[92px] flex-col items-center justify-between rounded-lg border p-2 text-center transition-colors ${
                      theme === 'light'
                        ? 'border-neutral-200 bg-white text-gray-900 hover:bg-neutral-50'
                        : 'border-white/15 bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    <span className="flex h-11 items-center justify-center">
                      <Image src={item.image} alt="" width={66} height={46} className="max-h-11 w-auto object-contain" />
                    </span>
                    <span className="type-fine-print font-semibold">{t(item.labelKey)}</span>
                  </Link>
                ))}
              </div>
            )}
          </li>
          {/* Solutions with mobile submenu */}
          <li className="w-full">
            <button 
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}
              className={`flex items-center justify-between w-full py-2 transition-colors ${mobileNavLinkClass} ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.solutions')}
              <span className={`transform transition-transform ${activeMegaMenu === 'solutions' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'solutions' && (
              <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                {solutionMenuItems.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href} onClick={() => setOpen(false)} className={`type-caption block py-1 transition-colors ${getSubTextColor()} ${getHoverColor()}`}>
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* About with mobile submenu */}
          <li className="w-full">
            <button 
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'about' ? null : 'about')}
              className={`flex items-center justify-between w-full py-2 transition-colors ${mobileNavLinkClass} ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.about')}
              <span className={`transform transition-transform ${activeMegaMenu === 'about' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'about' && (
              <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                <li><Link href="/about" className={`type-caption block py-1 transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.about')}</Link></li>
                <li><Link href="/blogs" className={`type-caption block py-1 transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.blogs')}</Link></li>
                <li><Link href="/careers" className={`type-caption block py-1 transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.careers')}</Link></li>
              </ul>
            )}
          </li>
          <li className="w-full">
            <label className={`type-nav-link mb-2 block ${getSubTextColor()}`}>Language</label>
            <select
              aria-label="Language"
              value={locale}
              onChange={(event) => switchLocale(event.target.value as Locale)}
              className={`type-caption h-10 w-full rounded border px-3 outline-none ${
                theme === 'light'
                  ? 'border-gray-300 bg-white text-gray-900'
                  : 'border-white/30 bg-black text-white'
              }`}
            >
              {languages.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.label}
                </option>
              ))}
            </select>
          </li>
          <li className="w-full">
            <Link
              href="/contact"
              className={`type-caption-strong flex h-11 w-full items-center justify-center rounded-full transition ${
                theme === 'light'
                  ? 'bg-black text-white hover:bg-black/80'
                  : 'bg-white text-black hover:bg-white/80'
              }`}
            >
              {t('footer.contact')}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
