import { AppLayout } from '@/components/app-layout'
import { AppProviders } from '@/components/app-providers'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Placeholder',
  description: 'Generated by create-solana-dapp',
}

const links: { label: string; path: string }[] = [
  // More links...
  { label: 'Account', path: '/account' },
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppLayout links={links}>{children}</AppLayout>
        </AppProviders>
      </body>
    </html>
  )
}
