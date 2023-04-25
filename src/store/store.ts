import { create } from 'zustand';
import { ICounter, createCount } from '@/store/states/counter';
import { IWeb3Account, createWeb3Account } from '@/store/states/web3Account';
import { createSelectors } from "@/store/selectors";

type IStoreState = ICounter & IWeb3Account;

const useStoreBase = create<IStoreState>()((...a) => ({
  ...createCount(...a),
  ...createWeb3Account(...a),
}))

const useStore = createSelectors(useStoreBase);

export default useStore;
