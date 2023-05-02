'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';
import { CircleStackIcon, BanknotesIcon, PhotoIcon, IdentificationIcon, UserCircleIcon } from '@heroicons/react/20/solid';

const tabs = [
  {
    name: 'ETH',
    type: 'A',
    desc: 'Batch Transfer ETH',
    href: '/tools/batch/native',
    icon: CircleStackIcon
  },
  {
    name: 'ERC20',
    type: 'B',
    desc: 'Batch Transfer ERC20 Tokens',
    href: '/tools/batch/erc20',
    icon: BanknotesIcon
  },
  {
    name: 'ERC721',
    type: 'C',
    desc: 'Batch Transfer ERC721 NFTs',
    href: '/tools/batch/erc721',
    icon: PhotoIcon
  },
  {
    name: 'ERC1155',
    type: 'D',
    desc: 'Batch Transfer ERC1155 NFTs',
    href: '/tools/batch/erc1155',
    icon: IdentificationIcon
  },
]


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode] = useAtom(atomDarkMode);

  const tabOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tab = tabs.find((tab) => tab.name === e.target.value);
    if (tab) router.push(tab.href);
  }

  return (
    <>
      <div className={clsx(
        "mx-auto max-w-7xl",
        "px-6 lg:px-8 pt-8 pb-4 sm:pt-12 sm:pb-6",
        "space-y-6",
      )}>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Batch Transfer
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            OPEN-SOURCED, FREE - SAVE GAS FEES
          </p>
        </div>

        <div className="flex">
          <div className="sm:hidden w-full">
            <label htmlFor="tabs" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Tx type
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
              defaultValue={tabs.find((tab) => tab.href === pathname)?.name}
              onChange={tabOnchange}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className={clsx(
              !darkMode ?? "border-b border-gray-200"
            )}>
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={clsx(
                      "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium",
                      pathname === tab.href
                        ? clsx(
                          "border-indigo-600 dark:border-white",
                          "text-indigo-600 dark:text-white"
                        )
                        : clsx(
                          "border-transparent hover:border-gray-300 dark:hover:border-white",
                          "text-gray-500 dark:text-gray-400",
                          "hover:text-indigo-600 dark:hover:text-white",
                        )
                    )}
                    aria-current={pathname === tab.href ? 'page' : undefined}
                  >
                    <tab.icon
                      className={clsx(
                        '-ml-0.5 mr-2 h-5 w-5',
                        pathname === tab.href
                          ? "text-indigo-600 dark:text-white"
                          : clsx(
                            "text-gray-500 dark:text-gray-400",
                            "group-hover:text-indigo-600 dark:group-hover:text-white",
                          ),
                      )}
                      aria-hidden="true"
                    />
                    <span>
                      {tab.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <>
          {children}
        </>
      </div >
    </>
  )
}
