'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Switch } from '@headlessui/react';
import { atom, useAtom } from 'jotai';
import Container, { Grid6 } from '@/components/root/container';
import { atomDarkMode } from '@/store/store';
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';

const atomEncoded = atom<string>('');
const atomDecoded = atom<string>('');
const atomEncodedError = atom<string>('');
const atomDecodedError = atom<string>('');

const atomHorizontal = atom<boolean>(false);


export default function Page() {
  const [darkMode] = useAtom(atomDarkMode);
  const [horizontal, setHorizontal] = useAtom(atomHorizontal);

  const handleHorizontalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setHorizontal(e.target.checked);
  }

  const [encoded, setEncoded] = useAtom(atomEncoded);
  const [decoded, setDecoded] = useAtom(atomDecoded);

  const [encodedError, setEncodedError] = useAtom(atomEncodedError);
  const [decodedError, setDecodedError] = useAtom(atomDecodedError);

  const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEncoded(value);
    setEncodedError('');
    try {
      const decoded = atob(value);
      setDecoded(decoded);
    } catch (err: any) {
      setEncodedError(err.message);
    }
  }

  const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDecoded(value);
    setDecodedError('');
    try {
      const encoded = btoa(value);
      setEncoded(encoded);
    } catch (err: any) {
      setDecodedError(err.message);
    }
  }


  return (
    <>
      <Container className="py-12 sm:py-20">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Base64 Decoder/Encoder
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <div className="mt-4 sm:col-span-4">
          <div className="mt-2 relative flex gap-x-3">
            <div className="flex h-6 items-center">
              <input
                id="same"
                name="same"
                type="checkbox"
                defaultChecked={horizontal}
                onChange={handleHorizontalOnChange}
                className={clsx(
                  "h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600",
                  "border-gray-300 dark:border-white/10",
                  "dark:bg-white/5 dark:focus:ring-offset-gray-900",
                )}
              />
            </div>
            <div className="text-sm leading-6 select-none">
              <label htmlFor="same" className="text-gray-500 dark:text-gray-400 cursor-pointer">
                Horizontal Layout
              </label>
            </div>
          </div>
        </div>

        <Grid6 className="mt-10">
          <div className={clsx(
            horizontal ? "col-span-3" : "col-span-full"
          )}>
            <label htmlFor="raws" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
              Encoded
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
                rows={horizontal ? 11 : 4}
                value={encoded}
                // aria-invalid={!mnemonicValid}
                onChange={handleEncodedChange}
              />
            </div>
            {encodedError && (
              <p className="mt-1 text-sm leading-6 text-rose-600 dark:text-rose-400" id="mnemonic-hint">
                {encodedError}
              </p>
            )}
          </div>

          <div className={clsx(
            horizontal ? "col-span-3" : "col-span-full"
          )}>
            <label htmlFor="raws" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white select-none">
              Decoded
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
                rows={horizontal ? 11 : 4}
                value={decoded}
                // aria-invalid={!mnemonicValid}
                onChange={handleDecodedChange}
              />
            </div>
            {decodedError && (
              <p className="mt-1 text-sm leading-6 text-rose-600 dark:text-rose-400" id="mnemonic-hint">
                {decodedError}
              </p>
            )}
          </div>
        </Grid6>

      </Container>
    </>
  )
}
