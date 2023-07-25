'use client';

// import clsx from 'clsx';
// import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { loremIpsum } from "react-lorem-ipsum";


export default function Component() {
  return (
    <div className="bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden  px-6 py-24 text-center sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Trying NextUI
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Under construction...&nbsp;
            {loremIpsum({ avgSentencesPerParagraph: 1, avgWordsPerSentence: 4 })}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              color="primary"
              onClick={() => { console.log('on click event') }}
            >
              Default Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
