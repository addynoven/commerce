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

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full bg-[#FAF7F2]">
      {tabs.map((tab, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={tab.label}
            className="border-b border-neutral-200/70 last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 md:py-6 text-left transition-colors hover:bg-[#F3EEE5]"
            >
              <span className="font-serif text-[18px] md:text-[22px] text-neutral-900">
                {tab.label}
              </span>
              <span
                className={`flex-none w-6 h-6 flex items-center justify-center text-neutral-700 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line x1="10" y1="4" x2="10" y2="16" />
                  <line x1="4" y1="10" x2="16" y2="10" />
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  {tab.content ? (
                    <div
                      className="prose prose-neutral max-w-none prose-p:text-[15px] prose-p:text-neutral-600 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-neutral-900"
                      dangerouslySetInnerHTML={{ __html: tab.content }}
                    />
                  ) : (
                    <p className="text-[14px] text-neutral-500 font-medium leading-relaxed">
                      Detailed information about &quot;{tab.label}&quot; for
                      this product is coming soon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
