'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { useAtom } from 'jotai';
import {
  atomSuiAddress,
} from '@/store/store';


export default function Component() {
  const [address] = useAtom(atomSuiAddress);

  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div>
          XXX: {address}
        </div>
      </div>
    </div>
  )
}
