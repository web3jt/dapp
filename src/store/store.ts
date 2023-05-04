import { Atom, atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomWithImmer } from 'jotai-immer';
import { Chain } from 'wagmi';

type Web3Network = {
  chain?: Chain & {
    unsupported?: boolean;
  };
  chains: Chain[];
};

const store = createStore();

export const atomDarkMode = atomWithStorage<boolean>('darkMode', true);
export const atomTheme = atom((get) => get(atomDarkMode) ? 'dark' : 'light');

export const atomWeb3Network = atomWithImmer<Web3Network | undefined>(undefined);
export const atomWeb3Address = atomWithImmer<`0x${string}` | undefined>(undefined);
export const atomWeb3EnsName = atomWithImmer<string | undefined | null>(undefined);
export const atomWeb3Connecting = atomWithImmer<boolean>(false);
export const atomWeb3Connected = atomWithImmer<boolean>(false);
export const atomWeb3Reconnecting = atomWithImmer<boolean>(false);
export const atomWeb3Disconnected = atomWithImmer<boolean>(false);
export const atomWeb3BlockNumber = atomWithImmer<number | undefined>(undefined);


export const atomWeb3NativeSymbol: Atom<string | undefined> = atom((get) => {
  const network = get(atomWeb3Network);

  if (network) {
    return network.chain?.nativeCurrency.symbol;
  }

  return undefined;
});

export const atomWeb3NativeDecimals: Atom<number | undefined> = atom((get) => {
  const network = get(atomWeb3Network);

  if (network) {
    return network.chain?.nativeCurrency.decimals;
  }

  return undefined;
});

export const atomWeb3AddressMask: Atom<string | undefined> = atom((get) => {
  const address = get(atomWeb3Address);

  if (address) {
    return `${address.slice(0, 6)}...${address.slice(-8)}`;
  }

  return undefined;
});

export const atomWeb3Name: Atom<string | undefined> = atom((get) => {
  const ensName = store.get(atomWeb3EnsName);
  if (ensName) {
    if (12 < ensName.length) {
      return `${ensName.slice(0, 6)}...${ensName.slice(-4)}`;
    }

    return ensName;
  }

  return 'Unnamed';
});

const unsubNetwork = store.sub(atomWeb3Network, () => {
  const network = store.get(atomWeb3Network);
  console.log(`new network:`, network);
})


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
