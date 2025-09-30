"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { SlUser, SlBasketLoaded, SlMagnifier } from 'react-icons/sl'
import { FaBars } from 'react-icons/fa'

interface HeaderProps {
  theme?: 'light' | 'dark'
}

export default function Header({ theme = 'dark' }: HeaderProps): React.ReactElement {
  const t = useTranslations()
  const locale = useLocale() as 'zh' | 'en' | 'es'
  const [open, setOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<'products' | 'solutions' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Theme-based styling
  const getHeaderClasses = () => {
    const baseClasses = "fixed top-0 left-0 right-0 z-50"
    
    if (theme === 'light') {
      // Light theme: white background with dark text
      return `${baseClasses} text-gray-900 ${scrolled ? 'backdrop-blur-md bg-white/90 shadow-sm' : 'bg-white/80'}`
    } else {
      // Dark theme: transparent/black background with white text
      return `${baseClasses} text-white ${scrolled ? 'backdrop-blur-md bg-black/70 shadow-sm' : 'bg-transparent'}`
    }
  }

  return (
    <>
      <header className={getHeaderClasses()}>
        <div className="container relative flex items-center justify-between md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 py-2">
            <Link href={`/${locale}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-9 w-auto" src="/images/logo-1.svg" alt="EcoShop" />
            </Link>
          </div>
          {/* Nav + right actions */}
          <nav className="flex items-center gap-2 md:flex-1 md:justify-between">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-4">
              <ul className="flex items-center gap-4 [list-style:none] m-0 p-0">
                {/* Products megamenu */}
                <li className="relative" onMouseEnter={()=>setActiveMegaMenu('products')} onMouseLeave={()=>setActiveMegaMenu(null)}>
                  <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}}>{t('nav.products')}</a>
                </li>
                {/* Solutions megamenu */}
                <li className="relative" onMouseEnter={()=>setActiveMegaMenu('solutions')} onMouseLeave={()=>setActiveMegaMenu(null)}>
                  <a href="#" onClick={(e)=>{e.preventDefault(); setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}}>{t('nav.solutions')}</a>
                </li>
                <li><Link href={`/${locale}/blogs`}>{t('nav.blogs')}</Link></li>
                <li><Link href={`/${locale}/contact`}>{t('nav.support')}</Link></li>
              </ul>

              <div 
                className={`${activeMegaMenu ? 'block' : 'hidden'} fixed left-0 top-11 w-screen rounded border border-gray-200 bg-white text-gray-900 shadow-sm p-5 z-[1001]`}
                onMouseEnter={()=>setActiveMegaMenu(activeMegaMenu)} onMouseLeave={()=>setActiveMegaMenu(null)}
              >
                {/* Products Content */}
                <div className={`${activeMegaMenu === 'products' ? 'block' : 'hidden'}`}>
                  <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <h6 className="font-bold mb-2">Product Categories</h6>
                      <ul className="space-y-1">
                        {['POS Systems', 'Payment Solutions', 'Inventory Management', 'Customer Analytics', 'Mobile Apps', 'Hardware Accessories'].map((x)=> (
                          <li key={x}><a href="#" className="hover:text-primary">{x}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <h6 className="font-bold mb-2">FEATURED PRODUCTS</h6>
                      <ul className="space-y-3">
                        {[1,2,3].map(i => (
                          <li key={i} className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/product-${i}.jpg`} alt="..." className="w-12 h-12 object-cover rounded"/>
                            <div>
                              <div className="text-sm font-medium">PRODUCT {i}</div>
                              <div className="text-xs">★★★★★</div>
                              <div className="text-xs font-semibold">$299.00</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h5 className="font-inter text-lg md:text-xl mb-2">Complete Restaurant Solution</h5>
                      <p className="text-sm md:text-base mb-3">Streamline your restaurant operations with our comprehensive digital platform designed for European restaurants.</p>
                      <a href="#products" className="btn btn-small btn-round">View All Products</a>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Solutions Content */}
                <div className={`${activeMegaMenu === 'solutions' ? 'block' : 'hidden'}`}>
                  <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-3">
                      <h6 className="font-bold mb-2">Solution Types</h6>
                      <ul className="space-y-1">
                        {['Quick Service', 'Fine Dining', 'Cafes & Bakeries', 'Food Trucks', 'Chain Restaurants', 'Catering Services'].map((x)=> (
                          <li key={x}><a href="#" className="hover:text-primary">{x}</a></li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <h6 className="font-bold mb-2">INDUSTRY SOLUTIONS</h6>
                      <ul className="space-y-3">
                        {['Digital Ordering', 'Table Management', 'Kitchen Display', 'Staff Scheduling', 'Customer Loyalty', 'Analytics Dashboard'].map((x, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                              <span className="text-primary font-bold text-lg">{i+1}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium">{x}</div>
                              <div className="text-xs text-gray-600">Complete solution</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <h5 className="font-inter text-lg md:text-xl mb-2">Tailored for Your Business</h5>
                      <p className="text-sm md:text-base mb-3">Custom solutions designed specifically for European restaurant operations, from small cafes to large chains.</p>
                      <a href="#solutions" className="btn btn-small btn-round">Explore Solutions</a>
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
              <div className="ml-3"><Link href={locale === 'en' ? '/zh' : '/en'}>{locale === 'en' ? '中文' : 'EN'}</Link></div>
            </div>
          </nav>
        </div>
      </header>
      {/* Mobile collapsible menu (Rendered outside header to avoid stacking context issues) */}
      <div className={`${open ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 fixed inset-0 z-40 md:hidden`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" onClick={()=>setOpen(false)} />
        {/* Menu */}
        <div className={`${open ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 relative mx-auto mt-20 w-[calc(100vw-24px)] max-h-[calc(100vh-6rem)] overflow-auto rounded-xl shadow-lg p-4 backdrop-blur-xl ${theme === 'light' ? 'bg-white/90 text-gray-900' : 'bg-black/50 text-white'}`} id="nav-open-btn">
          <ul className="flex flex-col items-start gap-4 py-2 [list-style:none] m-0 p-0">
            {/* Products with mobile submenu */}
            <li className="w-full">
              <button 
                onClick={()=>setActiveMegaMenu(activeMegaMenu === 'products' ? null : 'products')}
                className={`flex items-center justify-between w-full py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}
              >
                {t('nav.products')}
                <span className={`transform transition-transform ${activeMegaMenu === 'products' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {activeMegaMenu === 'products' && (
                <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>POS Systems</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Payment Solutions</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Inventory Management</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Customer Analytics</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Mobile Apps</a></li>
                </ul>
              )}
            </li>
            {/* Solutions with mobile submenu */}
            <li className="w-full">
              <button 
                onClick={()=>setActiveMegaMenu(activeMegaMenu === 'solutions' ? null : 'solutions')}
                className={`flex items-center justify-between w-full py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}
              >
                {t('nav.solutions')}
                <span className={`transform transition-transform ${activeMegaMenu === 'solutions' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {activeMegaMenu === 'solutions' && (
                <ul className="ml-4 mt-2 space-y-2 [list-style:none]">
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Quick Service</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Fine Dining</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Cafes & Bakeries</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Food Trucks</a></li>
                  <li><a href="#" className={`block py-1 text-sm transition-colors ${theme === 'light' ? 'text-gray-600 hover:text-primary' : 'text-gray-300 hover:text-yellow-400'}`}>Chain Restaurants</a></li>
                </ul>
              )}
            </li>
            <li><Link href={`/${locale}/blogs`} className={`block py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}>{t('nav.blogs')}</Link></li>
            <li><Link href={`/${locale}#support`} className={`block py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}>{t('nav.support')}</Link></li>
            {/* mobile account/cart inside menu */}
            <li><a href="#" aria-label="Account" className={`flex items-center gap-2 py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}><SlUser className="icon-svg"/> Account</a></li>
            <li><a href="#" aria-label="Cart" className={`flex items-center gap-2 py-1 transition-colors ${theme === 'light' ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-yellow-400'}`}><SlBasketLoaded className="icon-svg"/> Cart</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

