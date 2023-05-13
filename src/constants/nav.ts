'use client';

interface UserNavItem {
  name: string;
  href: string;
}

export const userNavigations: UserNavItem[] = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Preferences', href: '/dashboard/preferences' },
  // { name: 'Connections', href: '/dashboard/connections' },
];