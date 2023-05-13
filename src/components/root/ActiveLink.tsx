import React, { PropsWithChildren, useState, useEffect } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

type ActiveLinkProps = LinkProps & {
  className?: string
  defaultClassName?: string,
  activeClassName: string,
}

const ActiveLink = ({ children, className, activeClassName, defaultClassName, ...props }: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();
  // const searchParams = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    if (pathname === props.href.toString().trim()) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    const newClassName = isActive ? clsx(className, activeClassName) : clsx(className, defaultClassName);
    if (newClassName !== computedClassName) setComputedClassName(newClassName);
  }, [
    isActive,
    props.href,
    className,
    defaultClassName,
    activeClassName,
    pathname,
    // searchParams,
    computedClassName,
  ])

  return (
    <Link className={computedClassName} aria-current={isActive ? 'page' : undefined} {...props}>
      {children}
    </Link>
  )
}

export default ActiveLink;