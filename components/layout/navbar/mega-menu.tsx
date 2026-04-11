"use client";

import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

export type MegaMenuLink = {
  title: string;
  path: string;
};

export type MegaMenuCard = {
  title: string;
  path: string;
  image: {
    url: string;
    altText?: string;
  };
};

export function MegaMenu({
  title,
  mainLinks,
  featuredCards,
  gridCols = "grid-cols-4",
}: {
  title: string;
  mainLinks?: MegaMenuLink[];
  featuredCards?: MegaMenuCard[];
  gridCols?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Popover className="static">
      {({ open }) => (
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="h-full flex items-center"
        >
          <Popover.Button
            className={clsx(
              "flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 outline-none h-full",
              open || isHovered
                ? "text-[#6e3835] border-b-2 border-[#6e3835] -mb-[2px]"
                : "text-neutral-700 hover:text-[#6e3835]",
            )}
          >
            <span>{title}</span>
            <ChevronDownIcon
              className={clsx(
                "h-3 w-3 transition-transform duration-300",
                (open || isHovered) && "rotate-180",
              )}
            />
          </Popover.Button>

          <Transition
            show={open || isHovered}
            as={Fragment}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Popover.Panel
              static
              className="absolute left-0 right-0 top-full mt-[1px] w-full z-[60] flex justify-center outline-none"
            >
              <div className="w-full bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] border-b border-neutral-100">
                <div className="max-w-7xl mx-auto flex h-full">
                  {/* Left Sidebar */}
                  {mainLinks && mainLinks.length > 0 && (
                    <div className="w-[280px] bg-white p-12 pr-12 relative flex-shrink-0">
                      <div className="absolute top-12 bottom-12 right-0 border-r border-neutral-100" />
                      <ul className="space-y-6">
                        {mainLinks.map((link) => (
                          <li key={link.title}>
                            <Link
                              href={link.path}
                              className="text-[14px] font-sans font-semibold text-neutral-900 hover:text-[#6e3835] transition-colors uppercase tracking-widest"
                            >
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Right Content */}
                  <div
                    className={clsx(
                      "p-12",
                      mainLinks && mainLinks.length > 0 ? "flex-1" : "w-full",
                    )}
                  >
                    <div className={clsx("grid gap-x-8 gap-y-10", gridCols)}>
                      {featuredCards?.map((card) => (
                        <Link
                          key={card.title}
                          href={card.path}
                          className="group block text-center"
                        >
                          <div className="relative aspect-square overflow-hidden bg-[#FAF7F2] mb-5 rounded-2xl border border-neutral-100/50 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:border-neutral-200">
                            {card.image?.url ? (
                              <Image
                                src={card.image.url}
                                alt={card.image.altText || card.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="200px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-[10px] text-neutral-400 font-semibold uppercase tracking-tighter">
                                No Image
                              </div>
                            )}
                          </div>
                          <h3 className="text-[13px] font-sans font-semibold text-neutral-800 group-hover:text-[#6e3835] transition-colors leading-tight tracking-wide">
                            {card.title}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}
