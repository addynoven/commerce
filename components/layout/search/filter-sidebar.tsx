"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PriceSlider } from "./price-slider";

const QUANTITIES = ["100g", "250g", "500g", "100ml", "250ml", "500ml"];
const AVAILABILITIES = ["In Stock", "Out Of Stock"];

// Shallow URL update — skips Next.js server re-render. useSearchParams()
// still reflects the new values because it reads from window.history.
function shallowReplace(pathname: string, params: URLSearchParams) {
  const qs = params.toString();
  const url = qs ? `${pathname}?${qs}` : pathname;
  window.history.replaceState(null, "", url);
  // Notify listeners that depend on URL (useSearchParams already handles this).
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export default function FilterSidebar({
  collections,
  concerns,
  quantities: initialQuantities,
}: {
  collections: any[];
  concerns: any[];
  quantities?: any[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("minPrice")) || 0
  );
  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("maxPrice")) || 2500
  );

  useEffect(() => {
    setMinPrice(Number(searchParams.get("minPrice")) || 0);
    setMaxPrice(Number(searchParams.get("maxPrice")) || 2500);
  }, [searchParams]);

  const updateFilters = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (checked) {
      if (!currentValues.includes(value)) {
        params.append(key, value);
      }
    } else {
      const newValues = currentValues.filter((v) => v !== value);
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));
    }

    shallowReplace(pathname, params);
  };

  const updatePrice = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min > 0) params.set("minPrice", min.toString());
    else params.delete("minPrice");

    if (max < 2500) params.set("maxPrice", max.toString());
    else params.delete("maxPrice");

    shallowReplace(pathname, params);
  };

  const handleAvailableChange = (label: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (label === "In Stock") {
      if (checked) params.set("available", "true");
      else params.delete("available");
    } else if (label === "Out Of Stock") {
      if (checked) params.set("available", "false");
      else params.delete("available");
    }
    shallowReplace(pathname, params);
  };

  const isChecked = (key: string, value: string) => {
    if (key === "available") {
      const val = searchParams.get("available");
      if (value === "In Stock") return val === "true";
      if (value === "Out Of Stock") return val === "false";
      return false;
    }
    return searchParams.getAll(key).includes(value);
  };

  const clearAll = () => {
    shallowReplace(pathname, new URLSearchParams());
  };

  return (
    <div className="space-y-6 bg-[#FAF7F2] p-5 md:p-6 rounded-[10px] max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar border border-neutral-100 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <h2 className="text-lg font-serif font-bold text-neutral-900">Filters</h2>
        <button
          onClick={clearAll}
          className="text-[10px] font-bold text-[#A65B4A] uppercase tracking-widest hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Categories Filter */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-b border-neutral-100 pb-4">
            <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
                Categories
              </span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-neutral-400 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-3">
              {collections.map((item) => (
                <label key={item.handle} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked("category", item.title)}
                    onChange={(e) => updateFilters("category", item.title, e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-200 text-[#6B8E67] focus:ring-[#6B8E67] transition-all"
                  />
                  <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {item.title}
                  </span>
                </label>
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* Concerns Filter */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-b border-neutral-100 pb-4">
            <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
                Concerns
              </span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-neutral-400 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-3">
              {concerns.map((item) => (
                <label key={item.handle} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked("concern", item.title)}
                    onChange={(e) => updateFilters("concern", item.title, e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-200 text-[#6B8E67] focus:ring-[#6B8E67] transition-all"
                  />
                  <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {item.title}
                  </span>
                </label>
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      {/* Quantity Filter */}
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-b border-neutral-100 pb-4">
            <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
                Quantity
              </span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-neutral-400 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-3">
              {(initialQuantities?.length ? initialQuantities : QUANTITIES).map((q) => (
                <label key={q} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked("quantity", q)}
                    onChange={(e) => updateFilters("quantity", q, e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-200 text-[#6B8E67] focus:ring-[#6B8E67] transition-all"
                  />
                  <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {q}
                  </span>
                </label>
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="border-b border-neutral-100 pb-4">
            <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
                Price
              </span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-neutral-400 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-6 pb-2">
              <PriceSlider
                min={0}
                max={2500}
                currentMin={minPrice}
                currentMax={maxPrice}
                onChange={updatePrice}
              />
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="pb-4">
            <Disclosure.Button className="flex w-full items-center justify-between py-2 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-900">
                Availability
              </span>
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-neutral-400 transition-transform", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="pt-4 space-y-3">
              {AVAILABILITIES.map((label) => (
                <label key={label} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked("available", label)}
                    onChange={(e) => handleAvailableChange(label, e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-200 text-[#6B8E67] focus:ring-[#6B8E67] transition-all"
                  />
                  <span className="ml-3 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
