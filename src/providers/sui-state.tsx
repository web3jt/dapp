'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";

import {

} from '@/store/store';

// export: SUI state provider
export function SuiStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
