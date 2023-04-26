import { createStore } from 'jotai';
import { atomWithImmer } from 'jotai-immer';

const store = createStore();

export interface Web3Chain {
  hasIcon: boolean;
  iconUrl?: string;
  iconBackground?: string;
  id: number;
  name?: string;
  unsupported?: boolean;
}

export const atomWeb3Address = atomWithImmer<`0x${string}` | undefined>(undefined);
export const atomWeb3AddressMask = atomWithImmer<string | undefined>('');
export const atomWeb3EnsName = atomWithImmer<string | undefined | null>(undefined);
export const atomWeb3Name = atomWithImmer<string>('Unnamed');
export const atomWeb3Connecting = atomWithImmer<boolean>(false);
export const atomWeb3Connected = atomWithImmer<boolean>(false);
export const atomWeb3Reconnecting = atomWithImmer<boolean>(false);
export const atomWeb3Disconnected = atomWithImmer<boolean>(false);
export const atomWeb3Chain = atomWithImmer<Web3Chain | undefined>(undefined);


const unsubWeb3Address = store.sub(atomWeb3Address, () => {
  const address = store.get(atomWeb3Address);

  console.log('address:', address);

  if (address) {
    store.set(atomWeb3AddressMask, `${address.slice(0, 6)}...${address.slice(-8)}`);
  } else {
    store.set(atomWeb3AddressMask, undefined);
  }
});


const unsubWeb3EnsName = store.sub(atomWeb3EnsName, () => {
  const ensName = store.get(atomWeb3EnsName);
  console.log('ensName:', ensName);

  if (ensName) {
    if (12 < ensName.length) {
      store.set(atomWeb3Name, `${ensName.slice(0, 6)}...${ensName.slice(-4)}`);
    } else {
      store.set(atomWeb3Name, ensName);
    }
  } else {
    store.set(atomWeb3Name, `Unnamed`);
  }
});


export default store;
