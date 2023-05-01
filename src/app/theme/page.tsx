'use client';

import clsx from 'clsx';
import ThemeToggle from '@/components/root/ThemeToggle';

export default function Page() {
  return (
    <div className="">
      <div className={clsx(
        "mx-auto flex justify-center max-w-7xl",
        "px-6 lg:px-8 py-24 sm:py-32",
      )}>
        <ThemeToggle />
      </div>
    </div>
  )
}
