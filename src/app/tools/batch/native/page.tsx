'use client';

import clsx from 'clsx';

import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { atomEvmNativeSymbol } from '@/store/store';

const atomSameAmount = atom<boolean>(true);
const atomRecipientsTitle = atom((get) => {
  const _symbol = get(atomEvmNativeSymbol);
  const _sameAmount = get(atomSameAmount);
  if (_symbol && !_sameAmount) return `Recipients and ${_symbol} values`;
  return 'Recipients';
});

const atomRecipientsText = atom<string>('');
const atomRecipientsHint = atom((get) => {
  // const _sameAmount = get(atomSameAmount);
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
});

const atomAmountText = atom<string>('');
const atomAmountHint = atom((get) => {
  // const _sameAmount = get(atomSameAmount);
  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
});

const atomDonateText = atom<string>('');
const atomDonateHint = atom((get) => {
  // const _sameAmount = get(atomSameAmount);
  return 'Donate to help us build more...';
});


export default function Page() {
  const [symbol] = useAtom(atomEvmNativeSymbol);
  const [sameAmount, setSameAmount] = useAtom(atomSameAmount);
  const [recipientsTitle] = useAtom(atomRecipientsTitle);

  const [recipientsText, setRawRecipientsText] = useAtom(atomRecipientsText);
  const [recipientsHint] = useAtom(atomRecipientsHint);

  const [amountText, setRawAmountText] = useAtom(atomAmountText);
  const [amountHint] = useAtom(atomAmountHint);

  const [donateText, setRawDonateText] = useAtom(atomDonateText);
  const [donateHint] = useAtom(atomDonateHint);

  const sameAmountOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAmount(e.target.checked);
  }

  return (
    <div className="space-y-12">
      <div className="mt-4 sm:col-span-4">
        <div className="mt-2 relative flex gap-x-3">
          <div className="flex h-6 items-center">
            <input
              id="same"
              name="same"
              type="checkbox"
              defaultChecked={sameAmount}
              onChange={sameAmountOnchange}
              className={clsx(
                "h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600",
                "border-gray-300 dark:border-white/10",
                "dark:bg-white/5 dark:focus:ring-offset-gray-900",
              )}
            />
          </div>
          <div className="text-sm leading-6 select-none">
            <label htmlFor="same" className="text-gray-500 dark:text-gray-400 cursor-pointer">
              Batch transfer {symbol} to multi recipients with the same amount.
            </label>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-full">
          <label htmlFor="raws" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
            {recipientsTitle}
          </label>
          <div className="mt-2">
            <textarea
              id="raws"
              name="raws"
              aria-describedby="recipient-value-raws"
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                "text-gray-900 dark:text-white",
                "ring-gray-300 dark:ring-white/10",
                "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                "dark:bg-white/5",
              )}
              rows={7}
              value={recipientsText}
              onChange={(e) => setRawRecipientsText(e.target.value.trim())}
            />
          </div>
          {recipientsHint && (
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {recipientsHint}
            </p>
          )}
        </div>

        {sameAmount && (
          <div className="sm:col-span-3">
            <label htmlFor="amount" className="mt-4 block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
              Amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">

              <input
                type="text"
                id="amount"
                name="amount"
                aria-describedby="amount-currency"
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                  "text-gray-900 dark:text-white",
                  "ring-gray-300 dark:ring-white/10",
                  "placeholder:text-gray-300 dark:placeholder:text-gray-600",
                  "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                  "dark:bg-white/5",
                )}
                placeholder="0.0000"
                value={amountText}
                onChange={(e) => setRawAmountText(e.target.value.trim())}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  {symbol}
                </span>
              </div>
            </div>
            {amountHint && (
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {amountHint}
              </p>
            )}
          </div>
        )}

        <div className="sm:col-span-3">
          <label htmlFor="donate" className="mt-4 block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
            Donate
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              id="donate"
              name="donate"
              aria-describedby="donate-currency"
              className={clsx(
                "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                "text-gray-900 dark:text-white",
                "ring-gray-300 dark:ring-white/10",
                "placeholder:text-gray-300 dark:placeholder:text-gray-600",
                "focus:ring-indigo-600 dark:focus:ring-indigo-500",
                "dark:bg-white/5",
              )}
              placeholder="0.005"
              value={donateText}
              onChange={(e) => setRawDonateText(e.target.value.trim())}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                {symbol}
              </span>
            </div>
          </div>
          {donateHint && (
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {donateHint}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
