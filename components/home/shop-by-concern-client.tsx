"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function ShopByConcernClient({ collections }: { collections: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 381 + 28; // card + gap
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -(381 + 28) : 381 + 28,
      behavior: "smooth",
    });
  };

  const totalIndicators = Math.max(1, collections.length - 2); // 3 visible at a time

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {/* Cards row + arrows */}
      <div className="relative w-full">
        {/* Left arrow — absolute, sits in main-container padding zone */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-neutral-200 items-center justify-center text-black hover:bg-neutral-900 hover:text-white transition-colors duration-200"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M13.5 8.5L10 12l3.5 3.5" />
          </svg>
        </button>

        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-7 snap-x snap-mandatory hide-scrollbar scroll-smooth"
        >
          {collections.map((collection) => (
            <Link
              key={collection.handle}
              href={collection.path}
              className="relative flex flex-col justify-end overflow-hidden rounded-[12px] w-[280px] h-[340px] md:w-[381px] md:h-[400px] flex-shrink-0 snap-start group/concern"
            >
              <Image
                src={collection.image?.url || "/images/collections-banner.png"}
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/concern:scale-105"
                sizes="(max-width: 768px) 280px, 381px"
              />
              {/* Gradient: transparent 40% → #000000 100% */}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,#000000_100%)]" />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-5 p-8">
                <h3 className="font-serif font-medium text-[26px] md:text-[32px] leading-[130%] text-center text-white">
                  {collection.title}
                </h3>
                <div className="border border-white rounded-[5px] w-[145px] h-[44px] flex items-center justify-center font-sans font-medium text-[13px] tracking-[0.02em] uppercase text-white group-hover/concern:bg-white group-hover/concern:text-black transition-colors duration-300">
                  View Products
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#343330] items-center justify-center text-white hover:bg-black transition-colors duration-200"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M10.5 8.5L14 12l-3.5 3.5" />
          </svg>
        </button>
      </div>

      {/* Slider indicators — #262626 active, #D9D9D9 inactive, 40×4px */}
      <div className="flex gap-2">
        {Array.from({ length: Math.min(totalIndicators, 5) }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-[4px] rounded-full transition-colors duration-300 ${
              i === activeIndex ? "bg-[#262626]" : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>

      {/* View All Concerns — 194×52px, border #5B6B50 */}
      <Link
        href="/shop-by-concerns"
        className="inline-flex items-center justify-center border border-[#5B6B50] rounded-[6px] w-[194px] h-[52px] font-sans font-medium text-[14px] tracking-[0.02em] uppercase text-[#5B6B50] hover:bg-[#5B6B50] hover:text-white transition-colors duration-300"
      >
        View All Concerns
      </Link>
    </div>
  );
}
