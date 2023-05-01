
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';
import { CircleStackIcon, BanknotesIcon, PhotoIcon, IdentificationIcon } from '@heroicons/react/20/solid';


const tabs = [
  { name: 'ETH', href: '/tools/bulk/native', icon: CircleStackIcon },
  { name: 'ERC20', href: '/tools/bulk/erc20', icon: BanknotesIcon },
  { name: 'ERC721', href: '/tools/bulk/erc721', icon: PhotoIcon },
  { name: 'ERC1155', href: '/tools/bulk/erc1155', icon: IdentificationIcon },
]


export default function Tabs() {
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
        "mx-auto flex max-w-7xl",
        "px-6 lg:px-8 py-4 sm:py-6",
      )}>
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
          {/* <List /> */}
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
      </div >
    </>
  )
}
