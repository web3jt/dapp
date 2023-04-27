'use client';

import { useAtom } from "jotai";
import {
  atomWeb3Address,
  atomWeb3AddressMask,
  atomWeb3EnsName,
  atomWeb3Name,
} from '@/store/store';

export default function Page() {
  const [address] = useAtom(atomWeb3Address);
  const [addressMask] = useAtom(atomWeb3AddressMask);
  const [ensName] = useAtom(atomWeb3EnsName);
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
