"use client"
import React, { useEffect, useState } from 'react'
import { Link } from '@/lib/navigation'
import SharedMenu, { MobileMenu } from './SharedMenu'

type HeaderTheme = 'light' | 'dark'

type HeaderProps = {
  theme: HeaderTheme
}

export default function Header({ theme }: HeaderProps): React.ReactElement {
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

  const isLight = theme === 'light'
  const logoSrc = isLight ? '/images/logo-dark.svg' : '/images/logo-1.svg'
  const headerClassName = [
    'sticky top-0 left-0 right-0 z-50',
    isLight ? 'text-gray-900' : 'text-white',
    isLight
      ? scrolled ? 'backdrop-blur-md bg-white shadow-sm' : 'bg-white'
      : scrolled ? 'backdrop-blur-md bg-black/70 shadow-sm' : 'bg-black'
  ].join(' ')

  return (
    <>
      <header className={headerClassName}>
        <div className="container relative flex items-center justify-between md:gap-4">
          <div className="flex-shrink-0 py-2">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="block h-11 w-auto max-w-none md:h-12" src={logoSrc} alt="PalmNet" />
            </Link>
          </div>
          <nav className="flex items-center gap-2 md:flex-1 md:justify-between">
            <SharedMenu
              theme={theme}
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
        theme={theme}
        open={open}
        setOpen={setOpen}
        activeMegaMenu={activeMegaMenu}
        setActiveMegaMenu={setActiveMegaMenu}
      />
    </>
  )
}
