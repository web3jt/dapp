'use client';

import clsx from 'clsx';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, WalletIcon } from '@heroicons/react/24/outline';
import { EvmConnect } from '@/components/web3/evm/connect';
import { SuiConnect } from '@/components/web3/sui/connect';

import { useAtom } from 'jotai';
import { atomShowWeb3ConnectModal, atomSuiAvailableWalletCount } from '@/store/store';




export function Web3Connect() {
  const [open, setOpen] = useAtom(atomShowWeb3ConnectModal);
  const [suiAvailableWalletCount] = useAtom(atomSuiAvailableWalletCount);

  return (
    <>
      <div>
        {suiAvailableWalletCount}
      </div>
    </>
  )
}
