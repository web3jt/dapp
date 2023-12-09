'use client';

import clsx from 'clsx';
import { Button } from '@nextui-org/button';
import { TicketIcon } from '@heroicons/react/20/solid';

import { useAtom } from 'jotai';

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
