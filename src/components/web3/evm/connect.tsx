'use client';

import clsx from 'clsx';
import { useAtom } from 'jotai';
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  TicketIcon,
  ArrowsRightLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/20/solid';

import {
  atomEvmConnecting,
  atomEvmNetwork,
} from '@/store/store';

export function EvmConnect({
  buttonText = 'Connect Wallet',
  children,
}: {
  buttonText?: string,
  children?: React.ReactNode
}) {
  const [evmConnecting] = useAtom(atomEvmConnecting);
  const [evmNetwork] = useAtom(atomEvmNetwork);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;
        if (!connected) {
          return (
            <button
              type="button"
              aria-label="Toggle dark mode"
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
              <TicketIcon
                className={clsx(
                  "-ml-0.5 h-5 w-5",
                  evmConnecting ? 'animate-bounce' : '',
                )}
                aria-hidden="true"
              />
              {evmConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )
        }

        if (evmNetwork?.chain?.unsupported) {
          return (
            <button
              type="button"
              aria-label="Toggle dark mode"
              className={clsx([
                'transition backdrop-blur',
                'relative inline-flex items-center gap-x-1.5',
                'rounded-md shadow-sm px-3 py-2',
                'bg-rose-600 hover:bg-rose-700',
                'dark:bg-rose-700 dark:hover:bg-rose-600',
                'text-sm font-semibold text-gray-200 hover:text-white',
                'focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-offset-2 focus-visible:outline-rose-500',
              ])}
              onClick={openChainModal}
            >
              <ArrowsRightLeftIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              <span>
                Wrong Network
              </span>
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          );
        }

        return (
          <>
            {children}
          </>
        );
      }}
    </ConnectButton.Custom>
  )
}
