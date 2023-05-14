'use client';

import clsx from 'clsx';
import * as BIP39 from 'bip39';
import {
  mnemonicToAccount,
  generateMnemonic,
  english,
} from 'viem/accounts'
import { atom, useAtom } from 'jotai';

const atomStrength = atom<number>(128);
const strengthOptions = [
  { name: '12', value: 128 },
  { name: '15', value: 160 },
  { name: '18', value: 192 },
  { name: '21', value: 224 },
  { name: '24', value: 256 },
];
const atomMnemonicText = atom<string>('');
const atomMnemonicHint = atom((get) => {
  const _mnemonicText = get(atomMnemonicText);
  if (!_mnemonicText) return 'Please enter mnemonic or generate words';

  const _length = _mnemonicText.split(/\s+/).length;
  if (_length < 12) return 'Please enter at least 12 words';
  if (_length > 24) return 'Please enter at most 24 words';
  if (
    _length !== 12
    &&
    _length !== 15
    &&
    _length !== 18
    &&
    _length !== 21
    &&
    _length !== 24
  ) return 'Please enter 12, 15, 18, 21 or 24 words';

  if (!BIP39.validateMnemonic(_mnemonicText)) return 'Invalid mnemonic words';

  return '';
});

export default function Component() {
  const [strength, setStrength] = useAtom(atomStrength);
  const [mnemonicText, setMnemonicText] = useAtom(atomMnemonicText);
  const [mnemonicHint] = useAtom(atomMnemonicHint);

  const handleStrengthOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => setStrength(parseInt(e.target.value));
  const handleGenerateMnemonic = () => setMnemonicText(BIP39.generateMnemonic(strength));


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-32 space-y-12">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3 flex space-x-2">
          <div className="flex-grow">
            <label htmlFor="tabs" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Words and Strength
            </label>
            <select
              id="tabs"
              name="tabs"
              className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={strength}
              onChange={handleStrengthOnchange}
            >
              {strengthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name} words ({option.value} bits)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
              Action
            </label>
            <button
              type="button"
              aria-label="Toggle dark mode"
              className={clsx(
                'relative inline-flex items-center gap-x-1.5',
                'mt-1 rounded-md shadow-sm px-3 py-2',
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
              onChange={(e) => setMnemonicText(e.target.value.replace(/[^a-z\s+]/g, '').replace(/^\s+/g, ''))}
            />
          </div>
          {mnemonicHint && (
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {mnemonicHint}
            </p>
          )}

        </div>

        {/* <div className="sm:col-span-3"></div> */}
      </div>
    </div>
  )
}
