import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Tip from '@/components/tips/Sample';
import Nav from '@/components/root/Nav2';
import Footer from '@/components/root/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>

      <body className={clsx(
        inter.className,
        "bg-white dark:bg-gray-950",
      )}>
        <Providers>
          <Tip />
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
