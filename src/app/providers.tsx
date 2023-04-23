'use client';

import { ThemeProvider } from 'next-themes';
import { Web3Providers } from '@/providers/web3';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
    >
      <Web3Providers>
        {children}
      </Web3Providers>
    </ThemeProvider>
  )
}
