'use client';

import clsx from 'clsx';
import { SignalSlashIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { atomEvmConnected, atomEvmNetwork } from '@/store/store';
import { EvmConnect } from '@/components/web3/evm/connect';


export function EvmConnected({
  children,
}: {
  children: React.ReactNode
}) {
  const [connected] = useAtom(atomEvmConnected);
  const [web3Network] = useAtom(atomEvmNetwork);

  const switch2Chain = (chainId: number) => {
    console.log('switch2Chain', chainId);
  }

  // not connected
  if (!connected) return (
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
        <EvmConnect />
      </div>
    </div>
  )

  // unsupported chain
  if (web3Network?.chain?.unsupported) return (
    <div className={clsx(
      "mx-auto max-w-7xl",
      "px-6 lg:px-8 py-24 sm:py-32",
      "space-y-12",
    )}>
      <div className="mx-auto max-w-xl space-y-4 text-center">
        {/* <h1 className="text-base font-medium text-indigo-600">Thank you!</h1> */}
        <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Unsupported Chain
        </p>
        <p className="text-base text-gray-500">
          Chain #{web3Network?.chain?.id} is not in the list below:
        </p>
      </div>

      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {web3Network.chains?.map((chain) => (
          <li
            key={chain.id}
            className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
          >
            {/* Chain Header */}
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 dark:bg-gray-900 p-6">
              {/* Icon */}
              <div className={clsx(
                "h-12 w-12 flex items-center justify-center rounded-lg ring-1 ring-gray-900/10",
                "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500",
              )}>
                <CircleStackIcon
                  // src={client.imageUrl}
                  // alt={client.name}
                  className="h-8 w-8 flex-none rounded-lg  object-cover"
                />
              </div>

              {/* Chain Name */}
              <div className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
                {chain.name}
              </div>

              {/* BUTTON */}
              {/* <div className="relative ml-auto">
                <button className={clsx(
                  "-m-2.5 inline-flex items-center justify-center w-12 h-12 p-2.5 text-gray-400",
                  "group-hover:text-gray-500 dark:group-hover:text-gray-300",
                  // "group-hover:bg-gray-500",
                )}>
                  <span className="sr-only">
                    Open options
                  </span>
                  <ArrowsRightLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div> */}
            </div>

            {/* Cahin Info */}
            <dl className="-my-3 divide-y divide-gray-100 dark:divide-gray-900 px-6 py-4 text-sm leading-6">
              {/* Chain ID */}
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">
                  Chain ID
                </dt>
                <dd className="text-gray-700 dark:text-gray-300">
                  {chain.id}
                </dd>
              </div>

              {/* Symbol */}
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">
                  Symbol
                </dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {chain.nativeCurrency.symbol}
                  </div>
                </dd>
              </div>

              {/* Mainnet vs. Testnet */}
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">
                  Network
                </dt>
                <dd className="flex items-start gap-x-2">
                  <div
                    className={clsx(
                      chain.testnet
                        ? 'bg-red-50 dark:bg-red-200 text-red-700 dark:text-red-800 ring-red-600/10 dark:ring-red-600/30'
                        : 'bg-green-50 dark:bg-green-200 text-green-700 dark:text-green-800 ring-green-600/20 dark:ring-green-600/40',
                      'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {chain.testnet ? 'Testnet' : 'Mainnet'}
                  </div>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  )

  // connected
  return (
    <>
      {children}
    </>
  )
}
