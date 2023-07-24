import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Tip from '@/components/tips/sample2023';
import Nav from '@/components/root/NavNew';
import Footer from '@/components/root/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'dApp scaffold',
  description: 'dApp scaffold created by @web3jt',
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={clsx(inter.className, "bg-white dark:bg-black")}>
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
