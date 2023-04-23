'use client';

import { ThemeProvider } from 'next-themes';
import { Web3Providers } from '@/providers/web3';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Web3Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
      >
        {children}
      </ThemeProvider>
    </Web3Providers>
  )
}
