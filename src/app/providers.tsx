'use client';

import { Provider as AtomProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { Web3Providers } from '@/providers/web3';
import { StateProvider } from '@/providers/state';
import store from '@/store/store';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AtomProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Web3Providers>
          <StateProvider>
            {children}
          </StateProvider>
        </Web3Providers>
      </ThemeProvider>
    </AtomProvider>
  )
}
