'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";

import { useWallet } from '@suiet/wallet-kit';

import {
  atomSuiWallet,
} from '@/store/store';

// export: SUI state provider
export function SuiStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const wallet = useWallet();
  const [, setWallet] = useAtom(atomSuiWallet);
  useEffect(() => setWallet(wallet), [wallet, wallet?.address, setWallet]);

  return (
    <>
      {children}
    </>
  )
}
