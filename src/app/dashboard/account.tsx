'use client';

import { useAtom } from "jotai";
import {
  atomWeb3Name,

  atomEvmAddress,
  atomEvmAddressMask,
  atomEvmEnsName,

  atomEvmConnected,


  atomSuiAddress,
  atomSuiAddressMask,

  atomSuiConnected,
} from '@/store/store';

import { EvmConnect } from '@/components/web3/evm/connect';
import { EvmConnected } from '@/components/web3/evm/connected';
import { SuiConnect } from '@/components/web3/sui/connect';
import { SuiConnected } from '@/components/web3/sui/connected';


export default function Component() {
  const [evmAddress] = useAtom(atomEvmAddress);
  const [evmAddressMask] = useAtom(atomEvmAddressMask);

  const [ensName] = useAtom(atomEvmEnsName);
  const [web3Name] = useAtom(atomWeb3Name);

  const [suiAddress] = useAtom(atomSuiAddress);
  const [suiAddressMask] = useAtom(atomSuiAddressMask);

  const [evmConnected] = useAtom(atomEvmConnected);
  const [suiConnected] = useAtom(atomSuiConnected);

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 font-mono space-y-12">
          <div>
            web3Name: {web3Name}
          </div>

          <EvmConnected>
            <div>
              EVM address: {evmAddress}
            </div>
            <div>
              EVM addressMask: {evmAddressMask}
            </div>
            <div>
              ENS Name: {ensName}
            </div>
          </EvmConnected>

          <SuiConnected>
            <div>
              SUI address: {suiAddress}
            </div>
            <div>
              SUI addressMask: {suiAddressMask}
            </div>
          </SuiConnected>
        </div>
      </div>
    </>
  )
}
