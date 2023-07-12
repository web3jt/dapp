'use client';

/**
 * RainbowKit
 */
import '@rainbow-me/rainbowkit/styles.css';
import type { Wallet } from '@rainbow-me/rainbowkit';
import {
  // getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
  connectorsForWallets,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
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

/**
 * Wagmi
 */
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  goerli,
  // polygon,
  // optimism,
  // arbitrum,
  bsc,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { infuraProvider } from 'wagmi/providers/infura';
// import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
// import { InjectedConnector } from 'wagmi/connectors/injected';
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

/**
 * Viem
 */
// import { createPublicClient, http } from 'viem';

/**
 * State
 */
import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';
import { EvmStateProvider } from '@/providers/evm-state';


// default chain: goerli
const _getInitialChainId = () => {
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
const appName = process.env.NEXT_PUBLIC_DAPP_NAME || "dApp";
const initialChainId = _getInitialChainId();

// chains, provider
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    bsc,
  ],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
    publicProvider(),
  ]
);

// // Wallet[]
// const _getConnectorsWallets = (): Wallet[] => {
//   let records: Wallet[] = [];
//   records.push(injectedWallet({ chains }));
//   records.push(metaMaskWallet({ chains }));
//   records.push(rainbowWallet({ chains }));
//   records.push(braveWallet({ chains }));

//   const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
//   if (walletConnectProjectId) {
//     records.push(walletConnectWallet({ chains, projectId: walletConnectProjectId }));
//   }

//   // const needsInjectedWalletFallback =
//   //   typeof window !== "undefined" &&
//   //   window.ethereum &&
//   //   !window.ethereum.isMetaMask &&
//   //   !window.ethereum.isCoinbaseWallet;
//   // if (needsInjectedWalletFallback) records.push(injectedWallet({ chains }));

//   return records;
// }

// // connectors (wallet list)
// const connectors = connectorsForWallets([
//   {
//     groupName: "Popular",
//     wallets: _getConnectorsWallets(),
//   },
//   {
//     groupName: "Other",
//     wallets: [
//       coinbaseWallet({ appName: appName, chains }),
//       trustWallet({ chains }),
//       // imTokenWallet({ chains })
//     ],
//   },
// ]);


const { connectors } = getDefaultWallets({
  appName: appName,
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
});

// wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})


// export: Web3Providers
export function EvmProviders({ children }: { children: React.ReactNode }) {
  const [darmMode] = useAtom(atomDarkMode);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darmMode ? darkTheme() : lightTheme()}
        modalSize="compact"
        chains={chains}
        initialChain={initialChainId}
        appInfo={{ appName: appName }}
      >
        <EvmStateProvider>
          {children}
        </EvmStateProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
