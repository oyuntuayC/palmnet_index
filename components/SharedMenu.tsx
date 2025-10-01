"use client"
import React, { useState, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SlUser, SlBasketLoaded, SlMagnifier } from 'react-icons/sl'
import { FaBars } from 'react-icons/fa'

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
  const locale = useLocale() as 'zh' | 'en' | 'es'
  const productsRef = useRef<HTMLDivElement>(null)
  const solutionsRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const leaveTimer = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (menu: 'about' | 'products' | 'solutions') => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMegaMenu(menu)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setActiveMegaMenu(null)
      setHoveredProduct(null)
    }, 200)
  }

  const handleProductHover = (productKey: string) => {
    setHoveredProduct(productKey)
  }

  const handleProductLeave = () => {
    setHoveredProduct(null)
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

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-4">
        <ul className="group flex items-center gap-0 [list-style:none] m-0 p-0">
          {/* Products megamenu */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('products')} onMouseLeave={handleMouseLeave}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}} className={`${getTextColor()} block px-6 py-2 transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.products')}</a>
          </li>
          {/* Solutions megamenu */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('solutions')} onMouseLeave={handleMouseLeave}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}} className={`${getTextColor()} block px-6 py-2 transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.solutions')}</a>
          </li>
          {/* About megamenu (after Solutions) - hover to open, click to navigate */}
          <li className="relative" onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
            <Link href={`/${locale}/about`} className={`${getTextColor()} block px-6 py-2 transition-opacity duration-300 ${activeMegaMenu ? (activeMegaMenu === 'about' ? 'opacity-100' : 'opacity-50') : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.about')}</Link>
          </li>
          {/* Blogs moved under About menu */}
          <li><Link href={`/${locale}/contact`} className={`${getTextColor()} block px-6 py-2 transition-opacity duration-300 ${activeMegaMenu ? 'opacity-50' : 'group-hover:opacity-50 hover:opacity-100'}`}>{t('nav.support')}</Link></li>
        </ul>
        <div 
          onMouseEnter={() => leaveTimer.current && clearTimeout(leaveTimer.current)} 
          onMouseLeave={handleMouseLeave}
          className={`fixed left-0 top-11 w-screen border-gray-200 bg-white text-gray-900 shadow-sm z-[1001] transition-all duration-300 ease-out overflow-hidden`}
          style={{ height: `${contentHeight}px` }}
        >
          <div className="relative">
            {/* About Content */}
            <div
              ref={aboutRef}
              className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${activeMegaMenu === 'about' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <ul className="group space-y-3">
                        {[
                          { key: 'about', name: t('nav.about'), href: `/${locale}/about` },
                          { key: 'blogs', name: t('nav.blogs'), href: `/${locale}/blogs` },
                          { key: 'careers', name: t('nav.careers'), href: `/${locale}/careers` },
                        ].map((item, index) => (
                          <li
                            key={item.key}
                            className={`transition-all duration-300 ${activeMegaMenu === 'about' ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transitionDelay: activeMegaMenu === 'about' ? `${50 + index * 20}ms` : '0ms' }}
                          >
                            <Link href={item.href} className="block text-lg font-medium hover:text-primary transition-opacity duration-200 group-hover:opacity-50 hover:opacity-100">
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
              className={`transition-opacity duration-300 ${activeMegaMenu === 'products' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <ul className="group space-y-3">
                        {[
                          { key: 'pos', name: t('nav.productCategories.pos') },
                          { key: 'tableOrder', name: t('nav.productCategories.tableOrder') },
                          { key: 'online', name: t('nav.productCategories.online') },
                          { key: 'waiter', name: t('nav.productCategories.waiter') },
                          { key: 'kiosk', name: t('nav.productCategories.kiosk') },
                          { key: 'advertise', name: t('nav.productCategories.advertise') },
                          { key: 'queue', name: t('nav.productCategories.queue') },
                          { key: 'kitchen', name: t('nav.productCategories.kitchen') },
                          // { key: 'smartCash', name: t('nav.productCategories.smartCash') },
                          { key: 'pad', name: t('nav.productCategories.pad') }
                        ].map((item, index)=> (
                          <li 
                            key={item.key} 
                            className={`transition-all duration-300 ${activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-0'}`} 
                            style={{transitionDelay: activeMegaMenu === 'products' ? `${50 + index * 20}ms` : '0ms'}}
                            onMouseEnter={() => handleProductHover(item.key)}
                            onMouseLeave={handleProductLeave}
                          >
                            <Link href={`/${locale}/products/${item.key}`} className="block text-lg font-medium hover:text-primary transition-opacity duration-200 group-hover:opacity-50 hover:opacity-100">{item.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <div className={`transition-opacity duration-300 ${activeMegaMenu === 'products' && hoveredProduct ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'products' && hoveredProduct ? '100ms' : '0ms'}}>
                        {hoveredProduct && (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img 
                            src={`/images/products/${hoveredProduct}.png`} 
                            alt={`${hoveredProduct} product illustration`} 
                            className="w-full object-contain rounded transition-all duration-300"
                            style={{ height: '280px' }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h5 className={`font-inter text-lg md:text-xl mb-2 transition-opacity duration-300 ${activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'products' ? '150ms' : '0ms'}}>Complete Restaurant Solution</h5>
                      <p className={`text-sm md:text-base mb-3 transition-opacity duration-300 ${activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'products' ? '170ms' : '0ms'}}>Streamline your restaurant operations with our comprehensive digital platform designed for European restaurants.</p>
                      <Link href={`/${locale}/products`} className={`btn btn-small btn-round transition-opacity duration-300 ${activeMegaMenu === 'products' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'products' ? '190ms' : '0ms'}}>View All Products</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Solutions Content */}
            <div
              ref={solutionsRef}
              className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${activeMegaMenu === 'solutions' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            >
              <div className="p-5">
                <div className="container mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <ul className="group space-y-3">
                        {[
                          { key: 'fastFood', name: t('nav.solutionTypes.fastFood') },
                          { key: 'teaCoffee', name: t('nav.solutionTypes.teaCoffee') },
                          { key: 'buffet', name: t('nav.solutionTypes.buffet') },
                          { key: 'bakery', name: t('nav.solutionTypes.bakery') },
                          { key: 'hotPot', name: t('nav.solutionTypes.hotPot') },
                          { key: 'barbecue', name: t('nav.solutionTypes.barbecue') },
                          { key: 'fullServiceDining', name: t('nav.solutionTypes.fullServiceDining') },
                          { key: 'takeout', name: t('nav.solutionTypes.takeout') },
                          { key: 'delivery', name: t('nav.solutionTypes.delivery') },
                          { key: 'bar', name: t('nav.solutionTypes.bar') }
                        ].map((item, index)=> (
                          <li key={item.key} className={`transition-all duration-300 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? `${50 + index * 20}ms` : '0ms'}}>
                            <a href="#" className="block text-lg font-medium hover:text-primary transition-opacity duration-200 group-hover:opacity-50 hover:opacity-100">{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      {/* Empty space - industrial solutions removed */}
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h5 className={`font-inter text-lg md:text-xl mb-2 transition-opacity duration-300 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '150ms' : '0ms'}}>Tailored for Your Business</h5>
                      <p className={`text-sm md:text-base mb-3 transition-opacity duration-300 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '170ms' : '0ms'}}>Custom solutions designed specifically for European restaurant operations, from small cafes to large chains.</p>
                      <a href="#solutions" className={`btn btn-small btn-round transition-opacity duration-300 ${activeMegaMenu === 'solutions' ? 'opacity-100' : 'opacity-0'}`} style={{transitionDelay: activeMegaMenu === 'solutions' ? '190ms' : '0ms'}}>Explore Solutions</a>
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
        <ul className="hidden md:flex items-center gap-2 [list-style:none] m-0 p-0">
          <li><a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded"><SlUser className="icon-svg"/></a></li>
          <li><a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded"><SlBasketLoaded className="icon-svg"/></a></li>
        </ul>
        <div>
          <a href="#" onClick={(e)=>{e.preventDefault(); setSearchOpen(true)}} className="inline-flex items-center justify-center w-9 h-9 rounded"><SlMagnifier className="icon-svg"/></a>
          {searchOpen && (
            <div className="fixed inset-0 z-[1100]">
              <div className="absolute inset-0 bg-black/50" onClick={()=>setSearchOpen(false)}></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-white text-gray-900 p-4 rounded shadow-sm">
                <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
                  <input type="search" placeholder={t('nav.searchPlaceholder')} className="flex-1 border border-gray-200 rounded px-3 py-2" />
                  <button type="submit" className="btn">Go</button>
                </form>
                <button className="absolute right-3 top-3 text-sm" onClick={()=>setSearchOpen(false)}>✕</button>
              </div>
            </div>
          )}
        </div>
        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button type="button" className="rounded px-3 py-2" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            <FaBars className="w-5 h-5" />
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
  const locale = useLocale() as 'zh' | 'en' | 'es'

  const getTextColor = () => theme === 'light' ? 'text-gray-900' : 'text-white'
  const getHoverColor = () => theme === 'light' ? 'hover:text-primary' : 'hover:text-yellow-400'
  const getSubTextColor = () => theme === 'light' ? 'text-gray-600' : 'text-gray-300'
  const getMenuBg = () => theme === 'light' ? 'bg-white/90 text-gray-900' : 'bg-black/50 text-white'

  return (
    <div className={`${open ? 'visible' : 'invisible'} fixed inset-0 z-40 md:hidden`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 top-[2.76rem] bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={()=>setOpen(false)}
      />
      {/* Menu */}
      <div className={`${open ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 absolute top-[2.76rem] right-0 h-[calc(100vh-2rem)] w-[70vw] max-w-[260px] shadow-lg p-4 backdrop-blur-xl ${getMenuBg()} overflow-y-auto`}>
        <ul className="flex flex-col items-start gap-4 py-2 [list-style:none] m-0 p-0">
          {/* Products with mobile submenu */}
          <li className="w-full">
            <button
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}
              className={`flex items-center justify-between w-full py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.products')}
              <span className={`transform transition-transform ${activeMegaMenu === 'products' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'products' && (
              <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                <li><Link href={`/${locale}/products/pos`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.pos')}</Link></li>
                <li><Link href={`/${locale}/products/online`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.online')}</Link></li>
                <li><Link href={`/${locale}/products/kiosk`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.kiosk')}</Link></li>
                <li><Link href={`/${locale}/products/kitchen`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.kitchen')}</Link></li>
                <li><Link href={`/${locale}/products/queue`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.queue')}</Link></li>
                <li><Link href={`/${locale}/products/smartCash`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.smartCash')}</Link></li>
                <li><Link href={`/${locale}/products/pad`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.productCategories.pad')}</Link></li>
              </ul>
            )}
          </li>
          {/* Solutions with mobile submenu */}
          <li className="w-full">
            <button 
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}
              className={`flex items-center justify-between w-full py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.solutions')}
              <span className={`transform transition-transform ${activeMegaMenu === 'solutions' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'solutions' && (
              <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.fastFood')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.teaCoffee')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.buffet')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.bakery')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.hotPot')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.barbecue')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.fullServiceDining')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.takeout')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.delivery')}</a></li>
                <li><a href="#" className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.solutionTypes.bar')}</a></li>
              </ul>
            )}
          </li>
          {/* About with mobile submenu */}
          <li className="w-full">
            <button 
              onClick={()=>setActiveMegaMenu(activeMegaMenu === 'about' ? null : 'about')}
              className={`flex items-center justify-between w-full py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              {t('nav.about')}
              <span className={`transform transition-transform ${activeMegaMenu === 'about' ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {activeMegaMenu === 'about' && (
              <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                <li><Link href={`/${locale}/about`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.about')}</Link></li>
                <li><Link href={`/${locale}/blogs`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.blogs')}</Link></li>
                <li><Link href={`/${locale}/careers`} className={`block py-1 text-sm transition-colors ${getSubTextColor()} ${getHoverColor()}`}>{t('nav.careers')}</Link></li>
              </ul>
            )}
          </li>
          <li><Link href={`/${locale}/contact`} className={`block py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}>{t('nav.support')}</Link></li>
          {/* mobile account/cart inside menu */}
          <li><a href="#" aria-label="Account" className={`flex items-center gap-2 py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}><SlUser className="icon-svg"/> Account</a></li>
          <li><a href="#" aria-label="Cart" className={`flex items-center gap-2 py-1 transition-colors ${getTextColor()} ${getHoverColor()}`}><SlBasketLoaded className="icon-svg"/> Cart</a></li>
        </ul>
      </div>
    </div>
  )
}
