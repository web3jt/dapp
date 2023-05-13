import { Web3ConnectModal } from '@/components/modals/web3/connect';
import { Web3ConnectionsModal } from '@/components/modals/web3/connections';

// export: ModalsProvider
export function ModalsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Web3ConnectModal />
      <Web3ConnectionsModal />
      {children}
    </>
  )
}
