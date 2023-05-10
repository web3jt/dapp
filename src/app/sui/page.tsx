'use client';

import { SuiConnect } from '@/components/web3/sui/connect';

export default async function Page() {
  return (
    <>
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <SuiConnect buttonText='Connect SUI Wallet' />
      </div>
    </>
  )
}
