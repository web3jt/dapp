'use client';

import { useEffect } from "react";
import { useAccount, useEnsName } from "wagmi";
import useStore from "@/store/store";

// export: state provider
export function StateProvider({
  children
}: {
  children: React.ReactNode
}) {
  console.log('StateProvider');

  const updateAddress = useStore.use.updateAddress();

  // address, connect
  const { address, isConnecting, isDisconnected } = useAccount({
    onDisconnect() {
      console.log('Disconnected')
    },
  });

  useEffect(() => {
    updateAddress(address);
    console.log(address);
  }, [
    address
  ]);

  return (
    <>
      {children}
    </>
  )
}
