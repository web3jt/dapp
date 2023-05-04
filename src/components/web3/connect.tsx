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
  atomWeb3Connecting,
  atomWeb3Network,
} from '@/store/store';

export default function Web3Connect({
  children,
}: {
  children?: React.ReactNode
}) {
  const [web3Connecting] = useAtom(atomWeb3Connecting);
  const [web3Network] = useAtom(atomWeb3Network);

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
              <TicketIcon className={clsx(
                web3Connecting ? 'animate-bounce' : '',
                "-ml-0.5 h-5 w-5",
              )} aria-hidden="true" />
              {web3Connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          )
        }

        if (web3Network?.chain?.unsupported) {
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
              <ArrowsRightLeftIcon className={clsx(
                "-ml-0.5 h-5 w-5",
              )} aria-hidden="true" />

              <span>
                Wrong Network
              </span>

              <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
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
