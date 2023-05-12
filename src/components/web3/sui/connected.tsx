'use client';

import clsx from 'clsx';
import { SignalSlashIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { atomSuiConnected } from '@/store/store';
import { SuiConnect } from '@/components/web3/sui/connect';


export function SuiConnected({
  children,
}: {
  children: React.ReactNode
}) {
  const [connected] = useAtom(atomSuiConnected);

  // not connected
  if (!connected) return (
    <div className={clsx(
      "mx-auto max-w-7xl",
      "px-6 lg:px-8 py-24 sm:py-32",
      "text-center",
    )}>
      <SignalSlashIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />

      <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
        SUI Network Not Connected
      </h3>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get started by connecting a wallet.
      </p>

      <div className="mt-6">
        <SuiConnect buttonText="Connect to SUI" />
      </div>
    </div>
  )

  // connected
  return (
    <>
      {children}
    </>
  )
}
