import { atom, createStore } from 'jotai';
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

export const atomDarkMode = atomWithImmer<boolean>(true);
export const atomTheme = atom((get) => get(atomDarkMode) ? 'dark' : 'light');

export const atomWeb3Address = atomWithImmer<`0x${string}` | undefined>(undefined);
export const atomWeb3EnsName = atomWithImmer<string | undefined | null>(undefined);
export const atomWeb3Connecting = atomWithImmer<boolean>(false);
export const atomWeb3Connected = atomWithImmer<boolean>(false);
export const atomWeb3Reconnecting = atomWithImmer<boolean>(false);
export const atomWeb3Disconnected = atomWithImmer<boolean>(false);
export const atomWeb3Chain = atomWithImmer<Web3Chain | undefined>(undefined);
export const atomWeb3BlockNumber = atomWithImmer<number | undefined>(undefined);

export const atomWeb3AddressMask = atom((get) => {
  const address = get(atomWeb3Address);

  if (address) {
    return `${address.slice(0, 6)}...${address.slice(-8)}`;
  }

  return undefined;
});

export const atomWeb3Name = atom((get) => {
  const ensName = store.get(atomWeb3EnsName);
  if (ensName) {
    if (12 < ensName.length) {
      return `${ensName.slice(0, 6)}...${ensName.slice(-4)}`;
    }

    return ensName;
  }

  return 'Unnamed';
});

const unsubBlockNumber = store.sub(atomWeb3BlockNumber, () => {
  const blockNumber = store.get(atomWeb3BlockNumber);
  console.log(`new block number: ${blockNumber}`);
})

const unsubAddress = store.sub(atomWeb3Address, () => {
  const address = store.get(atomWeb3Address);
  console.log(`new address: ${address}`);
})

const unsubEnsName = store.sub(atomWeb3EnsName, () => {
  const ensName = store.get(atomWeb3EnsName);
  console.log(`new ensName: ${ensName}`);
})

export default store;
