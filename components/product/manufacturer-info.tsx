"use client";

import { Product } from "lib/shopify/types";
import { useState } from "react";

type InfoTab = "manufacturer" | "additional" | "faqs";

export function ManufacturerInfo({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<InfoTab>("manufacturer");
  const [openMobile, setOpenMobile] = useState<InfoTab | null>("manufacturer");

  const tabs: { key: InfoTab; label: string }[] = [
    { key: "manufacturer", label: "Manufacturer Information" },
    { key: "additional", label: "Additional Information" },
    { key: "faqs", label: "FAQs" },
  ];

  const ProductImage = () => (
    <div className="w-full aspect-square md:aspect-[1.5/1] relative rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-8 border border-neutral-100">
      {product.featuredImage ? (
        <img
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          className="max-w-full max-h-full object-contain"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
          <svg
            className="w-16 h-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}
    </div>
  );

  const renderContent = (key: InfoTab, withImage = false) => {
    if (key === "manufacturer") {
      return (
        <div className="space-y-6">
          {withImage && <ProductImage />}
          <div className="space-y-4">
            <InfoRow
              label="Product Type"
              value={product.productType || "Ayurvedic Product"}
            />
            <InfoRow label="Country Of Origin" value="India" />
            <InfoRow
              label="Manufactured By"
              value={product.vendor || "Aarshaveda Wellness PVT Ltd"}
            />
            <InfoRow
              label="For Queries, Contact"
              value="Aarshaveda Wellness PTV Ltd, Aluva, Periyar Nagar, Cochin, Ernakulam"
            />
            <InfoRow label="Email" value="info@aarshaveda.com" />
            <InfoRow label="Call" value="+91 484 405 8439" />
            <InfoRow label="Website" value="aarshaveda.com" />
          </div>
        </div>
      );
    }
    if (key === "additional") {
      return (
        <div
          className="prose prose-sm prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      );
    }
    return (
      <div className="py-4 text-center text-neutral-400 font-medium font-sans">
        Product-specific FAQs will be available soon.
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Mobile: Accordion */}
      <div className="md:hidden bg-[#FAF7F2]">
        {tabs.map((tab) => {
          const isOpen = openMobile === tab.key;
          return (
            <div
              key={tab.key}
              className={`mb-0 last:mb-0 overflow-hidden transition-colors ${isOpen
                ? "border border-[#A65B4A]/40 rounded-md"
                : "border border-transparent"
                }`}
            >
              <button
                type="button"
                onClick={() => setOpenMobile(isOpen ? null : tab.key)}
                aria-expanded={isOpen}
                className={`w-full flex items-center justify-between gap-4 px-5 py-5 text-left transition-colors ${isOpen ? "bg-[#FAF7F2]" : "bg-[#A65B4A]"
                  }`}
              >
                <span
                  className={`text-[12px] font-sans font-bold uppercase tracking-[0.18em] ${isOpen ? "text-[#A65B4A]" : "text-white"
                    }`}
                >
                  {tab.label}
                </span>
                <span
                  className={`flex-none w-5 h-5 flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45 text-[#A65B4A]" : "rotate-0 text-white"
                    }`}
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
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
                className={`grid transition-all duration-300 ease-out ${isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 py-6">
                    {renderContent(tab.key, true)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: Tabs */}
      <div className="hidden md:block w-full">
        <div className="flex flex-nowrap border-b border-neutral-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-5 text-[13px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 border-r border-white last:border-r-0 ${activeTab === tab.key
                ? "text-[#A65B4A] bg-[#FAF7F2]"
                : "text-white bg-[#A65B4A] hover:bg-[#8B4C3E]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-12 bg-[#FAF7F2] border-x border-b border-neutral-100">
          <div className="main-container !pb-0">
            <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
              <div className="flex-1 space-y-6">{renderContent(activeTab)}</div>

              <div className="w-full lg:w-[45%] aspect-[1.5/1] relative rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-8 border border-neutral-100">
                {product.featuredImage ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-1 md:gap-4">
      <span className="text-[13px] font-bold text-neutral-800 font-sans">
        {label} :
      </span>
      <span className="text-[14px] text-neutral-600 font-medium leading-relaxed font-sans">
        {value}
      </span>
    </div>
  );
}
