'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useAtom(atomDarkMode);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <Switch
      checked={darkMode}
      onChange={setDarkMode}
      className={clsx(
        darkMode ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={clsx(
          darkMode ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={clsx(
            darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-gray-400" aria-hidden="true" />
        </span>
        <span
          className={clsx(
            darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-indigo-600" aria-hidden="true" />
        </span>
      </span>
    </Switch>
  )
}
