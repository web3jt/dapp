'use client';

import { useAtom } from "jotai";
import {
  atomEvmAddress,
  atomEvmAddressMask,
  atomEvmEnsName,
  atomWeb3Name,

  atomSuiAddress,
  atomSuiAddressMask,
} from '@/store/store';

export default function Component() {
  const [evmAddress] = useAtom(atomEvmAddress);
  const [evmAddressMask] = useAtom(atomEvmAddressMask);

  const [ensName] = useAtom(atomEvmEnsName);
  const [web3Name] = useAtom(atomWeb3Name);

  const [suiAddress] = useAtom(atomSuiAddress);
  const [suiAddressMask] = useAtom(atomSuiAddressMask);

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 font-mono">
          <div>
            web3Name: {web3Name}
          </div>

          <div className="mt-12">
            EVM address: {evmAddress}
          </div>
          <div>
            EVM addressMask: {evmAddressMask}
          </div>
          <div>
            ENS Name: {ensName}
          </div>

          <div className="mt-12">
            SUI address: {suiAddress}
          </div>
          <div>
            SUI addressMask: {suiAddressMask}
          </div>
        </div>
      </div>
    </>
  )
}
