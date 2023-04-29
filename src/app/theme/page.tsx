'use client';

import ThemeToggle from '@/components/root/ThemeToggle';

export default function Page() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto flex justify-center max-w-7xl px-6 lg:px-8">
        <ThemeToggle />
      </div>
    </div>
  )
}
