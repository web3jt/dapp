'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";
import { useWallet, ConnectModal } from '@suiet/wallet-kit';
import { atomSuiWallet, atomShowSuiConnectModal } from '@/store/store';


// export: SUI state provider
export function SuiStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [showSuiConnectModal, setShowSuiConnectModal] = useAtom(atomShowSuiConnectModal);

  const wallet = useWallet();
  const [, setWallet] = useAtom(atomSuiWallet);
  useEffect(() => setWallet(wallet), [wallet, wallet?.address, setWallet]);

  return (
    <>
      <ConnectModal
        open={showSuiConnectModal}
        onOpenChange={(open) => setShowSuiConnectModal(open)}
      />

      {children}
    </>
  )
}
