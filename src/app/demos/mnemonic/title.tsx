import clsx from 'clsx';
import Link from 'next/link';

import { ArrowLongRightIcon } from '@heroicons/react/20/solid';

const links = [
  { name: 'Imperdiet', href: '#' },
  { name: 'Laoreet diam', href: '#' },
  { name: 'Pulvinar', href: '#' },
  { name: 'Nisi ac vehicula', href: '#' },
]

export default function Component() {
  return (
    <div className="relative isolate overflow-hidden pt-24 sm:pt-32 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Mnemonic
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
            Show how a Mnemonic phrase turns into a private key, public key, and address,
            by using <Link
              target="_blank"
              href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              BIP39
            </Link>, <Link
              target="_blank"
              href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              BIP32
            </Link>, <Link
              target="_blank"
              href="https://github.com/paulmillr/scure-bip39"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              @scure/bip39
            </Link> and <Link
              target="_blank"
              href="https://viem.sh/docs/accounts/mnemonic.html"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              viem
            </Link>
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className={clsx(
            "grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:flex lg:gap-x-10",
            "text-base font-semibold leading-7 text-gray-900 dark:text-white"
          )}>
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="inline-flex items-center gap-x-0.5">
                <span>
                  {link.name}
                </span>
                <ArrowLongRightIcon className="ml-1 h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
