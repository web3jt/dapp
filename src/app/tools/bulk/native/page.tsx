'use client';

import clsx from 'clsx';

import { useAtom } from 'jotai';
import { atomWeb3NativeSymbol } from '@/store/store';

export default function Page() {
  const [symbol] = useAtom(atomWeb3NativeSymbol);

  return (
    <>
      <div>
        {symbol}
      </div>
    </>
  )
}
