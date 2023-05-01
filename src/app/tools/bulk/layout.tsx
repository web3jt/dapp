'use client';

import Tabs from './tabs';
import ThemeToggle from '@/components/root/ThemeToggle';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Tabs />
      <div>
        {children}
      </div>
      <ThemeToggle />
    </>
  )
}
