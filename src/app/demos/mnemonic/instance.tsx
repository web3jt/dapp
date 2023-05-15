'use client';

import clsx from 'clsx';
import Link from 'next/link';
import * as BIP39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { HDKey, hdKeyToAccount } from 'viem/accounts'
import { atom, useAtom } from 'jotai';
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid';

const atomStrength = atom<number>(128);
const strengthOptions = [
  { name: '12', value: 128 },
  { name: '15', value: 160 },
  { name: '18', value: 192 },
  { name: '21', value: 224 },
  { name: '24', value: 256 },
];
const atomMnemonicText = atom<string>('');
const atomMnemonicPhrases = atom((get) => get(atomMnemonicText).trim());
const atomMnemonicArray = atom((get) => get(atomMnemonicPhrases).split(/\s+/));
const atomMnemonicValid = atom((get) => BIP39.validateMnemonic(get(atomMnemonicPhrases), wordlist));
const atomMnemonicError = atom((get) => {
  const _length = get(atomMnemonicArray).length;

  if (0 === _length) return 'Please enter mnemonic or generate words';
  if (12 > _length) return 'Please enter at least 12 words';
  if (24 < _length) return 'Please enter at most 24 words';
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

  const _valid = get(atomMnemonicValid);
  return _valid ? undefined : 'Invalid mnemonic words';
});

const atomSeed = atom((get) => {
  const _valid = get(atomMnemonicValid);
  return _valid ? BIP39.mnemonicToSeedSync(get(atomMnemonicPhrases)) : undefined;
});

const atomSeedHex = atom((get) => {
  const _seed = get(atomSeed);
  return _seed ? Buffer.from(_seed).toString('hex') : '';
});

const atomHDKey = atom((get) => {
  const _seed = get(atomSeed);
  return _seed ? HDKey.fromMasterSeed(_seed) : undefined;
});

const atomPrivateExtendedKey = atom((get) => {
  const _hdKey = get(atomHDKey);
  return _hdKey ? _hdKey.privateExtendedKey : '';
});

const atomPublicExtendedKey = atom((get) => {
  const _hdKey = get(atomHDKey);
  return _hdKey ? _hdKey.publicExtendedKey : '';
});



export default function Component() {
  const [strength, setStrength] = useAtom(atomStrength);
  const [mnemonicText, setMnemonicText] = useAtom(atomMnemonicText);
  const [mnemonicError] = useAtom(atomMnemonicError);
  const [mnemonicIsValid] = useAtom(atomMnemonicValid);
  const [seed] = useAtom(atomSeed);
  const [seedHex] = useAtom(atomSeedHex);

  const [privateExtendedKey] = useAtom(atomPrivateExtendedKey);
  const [publicExtendedKey] = useAtom(atomPublicExtendedKey);

  const handleStrengthOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => setStrength(parseInt(e.target.value));
  const handleGenerateMnemonic = () => setMnemonicText(BIP39.generateMnemonic(wordlist, strength));


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 space-y-12">

      <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Step #1 - Mnemonic
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Generate a random set of mnemonic phrases, ref: <Link
            className="text-blue-600 dark:text-blue-400 hover:underline"
            target="_blank"
            href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki"
          >
            BIP39
          </Link>
        </p>

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
            <div className="mt-1">
              <textarea
                id="mnemonic"
                name="mnemonic"
                aria-describedby="mnemonic-hint"
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 shadow-sm font-mono",
                  "ring-1 ring-inset focus:ring-2 focus:ring-inset",
                  "sm:text-sm sm:leading-6",
                  "text-gray-900 dark:text-white",
                  "ring-gray-300 dark:ring-white/10",
                  "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                  "dark:bg-white/10",
                )}
                rows={4}
                value={mnemonicText}
                aria-invalid={!mnemonicIsValid}
                onChange={(e) => setMnemonicText(e.target.value.replace(/[^a-z\s+]/g, '').replace(/^\s+/g, ''))}
              />
            </div>
            {mnemonicError ? (
              <p className="mt-1 text-sm leading-6 text-rose-600 dark:text-rose-400" id="mnemonic-hint">
                {mnemonicError}
              </p>
            ) : (
              <p className="mt-1 text-sm leading-6 text-emerald-600 dark:text-emerald-400" id="mnemonic-hint">
                Mnemonic is valid.
              </p>
            )}
          </div>


          {/* <div className="sm:col-span-3"></div> */}
        </div>
      </div>


      {seed && (
        <div className="border-b border-gray-900/10 dark:border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
            Step #2 - HDKey
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
            Derived from mnemonic, ref: <Link
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki"
            >
              BIP32
            </Link>
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


            <div className="col-span-full">
              <label htmlFor="seed" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
                Seed
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="seed"
                  id="seed"
                  className={clsx(
                    "block w-full rounded-md border-0 py-1.5 shadow-sm font-mono",
                    "ring-1 ring-inset focus:ring-2 focus:ring-inset",
                    "sm:text-sm sm:leading-6",
                    "text-gray-900 dark:text-white",
                    "ring-gray-300 dark:ring-white/10",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                    "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                    "dark:bg-white/10",
                  )}
                  placeholder="Seed derived from mnemonic phrases"
                  defaultValue={seedHex}
                  aria-invalid={Boolean(seed)}
                  disabled
                />
                {seedHex && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                )}
              </div>

            </div>

            <div className="col-span-full">
              <label htmlFor="private-extended-key" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
                BIP32 Private Extended Key
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="private-extended-key"
                  id="private-extended-key"
                  className={clsx(
                    "block w-full rounded-md border-0 py-1.5 shadow-sm font-mono",
                    "ring-1 ring-inset focus:ring-2 focus:ring-inset",
                    "sm:text-sm sm:leading-6",
                    "text-gray-900 dark:text-white",
                    "ring-gray-300 dark:ring-white/10",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                    "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                    "dark:bg-white/10",
                  )}
                  placeholder="Seed derived from mnemonic phrases"
                  defaultValue={privateExtendedKey}
                  aria-invalid={Boolean(seed)}
                  disabled
                />
                {privateExtendedKey && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                )}
              </div>

            </div>

            <div className="col-span-full">
              <label htmlFor="public-extended-key" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
                BIP32 Public Extended Key
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  name="public-extended-key"
                  id="public-extended-key"
                  className={clsx(
                    "block w-full rounded-md border-0 py-1.5 shadow-sm font-mono",
                    "ring-1 ring-inset focus:ring-2 focus:ring-inset",
                    "sm:text-sm sm:leading-6",
                    "text-gray-900 dark:text-white",
                    "ring-gray-300 dark:ring-white/10",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                    "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                    "dark:bg-white/10",
                  )}
                  placeholder="Seed derived from mnemonic phrases"
                  defaultValue={publicExtendedKey}
                  aria-invalid={Boolean(seed)}
                  disabled
                />
                {publicExtendedKey && (
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                )}
              </div>

            </div>



            {/* <div className="sm:col-span-3"></div> */}
          </div>
        </div>

      )}

    </div>
  )
}
