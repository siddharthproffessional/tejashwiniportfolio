import type { Metadata, Viewport } from 'next'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource-variable/manrope'
import '@fontsource-variable/jetbrains-mono'
import './globals.css'
import { person } from '@/lib/content'

const description = `${person.name} — MBA in Finance (Middlesex University Dubai) and Electrical Engineer: financial modeling, model risk management and interactive 3D web simulations.`

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: `${person.name} — Finance, Risk & 3D Web Simulations`,
  description,
  openGraph: { title: person.name, description, type: 'profile' },
  twitter: { card: 'summary_large_image', title: person.name, description },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#06100C', colorScheme: 'dark' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-background">
          Skip to content
        </a>
        <div id="top" />
        {children}
      </body>
    </html>
  )
}
