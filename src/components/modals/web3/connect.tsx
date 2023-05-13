'use client';

import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { WalletIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { atomShowWeb3ConnectModal } from '@/store/store';
import { EvmConnect } from '@/components/web3/evm/connect';
import { SuiConnect } from '@/components/web3/sui/connect';
import EthereumIcon from '@/images/svg/ethereum.svg';

const defaultClassName = clsx(
  'relative inline-flex w-full items-center justify-start gap-x-3',
  'rounded-md shadow-sm px-5 py-4',
  'bg-indigo-600 hover:bg-indigo-700',
  'dark:bg-indigo-700 dark:hover:bg-indigo-600',
  'text-sm font-semibold text-gray-200 hover:text-white',
  'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
);

export function Web3ConnectModal() {
  const [open, setOpen] = useAtom(atomShowWeb3ConnectModal);
  const initialNull = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen} initialFocus={initialNull}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    <WalletIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Connect to Web3
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Choose Network
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 space-y-3">
                  <EvmConnect
                    buttonText='Connect to ETH/EVM'
                    className={defaultClassName}
                    unsupportedClassName={clsx([
                      'transition backdrop-blur',
                      'relative inline-flex items-center w-full justify-between gap-x-1.5',
                      'rounded-md shadow-sm px-5 py-4',
                      'bg-rose-600 hover:bg-rose-700',
                      'dark:bg-rose-700 dark:hover:bg-rose-600',
                      'text-sm font-semibold text-gray-200 hover:text-white',
                      'focus-visible:outline focus-visible:outline-2',
                      'focus-visible:outline-offset-2 focus-visible:outline-rose-500',
                    ])}
                  >
                    <EthereumIcon
                      className={clsx(
                        "-ml-0.5 h-5 w-5 fill-gray-200 dark:fill-white group-hover:fill-white",
                      )}
                      aria-hidden="true"
                    />
                    <span>
                      Connect to ETH/EVM
                    </span>
                  </EvmConnect>
                  <SuiConnect
                    buttonText='Connect to SUI'
                    className={defaultClassName}
                  >
                    <BeakerIcon
                      className={clsx(
                        "-ml-0.5 h-5 w-5",
                      )}
                      aria-hidden="true"
                    />
                    <span>
                      Connect to SUI
                    </span>
                  </SuiConnect>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
