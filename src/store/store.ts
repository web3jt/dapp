import { Atom, atom, createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { atomWithImmer } from 'jotai-immer';
import { Chain as EvmChain } from 'wagmi';


type EvmNetwork = {
  chain?: EvmChain & { unsupported?: boolean; };
  chains: EvmChain[];
};

const store = createStore();


export const atomDarkMode = atomWithStorage<boolean>('darkMode', true);
export const atomTheme = atom((get) => get(atomDarkMode) ? 'dark' : 'light');


/**
 * EVM
 */
export const atomEvmNetwork = atomWithImmer<EvmNetwork | undefined>(undefined);

const unsubEvmNetwork = store.sub(atomEvmNetwork, () => {
  const network = store.get(atomEvmNetwork);
  // console.log(`new EVM network:`, network);
})

export const atomEvmChainName: Atom<string | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    const chainName = network.chain?.name;
    if (chainName) return `${chainName.slice(0, 1).toUpperCase()}${chainName.slice(1).toLowerCase()}`;
  }

  return undefined;
});

export const atomEvmChainId: Atom<number | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    const chainId = network.chain?.id;
    if (chainId) return chainId;
  }

  return undefined;
});

export const atomEvmChainTestnet: Atom<boolean | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    return network.chain?.testnet;
  }

  return undefined;
});



export const atomEvmNativeSymbol: Atom<string | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    return network.chain?.nativeCurrency.symbol;
  }

  return undefined;
});

export const atomEvmNativeDecimals: Atom<number | undefined> = atom((get) => {
  const network = get(atomEvmNetwork);

  if (network) {
    return network.chain?.nativeCurrency.decimals;
  }

  return undefined;
});

export const atomEvmAddress = atomWithImmer<`0x${string}` | undefined>(undefined);

const unsubEvmAddress = store.sub(atomEvmAddress, () => {
  const address = store.get(atomEvmAddress);
  // console.log(`new EVM address: ${address}`);
})

export const atomEvmAddressMask: Atom<string | undefined> = atom((get) => {
  const address = get(atomEvmAddress);

  if (address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  return undefined;
});

export const atomEvmEnsName = atomWithImmer<string | undefined | null>(undefined);

const unsubEvmEnsName = store.sub(atomEvmEnsName, () => {
  const ensName = store.get(atomEvmEnsName);
  // console.log(`new ENS Name: ${ensName}`);
})

export const atomWeb3Name: Atom<string | undefined> = atom((get) => {
  const ensName = store.get(atomEvmEnsName);
  if (ensName) {
    if (12 < ensName.length) {
      return `${ensName.slice(0, 6)}...${ensName.slice(-4)}`;
    }

    return ensName;
  }

  return 'Unnamed';
});

export const atomEvmConnecting = atomWithImmer<boolean>(false);
export const atomEvmConnected = atomWithImmer<boolean>(false);
export const atomEvmReconnecting = atomWithImmer<boolean>(false);
export const atomEvmDisconnected = atomWithImmer<boolean>(false);

export const atomEvmBlockNumber = atomWithImmer<number | undefined>(undefined);

const unsubEvmBlockNumber = store.sub(atomEvmBlockNumber, () => {
  const blockNumber = store.get(atomEvmBlockNumber);
  console.log(`new EVM block number: ${blockNumber}`);
})





/**
 * Web3
 */
export const atomShowWeb3ConnectModal = atomWithImmer<boolean>(false);
export const atomShowWeb3ConnectionsModal = atomWithImmer<boolean>(false);

export const atomWeb3Connected = atom((get) => {
  let connected: number = 0;

  const evmConnected = get(atomEvmConnected);
  if (evmConnected) {
    const evmNetwork = get(atomEvmNetwork);
    if (!evmNetwork?.chain?.unsupported) connected++;
  }

  return connected;
});


export default store;
