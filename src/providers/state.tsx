'use client';

import { useAtom } from 'jotai';
import { useEffect } from "react";
import {
  useAccount,
  useEnsName,
  useBlockNumber,
  useBalance,
} from "wagmi";
import {
  atomWeb3Address,
  atomWeb3EnsName,
  atomWeb3Connecting,
  atomWeb3Connected,
  atomWeb3Reconnecting,
  atomWeb3Disconnected,

  atomWeb3BlockNumber,
} from '@/store/store';

// export: state provider
export function StateProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [, setAddress] = useAtom(atomWeb3Address);
  const [, setConnecting] = useAtom(atomWeb3Connecting);
  const [, setConnected] = useAtom(atomWeb3Connected);
  const [, setReconnecting] = useAtom(atomWeb3Reconnecting);
  const [, setDisconnected] = useAtom(atomWeb3Disconnected);

  const [, setEnsName] = useAtom(atomWeb3EnsName);

  const [, setBlockNumber] = useAtom(atomWeb3BlockNumber);


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
    address
  ]);

  // isConnecting
  useEffect(() => {
    setConnecting(isConnecting);
  }, [
    isConnecting
  ]);

  // isConnected
  useEffect(() => {
    setConnected(isConnected);
  }, [
    isConnected
  ]);

  // isReconnecting
  useEffect(() => {
    setReconnecting(isReconnecting);
  }, [
    isReconnecting
  ]);

  // isDisconnected
  useEffect(() => {
    setDisconnected(isDisconnected);
  }, [
    isDisconnected
  ]);

  // ENS
  const { data: ensNameData, isLoading: ensNameIsLoading } = useEnsName({
    address: address,
    suspense: true,
    // cacheTime: 300_000,
  });

  useEffect(() => {
    if (ensNameData) {
      setEnsName(ensNameData);
    } else {
      setEnsName(undefined);
    }
  }, [
    ensNameData
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
