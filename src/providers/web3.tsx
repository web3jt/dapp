'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, lightTheme, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  braveWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  trustWallet,
  // imTokenWallet,
} from '@rainbow-me/rainbowkit/wallets';
import type { Wallet } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
// import { infuraProvider } from 'wagmi/providers/infura';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';


import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';

// default chain: goerli
const getInitialChainId = () => {
  try {
    const _id = parseInt(process.env.NEXT_PUBLIC_INITIAL_CHAIN_ID || '5');
    if (_id === mainnet.id || _id === goerli.id) {
      return _id;
    }
  } catch (e) {
    console.error(e);
  }

  return 5;
}

// app info
const appName = "dApp";
const initialChainId = getInitialChainId();

// chains, provider
const { chains, provider } = configureChains(
  [
    mainnet,
    goerli,
  ],
  [

    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
    publicProvider(),
  ]
);

// Wallet[]
const getConnectorsWallets = (): Wallet[] => {
  let records: Wallet[] = [];
  records.push(metaMaskWallet({ chains }));
  records.push(rainbowWallet({ chains }));
  records.push(braveWallet({ chains }));

  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
  if (walletConnectProjectId) {
    records.push(walletConnectWallet({ chains, projectId: walletConnectProjectId }));
  }

  const needsInjectedWalletFallback =
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

  if (needsInjectedWalletFallback) records.push(injectedWallet({ chains }));

  return records;
}

// connectors (wallet list)
const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: getConnectorsWallets(),
  },
  {
    groupName: "Other",
    wallets: [
      coinbaseWallet({ appName: appName, chains }),
      trustWallet({ chains }),
      // imTokenWallet({ chains })
    ],
  },
]);

// wagmi client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


// export: Web3Providers
export function Web3Providers({
  children
}: {
  children: React.ReactNode
}) {
  const [darmMode] = useAtom(atomDarkMode);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darmMode ? darkTheme() : lightTheme()}
        modalSize="compact"
        chains={chains}
        initialChain={initialChainId}
        appInfo={{ appName: appName }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
