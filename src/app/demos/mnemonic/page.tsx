import clsx from 'clsx';
import Title from './title';

export default function Page() {
  return (
    <div className="">
      <Title />
      <div className={clsx(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32",
        "text-gray-700 dark:text-white text-center text-3xl"
      )}>
        Under construction...
      </div>
    </div>
  )
}
