'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { atom, useAtom } from 'jotai';
import Container, { Grid6 } from '@/components/root/container';

const atomEncoded = atom<string>('');
const atomDecoded = atom<string>('');
const atomEncodedError = atom<string>('');

const atomDecodedRawsArray = atom<string[] | undefined>((get => {
  const decoded = get(atomDecoded);
  if (!decoded) return undefined;
  return decoded.split('\n');
}));

export default function Page() {
  const [encoded, setEncoded] = useAtom(atomEncoded);
  const [decoded, setDecoded] = useAtom(atomDecoded);

  const [encodedError, setEncodedError] = useAtom(atomEncodedError);

  const [decodedRawsArray] = useAtom(atomDecodedRawsArray);

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

  return (
    <>
      <Container className="py-12 sm:py-20">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
          Base64 Decoder/Encoder
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <Grid6 className="mt-10">
          <div className="col-span-full">
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
                rows={4}
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
        </Grid6>



        {decodedRawsArray && (
          <div className="mt-10">
            {decodedRawsArray}
          </div>
        )}


      </Container>
    </>
  )
}
