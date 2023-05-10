'use client';

import clsx from 'clsx';
import Link from 'next/link';

export default function Example() {

  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden  px-6 py-24 text-center sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Boost your productivity today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur
            commodo do ea.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className={clsx(
                "rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                "bg-indigo-600 text-white  hover:bg-indigo-500 focus-visible:outline-indigo-600",
                "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus-visible:outline-white",
              )}
            >
              Get started
            </Link>
            <Link href="#" className={clsx(
              "text-sm font-semibold leading-6",
              "text-gray-900 dark:text-white",
            )}>
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
          {/* <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg> */}
        </div>
      </div>
    </div>
  )
}
