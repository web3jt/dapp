'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";

import { useWallet } from '@suiet/wallet-kit';

import {
  atomSuiWallet
} from '@/store/store';



// export: SUI state provider
export function SuiStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const wallet = useWallet();

  const [, setSuiWallet] = useAtom(atomSuiWallet);

  useEffect(() => {
    console.log('wallet', wallet);
    setSuiWallet(wallet);
  }, [wallet, wallet?.status, setSuiWallet]);

  return (
    <>
      {children}
    </>
  )
}
