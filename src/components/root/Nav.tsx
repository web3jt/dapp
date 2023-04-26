'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PhotoIcon, TicketIcon, ExclamationTriangleIcon, ArrowsRightLeftIcon, FingerPrintIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { ConnectButton, useAccountModal } from "@rainbow-me/rainbowkit";

import { useAtom } from 'jotai';
import {
  atomWeb3AddressMask,
  atomWeb3Connecting,
  atomWeb3Connected,
  atomWeb3Name,
  atomWeb3Chain,
} from '@/store/store';

import imageLogo from '@/images/mark.svg';
import imageUser from '@/images/user.avif';

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Team', href: '/xxx' },
  { name: 'Projects', href: '/xxx/empty' },
]

const userNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Preferences', href: '/dashboard/preferences' },
]


export default function Nav() {
  const pathname = usePathname();
  const { openAccountModal } = useAccountModal();


  const [web3Name] = useAtom(atomWeb3Name);
  const [web3AddressMask] = useAtom(atomWeb3AddressMask);
  const [web3Connecting] = useAtom(atomWeb3Connecting);
  const [web3Connected] = useAtom(atomWeb3Connected);
  const [web3Chain, setRawWeb3Chain] = useAtom(atomWeb3Chain);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <Link href="/" className="flex flex-shrink-0 items-center">
                  <PhotoIcon
                    className="block h-8 w-auto lg:hidden fill-indigo-500 hover:fill-indigo-400"
                  // alt="Your Company"
                  // src={imageLogo}
                  />
                  <PhotoIcon
                    className="hidden h-8 w-auto lg:block fill-indigo-500 hover:fill-indigo-400"
                  // alt="Your Company"
                  // src={imageLogo}
                  />
                </Link>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        item.href === pathname ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.href === pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                  }) => {
                    useEffect(() => setRawWeb3Chain(chain), [chain?.id]);

                    const connected = mounted && account && chain;
                    if (!connected) {
                      return (
                        <button
                          type="button"
                          aria-label="Toggle dark mode"
                          className={clsx(
                            'relative inline-flex items-center gap-x-1.5',
                            'rounded-md shadow-sm px-3 py-2',
                            'bg-indigo-700 hover:bg-indigo-600',
                            'text-sm font-semibold text-gray-200 hover:text-white',
                            'focus-visible:outline focus-visible:outline-2',
                            'focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
                          )}
                          onClick={openConnectModal}
                        >
                          <TicketIcon className={clsx(
                            web3Connecting ? 'animate-bounce' : '',
                            "-ml-0.5 h-5 w-5",
                          )} aria-hidden="true" />
                          {web3Connecting ? 'Connecting...' : 'Connect Wallet'}
                        </button>
                      )
                    }

                    if (web3Chain?.unsupported) {
                      return (
                        <button
                          type="button"
                          aria-label="Toggle dark mode"
                          className={clsx([
                            'transition backdrop-blur',
                            'relative inline-flex items-center gap-x-1.5',
                            'rounded-md shadow-sm px-3 py-2',
                            'bg-rose-700 hover:bg-rose-600',
                            'text-sm font-semibold text-gray-200 hover:text-white',
                            'focus-visible:outline focus-visible:outline-2',
                            'focus-visible:outline-offset-2 focus-visible:outline-rose-500',
                          ])}
                          onClick={openChainModal}
                        >
                          <ArrowsRightLeftIcon className={clsx(
                            "-ml-0.5 h-5 w-5",
                          )} aria-hidden="true" />

                          <span>
                            Wrong Network
                          </span>

                          <ChevronDownIcon className="h-5 w-5 " aria-hidden="true" />
                        </button>
                      );
                    }


                    return (
                      <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>

                              <FingerPrintIcon
                                className="h-8 w-8 rounded-full"
                              // src={user.image}
                              // alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item key="profile">
                                <div className="pb-1 mb-1 border-b border-gray-200">
                                  <div className="group block px-4 py-2 space-y-1 hover:bg-gray-100" onClick={openAccountModal}>
                                    {web3Name && (
                                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                        {web3Name}
                                      </p>
                                    )}
                                    <p className="text-xs font-mono text-gray-500 group-hover:text-gray-700">
                                      {web3AddressMask}
                                    </p>
                                  </div>
                                </div>
                              </Menu.Item>
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      href={item.href}
                                      className={clsx(
                                        item.href === pathname ? 'font-bold' : '',
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    );
                  }}
                </ConnectButton.Custom>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {web3Connected && (
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <FingerPrintIcon
                      className="h-10 w-10 rounded-full"
                    // src={user.image}
                    // alt=""
                    />
                  </div>
                  <div className="ml-3">
                    {web3Name && (
                      <div className="text-base font-medium text-white">
                        {web3Name}
                      </div>
                    )}
                    <div className="text-sm font-mono text-gray-400">
                      {web3AddressMask}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openAccountModal}
                    className={clsx(
                      'ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white',
                      'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800',
                    )}
                  >
                    <span className="sr-only">View notifications</span>
                    <TicketIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2 sm:px-3">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={clsx(
                        item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-white',
                        "block rounded-md px-3 py-2 text-base font-medium text-gray-400",
                        "hover:bg-gray-700 hover:text-white",
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
