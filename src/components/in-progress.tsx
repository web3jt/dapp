import { InformationCircleIcon } from '@heroicons/react/20/solid';

export default function Component() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2 sm:py-4 text-gray-700 dark:text-white text-center text-xl">
        <div className="rounded-md bg-blue-50 dark:bg-blue-950 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400 dark:text-blue-600" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                This page is a work in progress.
              </p>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
