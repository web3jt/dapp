'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";
import {
  useAccount,
  useEnsName,
  useBlockNumber,
  useBalance,
  useNetwork,
} from "wagmi";
import {
  atomEvmAddress,
  atomEvmEnsName,
  atomEvmConnecting,
  atomEvmConnected,
  atomEvmReconnecting,
  atomEvmDisconnected,

  atomEvmBlockNumber,

  atomEvmNetwork,
} from '@/store/store';

// export: EVM state provider
export function EvmStateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [network, setNetwork] = useAtom(atomEvmNetwork);
  const [, setAddress] = useAtom(atomEvmAddress);
  const [, setConnecting] = useAtom(atomEvmConnecting);
  const [, setConnected] = useAtom(atomEvmConnected);
  const [, setReconnecting] = useAtom(atomEvmReconnecting);
  const [, setDisconnected] = useAtom(atomEvmDisconnected);
  const [, setEnsName] = useAtom(atomEvmEnsName);
  // const [, setBlockNumber] = useAtom(atomWeb3BlockNumber);

  const { chain, chains } = useNetwork();
  useEffect(() => setNetwork({ chain: chain, chains: chains }), [chain, chain?.id, chains, setNetwork]);

  // address, connect
  const {
    address,
    isConnecting,
    isConnected,
    isReconnecting,
    isDisconnected,
  } = useAccount({
    onDisconnect() {
      console.log('Disconnected');
      setAddress(undefined);
      setEnsName(undefined);
    },
  });

  // address
  useEffect(() => {
    if (address) {
      setAddress(address);
    } else {
      setAddress(undefined);
      setEnsName(undefined);
    }
  }, [
    address,
    setAddress,
    setEnsName,
  ]);

  // isConnecting
  useEffect(() => {
    setConnecting(isConnecting);
  }, [
    isConnecting,
    setConnecting,
  ]);

  // isConnected
  useEffect(() => {
    setConnected(isConnected);
  }, [
    isConnected,
    setConnected,
  ]);

  // isReconnecting
  useEffect(() => {
    setReconnecting(isReconnecting);
  }, [
    isReconnecting,
    setReconnecting,
  ]);

  // isDisconnected
  useEffect(() => {
    setDisconnected(isDisconnected);
  }, [
    isDisconnected,
    setDisconnected,
  ]);

  // ENS
  const { data: ensNameData, isLoading: ensNameIsLoading } = useEnsName({
    address: address,
    suspense: true,
    chainId: 1,
    // cacheTime: 300_000,
    // onError(error) {
    //   console.log('Error', error)
    // },
  });

  useEffect(() => {
    if (ensNameData) {
      setEnsName(ensNameData);
    } else {
      setEnsName(undefined);
    }
  }, [
    ensNameData,
    setEnsName,
  ]);

  // // block number
  // const { data: blockNumberData, isLoading: blockNumberIsLoading } = useBlockNumber({
  //   // watch: true,
  //   // cacheTime: 60_000,
  //   // staleTime: 60_000,
  // });

  // useEffect(() => {
  //   if (blockNumberData) {
  //     setBlockNumber(blockNumberData);
  //   } else {
  //     setBlockNumber(undefined);
  //   }
  // }, [
  //   blockNumberData
  // ]);

  // // setBlockNumber
  // const { data: balanceData, isLoading: balanceIsLoading } = useBalance({
  //   address: address,
  // })

  // useEffect(() => {
  //   if (balanceData) {
  //     console.log(balanceData);
  //     // setBlockNumber(blockNumberData);
  //   } else {
  //     // setBlockNumber(undefined);
  //   }
  // }, [
  //   balanceData
  // ]);

  return (
    <>
      {children}
    </>
  )
}
