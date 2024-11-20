import { ChainChecker, ChainSelect } from '@/components/chain-select'
import { ConnectWalletMenu } from '@/components/wallet'
import Link from 'next/link'
import { ReactNode } from 'react'
import { ThemeProvider } from './theme-provider'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from './ui/dialog'

export function AppLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen">
        <AppHeader links={links} />
        <main className="flex-grow container mx-auto p-4">
          <ChainChecker>
            <div />
            {/*  <AccountChecker />*/}
          </ChainChecker>

          {children}
        </main>
        <AppFooter />
      </div>
    </ThemeProvider>
  )
}

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const { pathname } = { pathname: 'foo' } // useLocation()

  return (
    <header className="px-4 py-2 bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link className="text-xl hover:text-gray-500 dark:hover:text-white" href="/">
            <span>Placeholder</span>
          </Link>
          <ul className="flex gap-2 flex-nowrap">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link className={pathname.startsWith(path) ? 'text-gray-500 dark:text-white' : ''} href={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <ConnectWalletMenu>Connect Wallet</ConnectWalletMenu>
          <ChainSelect />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="text-center p-2 bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
      Generated by{' '}
      <a
        className="link hover:text-gray-500 dark:hover:text-white"
        href="https://github.com/solana-developers/create-solana-dapp"
        target="_blank"
        rel="noopener noreferrer"
      >
        create-solana-dapp
      </a>
    </footer>
  )
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
}) {
  return (
    <div className="flex flex-row justify-center py-[64px]">
      <div className="text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  )
}

export function AppModal({
  children,
  title,
  disabled,
  description,
  onOpenChange,
  open,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode
  title: string
  description: string
  disabled?: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
  submit?: () => void
  submitDisabled?: boolean
  submitLabel?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>{title}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
        <DialogFooter>
          {submit ? (
            <Button variant="default" onClick={submit} disabled={submitDisabled}>
              {submitLabel || 'Save'}
            </Button>
          ) : null}
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
