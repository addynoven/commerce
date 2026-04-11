"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <Form action="/search" className="w-full relative group">
      <button
        type="submit"
        className="absolute left-0 top-0 ml-4 flex h-full items-center text-neutral-400 hover:text-brand-hover transition-colors z-10"
      >
        <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
      </button>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Search by products, concerns or ingredients"
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-sm w-full border border-neutral-200 bg-white rounded flex items-center px-4 py-[10px] pl-11 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-brand-hover transition-colors"
      />
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-full relative">
      <div className="absolute left-0 top-0 ml-4 flex h-full items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-[18px] w-[18px] text-neutral-400" />
      </div>
      <input
        placeholder="Search by products, concerns or ingredients"
        className="w-full border border-neutral-200 bg-white rounded flex items-center px-4 py-[10px] pl-11 text-sm text-neutral-800 placeholder:text-neutral-400"
      />
    </form>
  );
}
