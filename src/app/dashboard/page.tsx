import { Web3Connected } from '@/components/web3/connected';
import { EvmConnection } from './evm';


export default function Page() {
  return (
    <>
      <Web3Connected>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
            <EvmConnection />
          </div>
        </div>
      </Web3Connected>
    </>
  )
}
