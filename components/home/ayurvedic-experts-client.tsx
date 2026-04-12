"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export function AyurvedicExpertsClient({ experts }: { experts: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      // For items that are roughly 240px + gap, we use a factor to determine index
      // Alternatively, just using the container width if items are sized relative to it
      const index = Math.round(scrollLeft / 256); // 240px width + 16px gap
      setActiveIndex(Math.min(index, experts.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [experts.length]);

  return (
    <>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-6 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {experts.slice(0, 4).map((expert: any) => (
            <div
              key={expert.id}
              className="relative flex-shrink-0 w-[240px] md:w-full aspect-[3/5] md:aspect-[3/4.2] lg:aspect-[3.2/5.5] rounded-xl overflow-hidden group/expert shadow-sm snap-center"
            >
              <div className="absolute inset-0 z-0 bg-neutral-100">
                {expert.imageUrl ? (
                  <Image
                    src={expert.imageUrl}
                    alt={expert.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/expert:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-200" />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col items-stretch">
                <div className="text-left mb-5 md:mb-6">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-serif font-semibold text-white mb-1 md:mb-1.5 leading-tight tracking-[0.05em] md:tracking-[0.1em] whitespace-nowrap">
                    {expert.title}
                  </h3>
                  <p className="text-[9px] md:text-[10px] lg:text-[11px] uppercase tracking-[0.15em] text-white/80 font-semibold">
                    {expert.specialization}{" "}
                    {expert.qualification ? `(${expert.qualification})` : ""}
                  </p>
                </div>

                <div className="w-full opacity-0 translate-y-2 group-hover/expert:opacity-100 group-hover/expert:translate-y-0 transition-all duration-300 md:block hidden">
                  <button className="w-full bg-white text-neutral-900 py-3 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] rounded-[5px] shadow-lg hover:bg-neutral-100 transition-colors">
                    Know More
                  </button>
                </div>

                <div className="w-full md:hidden">
                  <button className="w-full bg-white text-neutral-900 py-3 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.2em] rounded-[5px] shadow-lg active:scale-95 transition-all">
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators - Dynamic and scrollable for mobile */}
      <div className="flex justify-center mt-8 md:hidden  px-4">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-2">
          {experts.slice(0, 5).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-[2px] rounded-full flex-shrink-0 transition-colors duration-300 ${i === activeIndex ? "bg-neutral-800" : "bg-neutral-200"
                }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
