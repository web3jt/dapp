import { Providers } from './providers';
import Tip from '@/components/root/Tip';
import Nav from '@/components/root/Nav';
import Footer from '@/components/root/Footer';
import '@/app/styles/globals.css';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
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

// className="bg-gray-950"
