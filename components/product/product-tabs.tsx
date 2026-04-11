"use client";

import { useState } from "react";

type Tab = {
  label: string;
  content: string;
};

export function ProductTabs({ descriptionHtml }: { descriptionHtml: string }) {
  const tabs: Tab[] = [
    { label: "Description", content: descriptionHtml },
    { label: "Benefits", content: "" },
    { label: "How To Use", content: "" },
    { label: "Ingredients", content: "" },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-neutral-200">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`flex-1 py-5 text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 border-r border-white last:border-r-0 ${
              activeTab === idx
                ? "text-[#A65B4A] bg-[#FAF7F2]"
                : "text-white bg-[#A65B4A] hover:bg-[#8B4C3E]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-12 px-6 md:px-12 bg-white min-h-[300px]">
        {tabs[activeTab]?.content ? (
          <div
            className="prose prose-neutral max-w-none prose-p:text-[15px] prose-p:text-neutral-600 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-neutral-900"
            dangerouslySetInnerHTML={{
              __html: tabs[activeTab]?.content || "",
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-[14px] text-neutral-400 font-medium max-w-xs">
              Detailed information about &quot;{tabs[activeTab]?.label}&quot; for this product is coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
