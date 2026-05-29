import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import '@/styles/globals.css'
import { Celebrations } from '@/components/gamification/CelebrationsWrapper'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400','500','600','700','800','900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'MathQuest', template: '%s | MathQuest' },
  description: 'Adaptive math learning for kids aged 5–18.',
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  width: 'device-width', initialScale: 1, maximumScale: 1, themeColor: '#6366F1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={nunito.className}>
        {children}
        <Celebrations />
      </body>
    </html>
  )
}
