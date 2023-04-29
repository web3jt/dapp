'use client';

import { useAtom } from 'jotai';
import { atomDarkMode } from '@/store/store';

export default function Page() {
    const [darkMode] = useAtom(atomDarkMode);

    return (
        <div className="py-24 sm:py-32 bg-white dark:bg-gray-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                darkMode: {darkMode ? 'true' : 'false'}
            </div>
        </div>
    )
}
