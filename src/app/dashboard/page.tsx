'use client';

import { useAtom } from "jotai";
import {
  atomEvmAddress,
  atomEvmAddressMask,
  atomEvmEnsName,
  atomWeb3Name,
} from '@/store/store';

export default function Page() {
  const [address] = useAtom(atomEvmAddress);
  const [addressMask] = useAtom(atomEvmAddressMask);
  const [ensName] = useAtom(atomEvmEnsName);
  const [web3Name] = useAtom(atomWeb3Name);

  return (
    <>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            address: {address}
          </div>
          <div>
            addressMask: {addressMask}
          </div>
          <div>
            ensName: {ensName}
          </div>
          <div>
            web3Name: {web3Name}
          </div>

        </div>
      </div>
    </>
  )
}
