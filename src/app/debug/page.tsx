'use client';

// import { useAccount } from "wagmi";
import useStoreBase from "@/store/store";


const Counter = () => {
  const count = useStoreBase(state => state.count);
  return (
    <div>
      {count}
    </div>
  )
}

const Control = () => {
  const countIncreasement = useStoreBase(state => state.counterIncreasement);

  const inc = () => {
    countIncreasement();
  }

  return (
    <div>
      <button onClick={inc}>inc</button>
    </div>
  )
}


export default function Page() {
  // const { address, isConnecting, isDisconnected } = useAccount();

  const count = useStoreBase(state => state.count);
  const countIncreasement = useStoreBase(state => state.counterIncreasement);

  const inc = () => {
    countIncreasement();
  }



  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <Counter />
        <Control />

        {/*

        <div>
          address: {address}
        </div>

        <div>
          isConnecting: {isConnecting ? 'true' : 'false'}
        </div>

        <div>
          isDisconnected: {isDisconnected ? 'true' : 'false'}
        </div>
        
        */}
      </div>
    </div>
  )
}
