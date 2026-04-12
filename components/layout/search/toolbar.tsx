"use client";

import {
    FunnelIcon,
    ListBulletIcon,
    Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import FilterItemDropdown from "./filter/dropdown";

export default function Toolbar({
  productCount,
  onToggleFilters,
  showFilters,
  viewMode,
  onViewModeChange,
}: {
  productCount: number;
  onToggleFilters: () => void;
  showFilters: boolean;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-[#F5F5F3] border border-neutral-100 rounded-sm mb-0">
      {/* Row 1 (mobile) / Left group (desktop): filters + product count */}
      <div className="flex items-center justify-between gap-6 py-4 px-4 md:px-6 border-b md:border-b-0 border-neutral-200/60">
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:text-[#6e3835] transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
        <div className="h-6 w-[1px] bg-neutral-300 hidden md:block" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {productCount} Products
        </span>
      </div>

      {/* Row 2 (mobile) / Right group (desktop): sort + view toggles */}
      <div className="flex items-center justify-between gap-3 py-3 md:py-4 px-4 md:px-6 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex-none">
            Sort By:
          </span>
          <div className="w-full max-w-[180px] md:w-48">
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-neutral-100" />
              }
            >
              <FilterItemDropdown list={sorting} />
            </Suspense>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 md:border-l md:border-neutral-300 md:pl-6 text-neutral-400 flex-none">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`transition-colors h-8 w-8 flex items-center justify-center rounded-sm ${
              viewMode === "grid"
                ? "text-[#6D8060]"
                : "hover:text-[#6e3835]"
            }`}
            aria-label="Grid View"
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`transition-colors h-8 w-8 flex items-center justify-center rounded-sm ${
              viewMode === "list"
                ? "bg-neutral-200 text-neutral-800"
                : "hover:text-[#6e3835]"
            }`}
            aria-label="List View"
          >
            <ListBulletIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
