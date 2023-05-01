'use client';

import clsx from 'clsx';
import Tabs from './tabs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Tabs />
      <div className={clsx(
        "mx-auto max-w-7xl",
        "px-6 lg:px-8 pt-8 pb-4 sm:pt-12 sm:pb-6",
        "space-y-6",
      )}>
        {children}
      </div>
    </>
  )
}
