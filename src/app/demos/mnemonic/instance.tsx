'use client';

import clsx from 'clsx';

import {
  mnemonicToAccount,
  generateMnemonic,
  english,
} from 'viem/accounts'

import { atom, useAtom } from 'jotai';


const atomMnemonicText = atom<string>('');



export default function Component() {
  const [mnemonicText, setMnemonicText] = useAtom(atomMnemonicText);

  const handleGenerateMnemonic = () => {
    setMnemonicText(generateMnemonic(english));
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 space-y-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div>
          <button
            type="button"
            aria-label="Toggle dark mode"
            className={clsx(
              'relative inline-flex items-center gap-x-1.5',
              'rounded-md shadow-sm px-3 py-2',
              'bg-indigo-600 hover:bg-indigo-700',
              'dark:bg-indigo-700 dark:hover:bg-indigo-600',
              'text-sm font-semibold text-gray-200 hover:text-white',
              'focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
            )}
            onClick={handleGenerateMnemonic}
          >
            Generate Mnemonic
          </button>
        </div>

        <div className="col-span-full">
          <label htmlFor="raws" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
            Mnemonic Phrases
          </label>
          <div className="mt-2">
            <textarea
              id="mnemonic"
              name="mnemonic"
              aria-describedby="mnemonic-value"
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                "text-gray-900 dark:text-white",
                "ring-gray-300 dark:ring-white/10",
                "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                "dark:bg-white/5",
              )}
              rows={4}
              value={mnemonicText}
              onChange={(e) => setMnemonicText(e.target.value.trim())}
            />
          </div>

        </div>

        {/* <div className="sm:col-span-3"></div> */}
      </div>
    </div>
  )
}
