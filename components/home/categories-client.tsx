"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CategoriesClient({ collections }: { collections: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div
        ref={scrollContainerRef}
        className="flex md:hidden w-full overflow-x-auto gap-7 pb-4 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
      >
        {collections.map((collection) => (
          <Link
            key={collection.handle}
            href={collection.path}
            className="flex flex-col items-center gap-4 snap-center flex-shrink-0 w-[100px]"
          >
            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-white border border-neutral-100">
              <Image
                src={collection.image?.url || "/images/collections-banner.png"}
                alt={collection.image?.altText || collection.title}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <span className="font-sans font-medium text-sm text-[#1F1F1F] text-center leading-[120%]">
              {collection.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: wrapping grid — 160px circles, gap-x-7 gap-y-12 */}
      <div className="hidden md:flex flex-wrap justify-center gap-y-12 gap-x-7">
        {collections.map((collection) => (
          <Link
            key={collection.handle}
            href={collection.path}
            className="flex flex-col items-center gap-4 w-[160px] min-w-[160px] max-w-[200px] group/category"
          >
            <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden bg-white transition-transform duration-300 group-hover/category:scale-105 border border-neutral-100">
              <Image
                src={collection.image?.url || "/images/collections-banner.png"}
                alt={collection.image?.altText || collection.title}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <span className="font-sans font-medium text-[20px] leading-[120%] text-[#1F1F1F] text-center group-hover/category:text-brand-pastel-maroon transition-colors">
              {collection.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex md:hidden justify-center mt-6">
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(collections.length / 3) }).map((_, i) => (
            <div
              key={i}
              className={`w-10 h-[4px] rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#595959]" : "bg-[#595959]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
