"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CurrencySelector } from "components/currency-selector";
import { Customer, Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";
import Search, { SearchSkeleton } from "./search";

export default function MobileMenu({ menu, customer }: { menu: Menu[]; customer: Customer | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const secondaryLinks = [
    ...(customer 
      ? [{ title: `Welcome, ${customer.firstName}`, path: "/account" }]
      : [{ title: "Login / Register", path: "/account/login" }]),
    { title: "About Us", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "Book Consultation", path: "/consultation" },
    { title: "Sacred Lotus Retreat", path: "/retreat" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-sm border border-neutral-100 bg-white text-black transition-all hover:bg-neutral-50 md:hidden shadow-sm"
      >
        <Bars3Icon className="h-5 w-5" />
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={closeMobileMenu} className="relative z-[100]">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-500"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-sm"
            leave="transition-all ease-in-out duration-400"
            leaveFrom="opacity-100 backdrop-blur-sm"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-500"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-400"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-[#FAF7F2] pb-6 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Header with Close and Currency */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-white">
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-400 hover:text-neutral-900 transition-colors"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                  <CurrencySelector />
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  {/* Search */}
                  <div className="mb-10 w-full">
                    <Suspense fallback={<SearchSkeleton />}>
                      <Search />
                    </Suspense>
                  </div>

                  {/* Main Secondary Links */}
                  <ul className="flex w-full flex-col space-y-6">
                    {secondaryLinks.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.path}
                          onClick={closeMobileMenu}
                          className="text-[14px] font-bold uppercase tracking-[0.15em] text-neutral-900 hover:text-[#6e3835] transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
