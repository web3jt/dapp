'use client';

import clsx from 'clsx';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch as HSwitch } from '@headlessui/react';
import { Switch as NSwitch } from "@nextui-org/react";
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid';
import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useAtom(atomDarkMode);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode, setTheme]);

  return (
    // <NSwitch
    //   defaultSelected={darkMode}
    //   color="primary"
    //   thumbIcon={({ isSelected, className }: { isSelected: boolean, className: string }) =>
    //     isSelected ? (
    //       <MoonIcon className={className} />
    //     ) : (
    //       <SunIcon className={className} />
    //     )
    //   }
    //   onValueChange={setDarkMode}
    // >
    //   Dark mode
    // </NSwitch>

    <HSwitch
      id="theme-toggle" // if you remove this, there will be a warning in the console
      checked={darkMode}
      onChange={setDarkMode}
      className={clsx(
        darkMode ? "bg-indigo-600" : "bg-gray-200",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "transition-colors duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
      )}
    >
      <span className="sr-only">Dark Mode</span>
      <span
        className={clsx(
          darkMode ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
        )}
      >
        <span
          className={clsx(
            darkMode ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
            "text-gray-700 hover:text-gray-800",
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3" aria-hidden="true" />
        </span>
        <span
          className={clsx(
            darkMode ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
            "text-indigo-600 hover:text-indigo-500",
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3" aria-hidden="true" />
        </span>
      </span>
    </HSwitch>
  )
}
