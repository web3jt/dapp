'use client';

import clsx from 'clsx';
import { useAtom } from "jotai";
import {
  atomEvmAddress,
  atomEvmAddressMask,
  atomEvmNativeSymbol,
  atomEvmChainName,
  atomEvmChainId,
  atomEvmChainTestnet,
  atomEvmEnsName,
} from '@/store/store';
import { EvmConnected } from '@/components/web3/evm/connected';


export function EvmConnection() {
  const [evmAddress] = useAtom(atomEvmAddress);
  const [evmAddressMask] = useAtom(atomEvmAddressMask);
  const [ensName] = useAtom(atomEvmEnsName);
  const [symbol] = useAtom(atomEvmNativeSymbol);
  const [chainName] = useAtom(atomEvmChainName);
  const [chainId] = useAtom(atomEvmChainId);
  const [chainTestnet] = useAtom(atomEvmChainTestnet);

  return (
    <EvmConnected>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            {chainName} {chainTestnet ? "Testnet" : "Mainet"}
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
            Chain ID #{chainId}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100 dark:border-white/10">
          <dl className="divide-y divide-gray-100 dark:divide-white/10">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                ENS Name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0 font-mono">
                {ensName || 'N/A'}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-white">
                {symbol} address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-400 sm:col-span-2 sm:mt-0 font-mono">
                {evmAddressMask} ({evmAddress})
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </EvmConnected>
  )
}
