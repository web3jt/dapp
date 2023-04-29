'use client';

import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';
import ThemeToggle from '@/components/root/ThemeToggle';

export default function Page() {
    const [darkMode] = useAtom(atomDarkMode);

    return (
        <div className="py-24 sm:py-32 bg-white dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-gray-900 dark:text-white">
                    darkMode: {darkMode ? 'true' : 'false'}
                </div>
                <ThemeToggle />
            </div>
        </div>
    )
}
