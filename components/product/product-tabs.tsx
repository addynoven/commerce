"use client";

import { Product } from "lib/shopify/types";
import { useState } from "react";

type Tab = {
  label: string;
  content: string;
};

function metafieldToHtml(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();

  // Shopify rich_text_field returns a JSON schema document
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      return richTextNodeToHtml(parsed);
    } catch {
      // fall through
    }
  }

  // List metafield (multi_line / list.single_line)
  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return `<ul>${parsed
          .map((item) => `<li>${escapeHtml(String(item))}</li>`)
          .join("")}</ul>`;
      }
    } catch {
      // fall through
    }
  }

  // Plain multi-line text — preserve line breaks
  if (trimmed.includes("\n")) {
    return trimmed
      .split(/\n+/)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  // Looks like raw HTML already
  if (trimmed.startsWith("<")) return trimmed;

  return `<p>${escapeHtml(trimmed)}</p>`;
}

function richTextNodeToHtml(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return escapeHtml(node);

  const childrenHtml = Array.isArray(node.children)
    ? node.children.map(richTextNodeToHtml).join("")
    : "";

  switch (node.type) {
    case "root":
      return childrenHtml;
    case "paragraph":
      return `<p>${childrenHtml}</p>`;
    case "heading": {
      const level = Math.min(Math.max(node.level || 2, 1), 6);
      return `<h${level}>${childrenHtml}</h${level}>`;
    }
    case "list": {
      const tag = node.listType === "ordered" ? "ol" : "ul";
      return `<${tag}>${childrenHtml}</${tag}>`;
    }
    case "list-item":
      return `<li>${childrenHtml}</li>`;
    case "link":
      return `<a href="${escapeHtml(node.url || "#")}" target="_blank" rel="noopener noreferrer">${childrenHtml}</a>`;
    case "text": {
      let text = escapeHtml(node.value || "");
      if (node.bold) text = `<strong>${text}</strong>`;
      if (node.italic) text = `<em>${text}</em>`;
      return text;
    }
    default:
      return childrenHtml;
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function ProductTabs({ product }: { product: Product }) {
  const tabs: Tab[] = [
    { label: "Description", content: product.descriptionHtml || "" },
    { label: "Benefits", content: metafieldToHtml(product.benefits?.value) },
    { label: "How To Use", content: metafieldToHtml(product.howToUse?.value) },
    { label: "Ingredients", content: metafieldToHtml(product.ingredients?.value) },
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
                      No {tab.label.toLowerCase()} information available for this product.
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
