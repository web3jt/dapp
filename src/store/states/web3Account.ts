import { StateCreator } from 'zustand';
import { produce } from 'immer';

export interface IWeb3Account {
  rawAddress: `0x${string}` | undefined;
  rawEnsData: string | undefined;
  address: () => string;
  updateAddress: (value: `0x${string}` | undefined) => void;
  updateEnsData: (value: string | undefined) => void;
}

export const createWeb3Account: StateCreator<IWeb3Account> = (set, get) => ({
  rawAddress: undefined,
  rawEnsData: undefined,
  address(): string {
    const value = get().rawAddress;
    if (value) {
      return value;
    }
    return '0x0';
  },
  updateAddress(value: `0x${string}` | undefined) {
    if (value) {
      if (value !== get().rawAddress) {
        set({ rawAddress: value })
      }
    } else {
      set({ rawAddress: undefined })
    }
  },
  updateEnsData(value: string | undefined) {
    if (value) {
      if (value !== get().rawEnsData) {
        set({ rawEnsData: value })
      }
    } else {
      set({ rawEnsData: undefined })
    }
  },
})
