import Account from '../account';

import { Web3Connected } from '@/components/web3/connected';

export default function Page() {
  return (
    <>
      <Web3Connected>
        <Account />
      </Web3Connected>
    </>
  )
}
