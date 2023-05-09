'use client';

import { useAtom } from 'jotai';
import { atomSuiAddress } from '@/store/store';

export default async function Page() {
  const [address] = useAtom(atomSuiAddress);

  return (
    <>
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div>
          XXX: {address}
        </div>
      </div>
    </>
  )
}
