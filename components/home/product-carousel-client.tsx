"use client";

import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

export function ProductCarouselClient({ products, showBestsellerBadge }: { products: Product[]; showBestsellerBadge?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalDots, setTotalDots] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getCardScrollUnit = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 312;
    const firstCard = container.firstElementChild as HTMLElement | null;
    if (!firstCard) return 312;
    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    return firstCard.offsetWidth + gap;
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const update = () => {
      const unit = getCardScrollUnit();
      const maxScroll = container.scrollWidth - container.clientWidth;
      setTotalDots(Math.max(1, Math.round(maxScroll / unit) + 1));
      setActiveIndex(Math.round(container.scrollLeft / unit));
    };

    const handleScroll = () => {
      const unit = getCardScrollUnit();
      setActiveIndex(Math.round(container.scrollLeft / unit));
    };

    update();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
    };
  }, [products.length, getCardScrollUnit]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const unit = getCardScrollUnit();
    container.scrollBy({
      left: direction === "left" ? -unit : unit,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-[-20px] md:left-[-60px] top-[40%] transform -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200 items-center justify-center bg-white text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        aria-label="Scroll left"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-[-20px] md:right-[-60px] top-[40%] transform -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200 items-center justify-center bg-white text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        aria-label="Scroll right"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 md:gap-8 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.handle}
            className="w-[calc(50%-8px)] sm:w-[calc(33.333%-22px)] lg:w-[280px] flex-shrink-0 snap-start"
          >
            <ProductCard product={product} forceBestseller={showBestsellerBadge} />
          </div>
        ))}
      </div>

      {/* Pagination indicators */}
      <div className="flex justify-center mt-12 mb-12 px-4">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-2">
          {Array.from({ length: totalDots }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-[2.5px] rounded-full flex-shrink-0 transition-colors duration-300 ${
                i === activeIndex ? "bg-neutral-800" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
