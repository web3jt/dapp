'use client';

import clsx from 'clsx';
import { Button } from '@nextui-org/button';
import { TicketIcon } from '@heroicons/react/20/solid';

import { useAtom } from 'jotai';
import { atomSuiAvailableWalletCount, atomShowWeb3ConnectModal } from '@/store/store';

import { EvmConnect } from '@/components/web3/evm/connect';

export function Web3Connect({
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
  const [suiAvailableWalletCount] = useAtom(atomSuiAvailableWalletCount);
  const [, setWeb3ConnectModalOpen] = useAtom(atomShowWeb3ConnectModal);
  const handleOpen = () => setWeb3ConnectModalOpen(true);

  const envSUISupported = process.env.NEXT_PUBLIC_SUI_SUPPORTED === 'true';

  if (envSUISupported && 0 < suiAvailableWalletCount) {
    return (
      <>
        <button
          type="button"
          aria-label="Connect Wallet"
          className={className || clsx(
            'relative inline-flex items-center gap-x-1.5',
            'rounded-md shadow-sm px-3 py-2',
            'bg-indigo-600 hover:bg-indigo-700',
            'dark:bg-indigo-700 dark:hover:bg-indigo-600',
            'text-sm font-semibold text-gray-200 hover:text-white',
            'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
          )}
          onClick={handleOpen}
        >
          {children || (
            <>
              <TicketIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              <span>
                {buttonText}
              </span>
            </>
          )}
        </button>
      </>
    );
  }

  if (children) {
    return (
      <EvmConnect
        className={className}
        unsupportedClassName={unsupportedClassName}
        buttonText={buttonText}
      >
        {children}
      </EvmConnect>
    )
  }

  return (
    <EvmConnect
      className={className}
      unsupportedClassName={unsupportedClassName}
      buttonText={buttonText}
    />
  )
}
