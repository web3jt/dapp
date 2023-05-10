'use client';

import {
  ConnectButton,
} from '@suiet/wallet-kit';

export default async function Page() {
  return (
    <>
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <ConnectButton>Connect Wallet</ConnectButton>
      </div>
    </>
  )
}
