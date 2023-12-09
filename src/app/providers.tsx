'use client';

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";

import { Provider as AtomProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { EvmProviders } from '@/providers/evm';
import { ModalsProvider } from '@/providers/modals';
import store from '@/store/store';

export function Providers({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AtomProvider store={store}>
      <NextUIProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <EvmProviders>
            <ModalsProvider>
              {children}
            </ModalsProvider>
          </EvmProviders>
        </ThemeProvider>
      </NextUIProvider>
    </AtomProvider>
  )
}
