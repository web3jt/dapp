'use client';

import { ThemeProvider } from 'next-themes';
import { Web3Providers } from '@/providers/web3';
import { StateProvider } from '@/providers/state';

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
        <StateProvider>
          {children}
        </StateProvider>
      </Web3Providers>
    </ThemeProvider>
  )
}
