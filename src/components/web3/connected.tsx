'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { atomWeb3Connected, atomWeb3Connecting } from '@/store/store';
import { TicketIcon, } from '@heroicons/react/20/solid';
import { SignalSlashIcon } from '@heroicons/react/24/outline';
import { useConnectModal } from '@rainbow-me/rainbowkit';



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
        <div className="text-center">
          <SignalSlashIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />

          <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
            Not connected
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by connecting a wallet.
          </p>

          <div className="mt-6">
            <button
              type="button"
              className={clsx(
                'relative inline-flex items-center gap-x-1.5',
                'rounded-md shadow-sm px-3 py-2',
                'bg-indigo-600 hover:bg-indigo-700',
                'dark:bg-indigo-700 dark:hover:bg-indigo-600',
                'text-sm font-semibold text-gray-200 hover:text-white',
                'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
              )}
              onClick={openConnectModal}
            >
              <TicketIcon className={clsx(connecting ? 'animate-bounce' : '', "-ml-0.5 mr-1.5 h-5 w-5")} aria-hidden="true" />
              {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
