'use client';

// import { useAccount } from "wagmi";
import useStore from "@/store/store";

const Counter = () => {
  const count = useStore.use.count();
  const counter2 = useStore.use.counter2();

  return (
    <>
      <div>
        {count}
      </div>
      <div>
        {counter2()}
      </div>
    </>
  )
}

const Control = () => {
  const countIncreasement = useStore.use.counterIncreasement();

  return (
    <div>
      <button onClick={countIncreasement}>inc</button>
    </div>
  )
}

const Account = () => {
  const web3Address = useStore.use.address();

  return (
    <>
      <div>
        web3Address: {web3Address()}
      </div>
    </>
  )
}


export default function Page() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Counter />
        <Control />
        <Account />
      </div>
    </div>
  )
}
