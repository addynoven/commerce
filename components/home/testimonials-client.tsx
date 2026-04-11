"use client";

import { useEffect, useRef, useState } from "react";

function StarRating({ rating = 5 }: { rating?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= fullStars;
        const isHalf = star === fullStars + 1 && hasHalf;
        return (
          <svg
            key={star}
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill={isFull ? "#6D8060" : "none"}
          >
            {isHalf ? (
              <>
                <defs>
                  <linearGradient id={`half-${star}`}>
                    <stop offset="50%" stopColor="#6D8060" />
                    <stop offset="50%" stopColor="#D9D9D9" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${star})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </>
            ) : (
              <path
                fill={isFull ? "#6D8060" : "#D9D9D9"}
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            )}
          </svg>
        );
      })}
    </div>
  );
}

// Phosphor-style quote icon matching the Figma "Quotes" icon
function QuoteIcon() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{ bottom: 0, right: 0, opacity: 0.1 }}
    >
      <path
        d="M108,144H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h68a16,16,0,0,1,16,16v96a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32Zm116-88H176a16,16,0,0,0-16,16v56a16,16,0,0,0,16,16h68v24a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,224,56Z"
        fill="#95473C"
      />
    </svg>
  );
}

// SealCheck verified icon
function SealCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none">
      <path
        d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.82-.31-20.94-8-28.66s-18.84-7.85-28.66-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25,14.94c-3.94,3.77-8,7.67-11.57,9.14C88,41.44,82.56,41.52,77.31,41.6c-9.82.15-20.94.31-28.66,8S40.8,68.44,40.65,78.26c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.94,25c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.82.31,20.94,8,28.66s18.84,7.85,28.66,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25-14.94c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.82-.15,20.94-.31,28.66-8s7.85-18.84,8-28.66c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-52.58,31.18-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L111,172.69l50.34-50.35a8,8,0,0,1,11.32,11.31Z"
        fill="#95473C"
      />
    </svg>
  );
}

export function TestimonialsClient({ reviews }: { reviews: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      const cardWidth = (isMobile ? 280 : 400) + 28; // card width + gap
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const isMobile = window.innerWidth < 768;
    const cardWidth = (isMobile ? 280 : 400) + 28;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-16">
      {/* Carousel row with arrows */}
      <div className="relative group">
        {/* Left Arrow — absolutely positioned outside */}
        <button
          onClick={() => scroll("left")}
          aria-label="Previous"
          className="hidden md:flex absolute left-[-20px] lg:left-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        >
          <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
            <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
          </svg>
        </button>

        {/* Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-7 overflow-x-auto hide-scrollbar scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((review: any, idx: number) => {
            const ratingNum =
              typeof review.rating === "number"
                ? review.rating
                : idx % 2 === 0
                  ? 4.5
                  : 5.0;
            const ratingStr = ratingNum.toFixed(1);

            return (
              <div
                key={review.handle ?? idx}
                className="relative flex flex-col justify-between overflow-hidden w-[280px] md:w-[400px] min-w-[280px] md:min-w-[400px] flex-shrink-0 h-[240px] md:h-[280px] p-5 md:p-6 bg-white border border-[#F2F5F1] rounded-[8px] isolate"
                style={{
                  scrollSnapAlign: "start",
                }}
              >
                {/* Top section: rating badge + stars + review text */}
                <div className="flex flex-col gap-4 z-10">
                  {/* Rating badge + stars */}
                  <div className="flex items-center gap-1">
                    {/* Score badge */}
                    <div
                      className="flex items-center justify-center rounded"
                      style={{
                        width: 32,
                        height: 22,
                        background: "#262626",
                        borderRadius: 4,
                        padding: 4,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        className="font-sans font-semibold text-white text-center"
                        style={{ fontSize: 11, lineHeight: 1 }}
                      >
                        {ratingStr}
                      </span>
                    </div>
                    {/* Stars */}
                    <StarRating rating={ratingNum} />
                  </div>

                  {/* Review text */}
                  <p
                    className="font-sans text-[#262626] line-clamp-4 text-[14px] md:text-[16px]"
                    style={{ lineHeight: "140%", fontWeight: 400 }}
                    dangerouslySetInnerHTML={{ __html: review.contentHtml }}
                  />
                </div>

                {/* Bottom: name + verified */}
                <div className="flex items-center gap-1.5 z-10">
                  <span
                    className="font-serif text-[#262626]"
                    style={{ fontSize: 18, lineHeight: "140%", fontWeight: 500 }}
                  >
                    {review.title}
                  </span>
                  <SealCheck />
                </div>

                {/* Watermark quote — bottom-right, absolute */}
                <QuoteIcon />
              </div>
            );
          })}
        </div>

        {/* Right Arrow — absolutely positioned outside */}
        <button
          onClick={() => scroll("right")}
          aria-label="Next"
          className="hidden md:flex absolute right-[-20px] lg:right-[-60px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
        >
          <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
          </svg>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          {Array.from({ length: Math.min(5, reviews.length) }).map((_, i) => (
            <div
              key={i}
              className="rounded-full flex-shrink-0 transition-colors duration-300"
              style={{
                width: 40,
                height: 4,
                borderRadius: 8,
                background: i === activeIndex ? "#262626" : "#D9D9D9",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
