'use client';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useAccountModal } from "@rainbow-me/rainbowkit";
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  PhotoIcon,
  TicketIcon,
  FingerPrintIcon,
} from '@heroicons/react/20/solid';
import ThemeToggle from '@/components/root/ThemeToggle';
import Connect from '@/components/web3/connect';
import {
  atomDarkMode,

  atomWeb3AddressMask,
  atomWeb3Connected,
  atomWeb3Name,
} from '@/store/store';

import imageLogo from '@/images/mark.svg';
import imageUser from '@/images/user.avif';

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Theme', href: '/theme' },
  { name: 'Placeholder', href: '/placeholder' },
  { name: 'Debug', href: '/debug' },
]

const userNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Preferences', href: '/dashboard/preferences' },
]


export default function Nav() {
  const pathname = usePathname();
  const { openAccountModal } = useAccountModal();

  const [darkMode] = useAtom(atomDarkMode);

  const [web3Name] = useAtom(atomWeb3Name);
  const [web3AddressMask] = useAtom(atomWeb3AddressMask);
  const [web3Connected] = useAtom(atomWeb3Connected);

  return (
    <Disclosure as="nav" className="shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className={clsx(
                    "inline-flex items-center justify-center rounded-md p-2",
                    "text-gray-400",
                    "hover:bg-gray-100 hover:text-gray-500",
                    "dark:hover:bg-gray-700 dark:hover:text-white",
                    "focus:outline-none focus:ring-2 focus:ring-inset",
                    "focus:ring-indigo-500 dark:focus:ring-white",
                  )}>
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
                    className="block h-8 w-auto lg:hidden fill-indigo-500 hover:fill-indigo-600 dark:hover:fill-indigo-400"
                  // alt="Your Company"
                  // src={imageLogo}
                  />
                  <PhotoIcon
                    className="hidden h-8 w-auto lg:block fill-indigo-500 hover:fill-indigo-600 dark:hover:fill-indigo-400"
                  // alt="Your Company"
                  // src={imageLogo}
                  />
                </Link>
                <div className={clsx(
                  darkMode ? "hidden md:ml-6 md:flex md:items-center md:space-x-4" : "hidden md:ml-6 md:flex md:space-x-8",
                )}>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        darkMode ? clsx(
                          "rounded-md px-3 py-2 text-sm font-medium",
                          item.href === pathname ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        ) : clsx(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          item.href === pathname ? "border-indigo-500  text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        ),
                      )}
                      aria-current={item.href === pathname ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <ThemeToggle />
                <Connect>
                  <div className="hidden md:flex md:flex-shrink-0 md:items-center">
                    <Menu as="div" className="relative">
                      <div>
                        <Menu.Button className={clsx(
                          "flex rounded-full text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-offset-2",
                          "focus:ring-indigo-500 dark:focus:ring-gray-500",
                          "dark:focus:ring-offset-gray-800",
                          "text-gray-500 dark:text-gray-300",
                        )}>
                          <span className="sr-only">
                            Open user menu
                          </span>
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
                </Connect>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2 dark:px-2 dark:sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={clsx(
                    darkMode ? clsx(
                      'block rounded-md px-3 py-2 text-base font-medium',
                      item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    ) : clsx(
                      "block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6",
                      item.href === pathname ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                    ),
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {web3Connected && (
              <div className="border-t border-gray-300 dark:border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0 text-gray-500 dark:text-gray-300">
                    <FingerPrintIcon
                      className="h-10 w-10 rounded-full"
                    // src={user.image}
                    // alt=""
                    />
                  </div>
                  <div className="ml-3">
                    {web3Name && (
                      <div className="text-base font-medium text-gray-700 dark:text-white">
                        {web3Name}
                      </div>
                    )}
                    <div className="text-sm font-mono text-gray-500 dark:text-gray-400">
                      {web3AddressMask}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={openAccountModal}
                    className={clsx(
                      'ml-auto flex-shrink-0 rounded-full p-1',
                      'focus:outline-none focus:ring-2  focus:ring-offset-2',

                      // "focus:ring-indigo-500 dark:focus:ring-gray-500",
                      // "dark:focus:ring-offset-gray-800",
                      // "text-gray-500 dark:text-gray-300",
                      clsx(
                        darkMode
                          ? "text-gray-400 hover:text-white focus:ring-white focus:ring-offset-gray-800"
                          : "text-indigo-500 hover:text-indigo-600 focus:ring-indigo-500"
                      )
                    )}
                  >
                    <span className="sr-only">View notifications</span>
                    <TicketIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 dark:px-2 dark:sm:px-3">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={clsx(
                        darkMode ? clsx(
                          'block rounded-md px-3 py-2 text-base font-medium',
                          item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        ) : clsx(
                          "block border-l-4 py-2 pl-3 pr-4 text-base font-medium sm:pl-5 sm:pr-6",
                          item.href === pathname ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700",
                        ),
                      )}
                    // className={clsx(
                    //   item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-white',
                    //   "block rounded-md px-3 py-2 text-base font-medium text-gray-400",
                    //   "hover:bg-gray-700 hover:text-white",
                    // )}
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
