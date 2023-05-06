'use client';

import { Provider as AtomProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { EvmProviders } from '@/providers/evm';
import { SuiProvider } from '@/providers/sui';
import store from '@/store/store';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AtomProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <EvmProviders>
          <SuiProvider>
            {children}
          </SuiProvider>
        </EvmProviders>
      </ThemeProvider>
    </AtomProvider>
  )
}
