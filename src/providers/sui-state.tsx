'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";

import { useWallet } from '@suiet/wallet-kit';

import {
  atomSuiAddress,
} from '@/store/store';


// export: SUI state provider
export function SuiStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const wallet = useWallet();

  const [, setSuiAddress] = useAtom(atomSuiAddress);

  useEffect(() => {
    console.log('wallet', wallet);
    setSuiAddress(wallet.address);
  }, [wallet, wallet?.address, setSuiAddress]);

  return (
    <>
      {children}
    </>
  )
}
