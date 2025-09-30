"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import SharedMenu, { MobileMenu } from './SharedMenu'

export default function LightHeader(): React.ReactElement {
  const [open, setOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<'about' | 'products' | 'solutions' | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`sticky top-0 left-0 right-0 z-50 text-gray-900 ${scrolled ? 'backdrop-blur-md bg-white shadow-sm' : 'bg-white'}`}>
        <div className="container relative flex items-center justify-between md:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0 py-2">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-9 w-auto" src="/images/logo-dark.svg" alt="EcoShop" />
            </Link>
          </div>
          {/* Nav + right actions */}
          <nav className="flex items-center gap-2 md:flex-1 md:justify-between">
            <SharedMenu
              theme="light"
              open={open}
              setOpen={setOpen}
              activeMegaMenu={activeMegaMenu}
              setActiveMegaMenu={setActiveMegaMenu}
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
            />
          </nav>
        </div>
      </header>
      <MobileMenu
        theme="light"
        open={open}
        setOpen={setOpen}
        activeMegaMenu={activeMegaMenu}
        setActiveMegaMenu={setActiveMegaMenu}
      />
    </>
  )
}
