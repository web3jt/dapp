'use client';

import Placeholder from '@/components/debug/Placeholder';

import { useAtom } from 'jotai';
import { atomWeb3Provider } from '@/store/store';

export default function Page() {
  const [provider] = useAtom(atomWeb3Provider);
  console.log('provider:', provider);

  return (
    <>
      <Placeholder />

    </>
  )
}
