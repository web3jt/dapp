'use client';

import { useAccount } from "wagmi";

export default function XXX() {
  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          address: {address}
        </div>

        <div>
          isConnecting: {isConnecting ? 'true' : 'false'}
        </div>

        <div>
          isDisconnected: {isDisconnected ? 'true' : 'false'}
        </div>
      </div>
    </div>
  )
}
