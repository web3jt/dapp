import clsx from 'clsx';


export function Grid6({
  className,
  children,
}: {
  className?: string,
  children: React.ReactNode
}) {
  return (
    <div className={clsx(
      className,
      "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",
    )}>
      {children}
    </div>
  )
}


export default function Layout({
  className,
  children,
}: {
  className?: string,
  children: React.ReactNode
}) {
  return (
    <div className={clsx(
      className,
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    )}>
      {children}
    </div>
  )
}
