"use client";

import { Product } from "lib/shopify/types";
import { useState } from "react";

type InfoTab = "manufacturer" | "additional" | "faqs";

export function ManufacturerInfo({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<InfoTab>("manufacturer");

  const tabs: { key: InfoTab; label: string }[] = [
    { key: "manufacturer", label: "Manufacturer Information" },
    { key: "additional", label: "Additional Information" },
    { key: "faqs", label: "FAQs" },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex flex-wrap md:flex-nowrap border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-5 text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 border-r border-white last:border-r-0 ${
              activeTab === tab.key
                ? "text-[#A65B4A] bg-[#FAF7F2]"
                : "text-white bg-[#A65B4A] hover:bg-[#8B4C3E]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-12 bg-[#FAF7F2] border-x border-b border-neutral-100">
        <div className="main-container !pb-0">
          <div className="flex flex-col lg:flex-row gap-12 lg:items-start">
            {/* Left Content (Text) */}
            <div className="flex-1 space-y-6">
              {activeTab === "manufacturer" && (
                <div className="space-y-4">
                  <InfoRow label="Product Type" value={product.productType || "Ayurvedic Product"} />
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
              )}
              {activeTab === "additional" && (
                <div className="space-y-4">
                   <div className="prose prose-sm prose-neutral max-w-none font-sans text-neutral-600 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} 
                   />
                </div>
              )}
              {activeTab === "faqs" && (
                <div className="py-8 text-center text-neutral-400 font-medium font-sans">
                  Product-specific FAQs will be available soon.
                </div>
              )}
            </div>

            {/* Right Content (Image Placeholder) */}
            <div className="w-full lg:w-[45%] aspect-[1.5/1] relative rounded-xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-8 border border-neutral-100">
               {product.featuredImage ? (
                 <img 
                    src={product.featuredImage.url} 
                    alt={product.featuredImage.altText || product.title}
                    className="max-w-full max-h-full object-contain"
                 />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-4">
      <span className="text-[13px] font-bold text-neutral-800 font-sans">
        {label} :
      </span>
      <span className="text-[14px] text-neutral-600 font-medium leading-relaxed font-sans">{value}</span>
    </div>
  );
}
