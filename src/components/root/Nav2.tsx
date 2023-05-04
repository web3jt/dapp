'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '@/components/root/ThemeToggle';
import Connect from '@/components/web3/connect';

const navigation = {
  group0: [
    { name: 'Placeholder', href: '/placeholder' },
  ],
  categories: [
    {
      name: 'More',
      tools: [
        [
          { name: 'Suspendisse', href: '#' },
          { name: 'Aliquet', href: '#' },
          { name: 'Tempor', href: '#' },
          { name: 'Odio', href: '#' },
          { name: 'Facilisis', href: '#' },
          { name: 'Luctus', href: '#' },
        ],
        [
          { name: 'Vitae', href: '#' },
          { name: 'Nulla', href: '#' },
          { name: 'Condimentum', href: '#' },
          { name: 'Justo', href: '#' },
          { name: 'Diam sit', href: '#' },
        ],
      ],
      batch: [
        { name: 'Native', href: '/tools/batch/native' },
        { name: 'ERC20', href: '/tools/batch/erc20' },
        { name: 'ERC721', href: '/tools/batch/erc721' },
        { name: 'ERC1155', href: '/tools/batch/erc1155' },
      ],
      categories: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Sale', href: '#' },
        { name: 'Basic Tees', href: '#' },
        { name: 'Artwork Tees', href: '#' },
      ],
    },
    // {
    //   name: 'Men',
    //   clothing: [
    //     [
    //       { name: 'Dress Shirts', href: '#' },
    //       { name: 'Pants', href: '#' },
    //       { name: 'Jackets', href: '#' },
    //       { name: 'T-Shirts', href: '#' },
    //       { name: 'Jeans', href: '#' },
    //       { name: 'Hoodies', href: '#' },
    //     ],
    //     [
    //       { name: 'Vests', href: '#' },
    //       { name: 'Kilts', href: '#' },
    //       { name: 'Outdoors', href: '#' },
    //       { name: 'Capes', href: '#' },
    //       { name: 'Browse All', href: '#' },
    //     ],
    //   ],
    //   accessories: [
    //     { name: 'Watches', href: '#' },
    //     { name: 'Boots', href: '#' },
    //     { name: 'Fanny Packs', href: '#' },
    //     { name: 'Sunglasses', href: '#' },
    //     { name: 'Browse All', href: '#' },
    //   ],
    //   categories: [
    //     { name: 'Just Added', href: '#' },
    //     { name: 'Clearance', href: '#' },
    //     { name: 'Graphic Tees', href: '#' },
    //   ],
    // },
  ],
  other: [
    { name: 'Stores', href: '#' },
  ],
}

export default function Nav() {
  return (
    <div className="bg-white">
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 px-4 pb-14 sm:px-0 sm:pb-0">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <Link href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  {navigation.group0.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {navigation.categories.map((category, categoryIdx) => (
                    <Popover key={categoryIdx} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={clsx(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                "transition-colors duration-200 ease-out",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium",
                                "focus:outline-none",
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 z-10 top-full text-gray-500 sm:text-sm">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white select-none">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 pb-12 pt-10 md:grid-cols-2 lg:gap-x-8">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                                      <div>
                                        <p id="tools-heading" className="font-medium text-gray-900">
                                          Lorem ipsum dolor
                                        </p>
                                        <div className="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                          <ul
                                            role="list"
                                            aria-labelledby="tools-heading"
                                            className="space-y-6 sm:space-y-4"
                                          >
                                            {category.tools[0].map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                          <ul
                                            role="list"
                                            aria-label="More tools"
                                            className="mt-6 space-y-6 sm:mt-0 sm:space-y-4"
                                          >
                                            {category.tools[1].map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:gap-x-8">
                                      <div>
                                        <p id="batch-heading" className="font-medium text-gray-900">
                                          Batch Transfer
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="batch-heading"
                                          className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                        >
                                          {category.batch.map((item) => (
                                            <li key={item.name} className="flex">
                                              <Link href={item.href} className="hover:text-gray-800">
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <p id="categories-heading" className="font-medium text-gray-900">
                                          Categories
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby="categories-heading"
                                          className="mt-4 space-y-6 border-t border-gray-200 pt-6 sm:space-y-4"
                                        >
                                          {category.categories.map((item) => (
                                            <li key={item.name} className="flex">
                                              <Link href={item.href} className="hover:text-gray-800">
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.other.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex flex-1 items-center justify-end space-x-4">
                <ThemeToggle />
                <Connect></Connect>

                {/* Cart */}
                {/* <div className="ml-4 flow-root lg:ml-8">
                  <Link href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
