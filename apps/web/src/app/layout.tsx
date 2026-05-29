import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import '@/styles/globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MathQuest — Learn Math Like a Game',
    template: '%s | MathQuest',
  },
  description: 'Adaptive math learning for kids aged 5–18. Learn at your own pace, earn rewards, and grow stronger every day.',
  keywords: ['math', 'learning', 'kids', 'adaptive', 'educational', 'game'],
  authors: [{ name: 'MathQuest' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366F1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  )
}
