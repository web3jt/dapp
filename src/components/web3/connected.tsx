'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { atomWeb3Connected, atomWeb3Connecting } from '@/store/store';
import { TicketIcon, } from '@heroicons/react/20/solid';
import { SignalSlashIcon } from '@heroicons/react/24/outline';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Connect from '@/components/web3/connect';


export default function Web3Connected({
  children,
}: {
  children: React.ReactNode
}) {
  const [connected] = useAtom(atomWeb3Connected);
  const [connecting] = useAtom(atomWeb3Connecting);
  const { openConnectModal } = useConnectModal();

  return (
    <>
      {connected ? (
        <>
          {children}
        </>
      ) : (
        <div className={clsx(
          "mx-auto max-w-7xl",
          "px-6 lg:px-8 py-24 sm:py-32",
          "text-center",
        )}>
          <SignalSlashIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />

          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            Not connected
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by connecting a wallet.
          </p>

          <div className="mt-6">
            <Connect />
          </div>
        </div>
      )}
    </>
  )
}
