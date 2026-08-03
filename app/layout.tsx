import type { Metadata } from 'next'
import { Inter, Montserrat, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

// Configure Google Fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-sans-sc',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'EcoShop – Home',
  description: 'Multipurpose shop homepage built with Next.js',
  authors: [{ name: 'EcoShop' }],
  appleWebApp: {
    title: 'Palmnet',
  },
  openGraph: {
    title: 'EcoShop – Home',
    description: 'Multipurpose shop homepage built with Next.js',
    url: 'https://example.com/',
    siteName: 'EcoShop',
    images: [
      { url: '/images/slide-bg-2.jpg', width: 1200, height: 630, alt: 'EcoShop' }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoShop – Home',
    description: 'Multipurpose shop homepage built with Next.js',
    images: ['/images/slide-bg-2.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${montserrat.variable} ${inter.variable} ${notoSansSc.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

