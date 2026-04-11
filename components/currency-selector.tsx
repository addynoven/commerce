"use client";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { useCurrency } from "./currency-context";

export function CurrencySelector() {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();

  return (
    <div className="relative">
      <Listbox value={currency.code} onChange={setCurrency}>
        <div className="relative">
          <Listbox.Button className="flex items-center gap-1 cursor-pointer group outline-none">
            <span className="text-lg">{currency.flag}</span>
            <span className="text-xs font-bold font-sans tracking-widest text-neutral-700 group-hover:text-brand-hover transition-colors">
              {currency.label}
            </span>
            <ChevronDownIcon
              className="w-3 h-3 text-neutral-400 group-hover:text-brand-hover transition-colors"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute left-0 mt-2 w-40 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-[60]">
              {supportedCurrencies.map((c) => (
                <Listbox.Option
                  key={c.code}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 px-4 text-sm transition-colors",
                      active
                        ? "bg-brand-cream text-brand-hover"
                        : "text-neutral-900",
                    )
                  }
                  value={c.code}
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-3">
                      <span className="text-base">{c.flag}</span>
                      <span
                        className={clsx(
                          "block truncate",
                          selected ? "font-bold" : "font-normal",
                        )}
                      >
                        {c.code} ({c.symbol})
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
