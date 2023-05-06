'use client';

import {
  WalletProvider,

  IDefaultWallet,
  SuietWallet,
  SuiWallet,
  EthosWallet,

  Chain,
  SuiDevnetChain,
  SuiTestnetChain,
  SuiMainnetChain,
} from '@suiet/wallet-kit';
import { SuiStateProvider } from '@/providers/sui-state';


import '@suiet/wallet-kit/style.css';

const wallets: IDefaultWallet[] = [
  SuietWallet,
  SuiWallet,
  EthosWallet,
]

const chains: Chain[] = [
  SuiMainnetChain,
  SuiTestnetChain,
  SuiDevnetChain,
];

// export: Web3Providers
export function SuiProvider({
  children
}: {
  children: React.ReactNode
}) {
  // const [darmMode] = useAtom(atomDarkMode);

  return (
    <WalletProvider
      // defaultWallets={wallets}
      chains={chains}
    >
      <SuiStateProvider>
        {children}
      </SuiStateProvider>
    </WalletProvider>
  )
}
