"use client";

import { createContext, useContext, useState } from "react";
import FilterSidebar from "./filter-sidebar";
import Toolbar from "./toolbar";

const ViewModeContext = createContext<{
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}>({
  viewMode: "grid",
  setViewMode: () => {},
});

export const useViewMode = () => useContext(ViewModeContext);

export default function SearchPageWrapper({
  children,
  header,
  collections,
  concerns,
  productCount,
  quantities = [],
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  collections: any[];
  concerns?: any[];
  productCount: number;
  quantities?: any[];
}) {
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      <div className="w-full flex justify-center bg-white min-h-screen">
        <div className="w-full max-w-[1440px] px-4 md:px-8 lg:px-12 xl:px-24 pt-8">
          
          {/* Header Row (Breadcrumbs) */}
          {header && (
            <div className="w-full mb-6">
              {header}
            </div>
          )}

          {/* Toolbar Row */}
          <div className="w-full mb-8">
            <Toolbar
              productCount={productCount}
              onToggleFilters={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 pb-24">
            {/* Sidebar */}
            {showFilters && (
              <aside className="hidden md:block w-[280px] flex-none animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="sticky top-24">
                  <FilterSidebar
                    collections={collections}
                    concerns={concerns || []}
                    quantities={quantities}
                  />
                </div>
              </aside>
            )}

            {/* Main Content (Results Grid) */}
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ViewModeContext.Provider>
  );
}
