"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product, Video } from "lib/shopify/types";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className="w-3 h-3" viewBox="0 0 20 20" fill="none">
          <path
            fill={star <= rating ? "#6D8060" : "#D9D9D9"}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
}

export function RealLifeProductsClient({ products }: { products: Product[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayProducts = products.slice(0, 8);

  // On mobile: 1 card visible, on desktop: ~4 cards visible
  // We track by individual card scroll position
  const getCardsPerView = () => {
    if (typeof window === "undefined") return 4;
    return window.innerWidth < 768 ? 2 : 4;
  };

  const totalDots = Math.min(
    5,
    Math.max(1, displayProducts.length - getCardsPerView() + 1),
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = Array.from(container.children) as HTMLElement[];
      if (!children.length) return;
      const cardWidth = children[0]!.offsetWidth + 28; // card + gap
      const index = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(index, totalDots - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalDots]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;
    const cardWidth = children[0]!.offsetWidth + 28;
    container.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  if (!displayProducts.length) return null;

  return (
    <section className="overflow-hidden">
      <div className="main-container !pb-0">
        <h2 className="font-serif font-semibold text-[28px] md:text-[40px] leading-[120%] text-center text-[#262626] mb-6 md:mb-10">
          Our Products in Real Life
        </h2>

        <div className="relative group">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="hidden md:flex absolute left-[-20px] lg:left-[-60px] top-[35%] -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
            </svg>
          </button>

          {/* Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-7 overflow-x-auto hide-scrollbar scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {displayProducts.map((product) => {
              const firstVariant = product.variants[0];
              const currentPrice =
                firstVariant?.price.amount ||
                product.priceRange.minVariantPrice.amount;
              const compareAtPrice =
                firstVariant?.compareAtPrice?.amount || currentPrice;
              const hasDiscount =
                parseFloat(compareAtPrice) > parseFloat(currentPrice);
              const rating = parseFloat(product.rating?.value || "0");
              const reviewCount = product.ratingCount?.value || "0";
              const video = product.videos?.[0];
              const previewImage =
                video?.previewImage?.url ||
                product.featuredImage?.url ||
                "/images/collections-banner.png";

              return (
                <div
                  key={product.handle}
                  className="flex flex-col flex-shrink-0 w-[calc(50vw-28px)] md:w-[calc(25%-21px)]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Video/Photo preview */}
                  <div className="relative aspect-[3/4] rounded-[8px] overflow-hidden mb-3 bg-neutral-100 group/media">
                    <Link
                      href={`/product/${product.handle}`}
                      className="absolute inset-0 z-[1]"
                    />
                    <div className="absolute inset-0 bg-black/10 z-[2] pointer-events-none" />
                    {video && (
                      <div className="absolute inset-0 flex items-center justify-center z-[3]">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setPlayingVideo(video);
                          }}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                        >
                          <svg
                            className="h-5 w-5 md:h-6 md:w-6 text-[#262626] ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <Image
                      src={previewImage}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/media:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      {/* Product thumbnail */}
                      <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-[4px] overflow-hidden flex-shrink-0 bg-[#FAF7F2] border border-[#F2F5F1]">
                        <Image
                          src={
                            product.featuredImage?.url ||
                            "/images/collections-banner.png"
                          }
                          alt={product.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="flex flex-col min-w-0 gap-1">
                        {/* Title */}
                        <Link href={`/product/${product.handle}`}>
                          <h3 className="font-serif font-normal text-[13px] md:text-[16px] leading-[130%] tracking-[-0.02em] text-[#262626] truncate hover:text-[#A8685F] transition-colors">
                            {product.title}
                          </h3>
                        </Link>

                        {/* Price */}
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans font-medium text-[13px] md:text-[16px] leading-[150%] text-[#262626]">
                            <Price
                              amount={currentPrice}
                              currencyCode={
                                product.priceRange.minVariantPrice.currencyCode
                              }
                              currencyCodeClassName="hidden"
                            />
                          </span>
                          {hasDiscount && (
                            <span className="font-sans font-normal text-[11px] md:text-[14px] leading-[150%] text-[#BFBFBF] line-through">
                              <Price
                                amount={compareAtPrice}
                                currencyCode={
                                  product.priceRange.minVariantPrice
                                    .currencyCode
                                }
                                currencyCodeClassName="hidden"
                              />
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        {rating > 0 && (
                          <div className="flex items-center gap-1">
                            <StarRating rating={rating} />
                            <span className="text-[10px] md:text-[12px] text-[#454545] font-normal leading-[140%]">
                              ({reviewCount})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add to Cart — outlined per design system */}
                    <AddToCart
                      product={product}
                      className="flex w-full items-center justify-center border border-[#5B6B50] rounded-[4px] h-8 md:h-9 text-[10px] md:text-[12px] font-sans font-medium uppercase tracking-[0.02em] text-[#5B6B50] transition-colors duration-300 hover:bg-[#5B6B50] hover:text-white active:scale-[0.98]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next"
            className="hidden md:flex absolute right-[-20px] lg:right-[-60px] top-[35%] -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 hover:text-white transition-all shadow-sm"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-10">
          <div className="flex gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
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

      {/* Video modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setPlayingVideo(null)}
          />
          <button
            onClick={() => setPlayingVideo(null)}
            className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-lg aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl">
            {playingVideo.sources?.[0]?.url ? (
              <video
                src={playingVideo.sources[0].url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-sm">
                Video source not available
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
