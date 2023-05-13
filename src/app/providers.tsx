'use client';

import { Provider as AtomProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { EvmProviders } from '@/providers/evm';
import { SuiProvider } from '@/providers/sui';
import { ModalsProvider } from '@/providers/modals';
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
            <ModalsProvider>
              {children}
            </ModalsProvider>
          </SuiProvider>
        </EvmProviders>
      </ThemeProvider>
    </AtomProvider>
  )
}
