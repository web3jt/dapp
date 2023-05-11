'use client';

import clsx from 'clsx';
import { atom, useAtom } from 'jotai';
import { ConnectModal } from '@suiet/wallet-kit';

import {
  TicketIcon,
} from '@heroicons/react/20/solid';

import {
  atomSuiConnected,
  atomSuiConnecting,
  atomShowSuiConnectModal,
  atomShowWeb3ConnectModal,
} from '@/store/store';


export function SuiConnect({
  className,
  unsupportedClassName,
  buttonText = 'Connect Wallet',
  children,
}: {
  className?: string,
  unsupportedClassName?: string,
  buttonText?: string,
  children?: React.ReactNode
}) {
  const [, setShowWeb3ConnectModal] = useAtom(atomShowWeb3ConnectModal);
  const [showConnectModal, setShowConnectModal] = useAtom(atomShowSuiConnectModal);

  const [connected] = useAtom(atomSuiConnected);
  const [connecting] = useAtom(atomSuiConnecting);

  const handleOpenConnectModal = () => {
    setShowWeb3ConnectModal(false);
    setShowConnectModal(true);
  }

  return (
    <>
      {connected ? (
        <>
          {children}
        </>
      ) : (
        <>
          <ConnectModal
            open={showConnectModal}
            onOpenChange={(open) => setShowConnectModal(open)}
          >
            <button
              type="button"
              aria-label="Toggle dark mode"
              className={className || clsx(
                'relative inline-flex items-center gap-x-1.5',
                'rounded-md shadow-sm px-3 py-2',
                'bg-indigo-600 hover:bg-indigo-700',
                'dark:bg-indigo-700 dark:hover:bg-indigo-600',
                'text-sm font-semibold text-gray-200 hover:text-white',
                'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
              )}
              onClick={handleOpenConnectModal}
            >
              <TicketIcon
                className={clsx(
                  "-ml-0.5 h-5 w-5",
                  connecting ? 'animate-bounce' : '',
                )}
                aria-hidden="true"
              />
              <span>
                {connecting ? 'Connecting...' : buttonText}
              </span>
            </button>
          </ConnectModal>
        </>
      )}
    </>
  )
}
