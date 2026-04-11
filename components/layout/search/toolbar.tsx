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
    <div className="flex items-center justify-between py-4 px-6 bg-[#F5F5F3] border border-neutral-100 rounded-sm mb-0">
      <div className="flex items-center gap-6">
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:text-[#6e3835] transition-colors"
        >
          <FunnelIcon className="h-5 w-5" />
          <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
        </button>
        <div className="h-6 w-[1px] bg-neutral-300 hidden md:block" />
        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 hidden md:block">
          {productCount} Products
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            Sort By:
          </span>
          <div className="w-48">
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-neutral-100" />
              }
            >
              <FilterItemDropdown list={sorting} />
            </Suspense>
          </div>
        </div>
        <div className="flex items-center gap-4 border-l border-neutral-300 pl-6 text-neutral-400">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`transition-colors h-8 w-8 flex items-center justify-center rounded-sm ${
              viewMode === "grid"
                ? "bg-neutral-200 text-neutral-800"
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
