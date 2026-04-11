"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { Fragment } from "react";

type SimpleLink = {
  title: string;
  path: string;
};

export function ShopByMenu({
  isOpen,
  onClose,
  categories,
  concerns,
}: {
  isOpen: boolean;
  onClose: () => void;
  categories: SimpleLink[];
  concerns: SimpleLink[];
}) {
  const allProductsLinks = [
    { title: "Shop", path: "/search" },
    { title: "Bestsellers", path: "/search?sort=trending-desc" },
    { title: "New Arrivals", path: "/search?sort=latest-desc" },
    { title: "Combos & Kits", path: "/search?q=combo" },
    { title: "Collections", path: "/collections" },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <div className="relative z-[70]">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-[#FAF7F2] shadow-xl">
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                      <h2 className="text-xl font-serif font-bold text-neutral-900">
                        Shop By
                      </h2>
                      <button
                        type="button"
                        className="rounded-full p-2 text-neutral-400 hover:text-neutral-500 hover:bg-white transition-all shadow-sm"
                        onClick={onClose}
                      >
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex-1 px-6 py-8">
                      <div className="space-y-4">
                        {/* All Products Accordion */}
                        <Disclosure
                          as="div"
                          className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between bg-[#F2EDE4]/30 px-5 py-4 text-left">
                                <span className="text-[13px] font-bold uppercase tracking-widest text-neutral-900">
                                  All Products
                                </span>
                                <ChevronDownIcon
                                  className={clsx(
                                    "h-4 w-4 text-neutral-500 transition-transform duration-300",
                                    open && "rotate-180",
                                  )}
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-150 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="px-5 py-4">
                                  <ul className="space-y-4 text-sm">
                                    {allProductsLinks.map((link) => (
                                      <li key={link.title}>
                                        <Link
                                          href={link.path}
                                          onClick={onClose}
                                          className="block text-neutral-600 hover:text-brand-green transition-colors font-sans"
                                        >
                                          {link.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>

                        {/* Shop By Category Accordion */}
                        <Disclosure
                          as="div"
                          className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between bg-[#F2EDE4]/30 px-5 py-4 text-left">
                                <span className="text-[13px] font-bold uppercase tracking-widest text-neutral-900">
                                  Shop By Category
                                </span>
                                <ChevronDownIcon
                                  className={clsx(
                                    "h-4 w-4 text-neutral-500 transition-transform duration-300",
                                    open && "rotate-180",
                                  )}
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-150 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="px-5 py-4">
                                  <ul className="space-y-4 text-sm">
                                    {categories.map((link) => (
                                      <li key={link.title}>
                                        <Link
                                          href={link.path}
                                          onClick={onClose}
                                          className="block text-neutral-600 hover:text-brand-green transition-colors font-sans"
                                        >
                                          {link.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>

                        {/* Shop By Concern Accordion */}
                        <Disclosure
                          as="div"
                          className="overflow-hidden rounded-xl border border-neutral-100 bg-white shadow-sm"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between bg-[#F2EDE4]/30 px-5 py-4 text-left">
                                <span className="text-[13px] font-bold uppercase tracking-widest text-neutral-900">
                                  Shop By Concern
                                </span>
                                <ChevronDownIcon
                                  className={clsx(
                                    "h-4 w-4 text-neutral-500 transition-transform duration-300",
                                    open && "rotate-180",
                                  )}
                                />
                              </Disclosure.Button>
                              <Transition
                                enter="transition duration-150 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                              >
                                <Disclosure.Panel className="px-5 py-4">
                                  <ul className="space-y-4 text-sm">
                                    {concerns.map((link) => (
                                      <li key={link.title}>
                                        <Link
                                          href={link.path}
                                          onClick={onClose}
                                          className="block text-neutral-600 hover:text-brand-green transition-colors font-sans"
                                        >
                                          {link.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </Disclosure.Panel>
                              </Transition>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </div>
    </Transition.Root>
  );
}
