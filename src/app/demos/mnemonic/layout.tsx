import InProgress from '@/components/in-progress';

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <InProgress />
      {children}
    </>
  )
}
