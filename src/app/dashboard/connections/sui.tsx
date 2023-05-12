'use client';

import clsx from 'clsx';
import { useAtom } from "jotai";
import { PaperClipIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { useWallet } from '@suiet/wallet-kit';


import {
  atomSuiChainName,
  atomSuiChainId,
  atomSuiAddress,
  atomSuiAddressMask,
} from '@/store/store';

import { SuiConnected } from '@/components/web3/sui/connected';

export function SuiConnection() {
  const { disconnect } = useWallet();
  const [chainName] = useAtom(atomSuiChainName);
  const [chainId] = useAtom(atomSuiChainId);
  const [address] = useAtom(atomSuiAddress);
  const [addressMask] = useAtom(atomSuiAddressMask);

  return (
    <SuiConnected>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            {chainName} Connection
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Chain ID #{chainId}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100 dark:border-white/10">
          <dl className="divide-y divide-gray-100 dark:divide-white/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                SUI address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0 font-mono">
                {addressMask}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                SUI full address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0 font-mono">
                {address}
              </dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          aria-label="Connect Wallet"
          className={clsx(
            'relative inline-flex items-center gap-x-1.5',
            'rounded-md shadow-sm px-3 py-2',
            'bg-indigo-600 hover:bg-indigo-700',
            'dark:bg-indigo-700 dark:hover:bg-indigo-600',
            'text-sm font-semibold text-gray-200 hover:text-white',
            'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
          )}
          onClick={disconnect}
        >
          <NoSymbolIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          <span>
            Disconnect
          </span>
        </button>
      </div>
    </SuiConnected>
  )
}
