import { Web3ConnectModal } from '@/components/web3/connectModal';

// export: ModalProviders
export function ModalProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Web3ConnectModal />
      {children}
    </>
  )
}
