"use client";

import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const brands = ["Aarshaveda", "Nature's Veda", "Dasapushpam"];

export function ShopByBrandClient({
  products,
  aarshavedaProducts = [],
  naturvedaProducts = [],
  dasapushpamProducts = [],
}: {
  products: Product[];
  aarshavedaProducts?: Product[];
  naturvedaProducts?: Product[];
  dasapushpamProducts?: Product[];
}) {
  const [activeBrand, setActiveBrand] = useState(0);
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
  }, [activeBrand]);

  // Reset scroll + pagination dots when switching brands
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [activeBrand]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Scroll by one card width (280px) + gap (32px)
      const scrollAmount = 312;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Select products based on active brand — no fallback so the filter
  // actually reflects the brand the user selected.
  const brandLists: Product[][] = [
    aarshavedaProducts,
    naturvedaProducts,
    dasapushpamProducts,
  ];
  const finalProducts = brandLists[activeBrand] ?? [];

  return (
    <section className="py-6 md:py-8 bg-white overflow-hidden">
      <div className="main-container">
        <h2 className="text-[28px] md:text-[40px] font-serif font-semibold text-center mb-6 md:mb-8 text-black leading-[120%]">
          Shop by Brand
        </h2>

        <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8 flex-wrap px-2">
          {brands.map((brand, idx) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(idx)}
              className={`min-w-[110px] md:min-w-[180px] h-[36px] md:h-[41px] px-3 md:px-[14px] rounded-full text-[14px] md:text-[18px] font-sans font-medium transition-all duration-300 border-2 ${
                activeBrand === idx
                  ? "bg-[#F4EDEC] text-[#95473C] border-[#D1B0AB]"
                  : "bg-[#FCFCFC] text-[#595959] border-[#595959] hover:border-[#95473C] hover:text-[#95473C]"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-[-20px] md:left-[-60px] top-[40%] transform -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200 items-center justify-center bg-white text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-[-20px] md:right-[-60px] top-[40%] transform -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-neutral-200 items-center justify-center bg-white text-neutral-800 hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
          >
            <ArrowRight />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-8 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth"
          >
            {finalProducts.map((product) => (
              <div
                key={product.handle}
                className="min-w-[calc(50%-0.5rem)] sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(25%-1.5rem)] snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {finalProducts.length === 0 && (
            <div className="py-16 text-center text-neutral-500 font-medium">
              No products from {brands[activeBrand]} are available yet.
            </div>
          )}
        </div>

        {finalProducts.length > 0 && (
          <div className="flex justify-center mt-8 mb-8">
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, finalProducts.length) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={`w-10 h-1 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      i === activeIndex ? "bg-[#262626]" : "bg-[#D9D9D9]"
                    }`}
                  />
                ),
              )}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <a
            href="/search"
            className="border border-[#5B6B50] px-10 py-4 text-[14px] font-sans font-medium uppercase tracking-[0.02em] text-[#5B6B50] hover:bg-[#5B6B50] hover:text-white transition-all duration-300 rounded-[6px]"
          >
            Shop All Products
          </a>
        </div>
      </div>
    </section>
  );
}
