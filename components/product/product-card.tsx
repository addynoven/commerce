"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import { AddToCart } from "components/cart/add-to-cart";
import { useViewMode } from "components/layout/search/search-page-wrapper";
import Price from "components/price";
import { useWishlist } from "components/wishlist/wishlist-context";
import { Product, ProductOption, ProductVariant } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product, forceBestseller }: { product: Product; forceBestseller?: boolean }) {
  const { viewMode } = useViewMode();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Get size/volume option and its variants
  const sizeOption = product.options.find((o: ProductOption) =>
    ["Quantity", "Size", "Weight", "Volume"].includes(o.name),
  );
  const sizeValues = sizeOption?.values || [];
  const hasMultipleVariants = sizeValues.length > 1;

  const [selectedSize, setSelectedSize] = useState(sizeValues[0] || "");

  // Find variant matching selected size
  const getVariantForSize = (size: string): ProductVariant | undefined => {
    if (!sizeOption) return product.variants[0];
    return product.variants.find((v) =>
      v.selectedOptions.some(
        (opt) => opt.name === sizeOption.name && opt.value === size,
      ),
    );
  };

  const selectedVariant = getVariantForSize(selectedSize) || product.variants[0];
  const currentPrice =
    selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount || currentPrice;
  const hasDiscount = parseFloat(compareAtPrice) > parseFloat(currentPrice);
  const discountPercent = hasDiscount
    ? Math.round(
        ((parseFloat(compareAtPrice) - parseFloat(currentPrice)) /
          parseFloat(compareAtPrice)) *
          100,
      )
    : 0;

  const rating = parseFloat(product.rating?.value || "0");
  const reviewCount = product.ratingCount?.value || "0";

  const isBestseller = forceBestseller || product.tags.some(
    (tag: string) => tag.toLowerCase() === "bestseller",
  );

  const isLiked = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Display label for single variant
  let singleVariantLabel = sizeValues[0];
  if (
    !singleVariantLabel &&
    product.variants[0]?.title &&
    product.variants[0].title !== "Default Title"
  ) {
    singleVariantLabel = product.variants[0].title;
  }

  if (viewMode === "list") {
    return (
      <div className="group/card flex bg-white border border-neutral-100 rounded-[5px] overflow-hidden hover:shadow-md transition-shadow h-[280px]">
        {/* Image - Left Side */}
        <div className="relative w-1/3 min-w-[200px] aspect-square bg-[#FAF7F2]">
          <Link
            href={`/product/${product.handle}`}
            className="block h-full w-full"
          >
            {isBestseller && (
              <span className="absolute top-4 left-4 z-10 bg-[#A65B4A] text-white px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase">
                Bestseller
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-4 right-4 z-10 bg-[#6B8E67] text-white px-2 py-0.5 text-[10px] font-bold rounded-sm">
                {discountPercent}% OFF
              </span>
            )}
            <Image
              src={product.featuredImage?.url || "/product-placeholder.jpg"}
              alt={product.featuredImage?.altText || product.title}
              fill
              className="object-contain p-4 md:p-6 transition-transform duration-700 group-hover/card:scale-105"
              sizes="33vw"
            />
          </Link>
          <button
            onClick={toggleWishlist}
            className={`absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white shadow-sm border ${
              isLiked
                ? "text-[#A65B4A]"
                : "text-neutral-400 hover:text-neutral-900"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill={isLiked ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        {/* Content - Right Side */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            {singleVariantLabel && !hasMultipleVariants && (
              <span className="text-[10px] md:text-[11px] font-semibold text-[#A65B4A] uppercase tracking-wider bg-[#FAF7F2] px-2 py-0.5 border border-[#A65B4A]/10 rounded-full">
                {singleVariantLabel}
              </span>
            )}
            <div className="flex items-center gap-1 md:gap-1.5 border-l border-neutral-200 pl-3 md:pl-4">
              <span className="text-[11px] font-semibold text-neutral-800">
                {rating > 0 ? rating : "0"}
              </span>
              <StarIcon className="h-3 w-3 text-[#6B8E67]" />
              <span className="text-[10px] md:text-[11px] text-neutral-400 font-semibold">
                ({reviewCount} Reviews)
              </span>
            </div>
          </div>

          <Link href={`/product/${product.handle}`} className="mb-2 md:mb-4">
            <h3 className="font-serif text-[15px] md:text-lg font-semibold text-neutral-900 hover:text-[#A65B4A] transition-colors leading-tight">
              {product.title}
            </h3>
          </Link>

          {/* Variant Pills - List View */}
          {hasMultipleVariants && (
            <div className="flex flex-wrap gap-2 mb-4">
              {sizeValues.map((size) => {
                const v = getVariantForSize(size);
                const isAvailable = v?.availableForSale !== false;
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border transition-colors ${
                      selectedSize === size
                        ? "bg-[#A65B4A] text-white border-[#A65B4A]"
                        : isAvailable
                          ? "bg-white text-neutral-700 border-neutral-200 hover:border-[#A65B4A]"
                          : "bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed line-through"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
            <span className="text-xl md:text-2xl font-semibold text-neutral-900">
              <Price
                amount={currentPrice}
                currencyCode={product.priceRange.minVariantPrice.currencyCode}
              />
            </span>
            {hasDiscount && (
              <span className="text-xs md:text-sm text-neutral-400 line-through font-medium">
                <Price
                  amount={compareAtPrice}
                  currencyCode={product.priceRange.minVariantPrice.currencyCode}
                />
              </span>
            )}
            {hasDiscount && (
              <span className="text-[10px] font-bold text-[#6B8E67]">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="w-full">
            <AddToCart
              product={product}
              selectedVariantId={selectedVariant?.id}
              className="relative flex w-full items-center justify-center bg-[#6B8E67] py-3 px-4 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#5A7A56] hover:shadow-md active:scale-[0.98] rounded-[5px]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    // Card: 280×479px, padding 8px, gap 20px, border-radius 8px
    <div className="group/card flex flex-col bg-white rounded-[8px] p-2 gap-3 md:gap-5 h-[380px] md:h-[479px]">

      {/* Frame 24 — image + info, gap 16px */}
      <div className="flex flex-col gap-4 flex-1 min-h-0">

        {/* Frame 12 — image area: 280px tall, bg #FAF7F2, rounded 4px, p-2, space-between */}
        <div
          className="relative flex flex-col justify-between overflow-hidden bg-[#FAF7F2] rounded-[4px] p-2 flex-shrink-0 h-[200px] md:h-[280px]"
        >
          <Link href={`/product/${product.handle}`} className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={product.featuredImage?.url || "/product-placeholder.jpg"}
              alt={product.featuredImage?.altText || product.title}
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover/card:scale-105"
              sizes="280px"
            />
          </Link>

          {/* Bestseller badge — top-left, bg #A8685F, rounded 2px */}
          {isBestseller ? (
            <span className="relative z-10 self-start bg-[#A8685F] text-white px-2 py-[3px] text-[10px] font-sans font-semibold uppercase leading-[140%] rounded-[2px]">
              Bestseller
            </span>
          ) : (
            <div />
          )}

          {/* Wishlist — bottom-right, 35×35, bg #F5F5F5, border #E1E6DD, rounded 4px */}
          <div className="relative z-10 flex justify-end">
            <button
              onClick={toggleWishlist}
              className={`w-[35px] h-[35px] rounded-[4px] flex items-center justify-center border transition-colors ${
                isLiked
                  ? "bg-[#A8685F] border-[#A8685F] text-white"
                  : "bg-[#F5F5F5] border-[#E1E6DD] text-[#595959] hover:text-[#A8685F]"
              }`}
            >
              <svg className="w-[23px] h-[23px]" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Frame 25 — info section, gap 8px */}
        <div className="flex flex-col gap-2">

          {/* Frame 582 — quantity + rating + title, gap 8px */}
          <div className="flex flex-col gap-2">

            {/* Frame 580 — quantity tag | rating, justify-between */}
            <div className="flex items-center justify-between gap-1.5">
              {singleVariantLabel && !hasMultipleVariants ? (
                <span className="text-[10px] font-sans font-semibold text-[#95473C] uppercase bg-[#F4EDEC] border border-[#D1B0AB] rounded-full px-[6px] py-[6px] leading-none whitespace-nowrap">
                  {singleVariantLabel}
                </span>
              ) : (
                <div />
              )}
              {rating > 0 && (
                <div className="flex items-center gap-0.5 text-[12px] text-[#454545]">
                  <span className="font-medium leading-[140%]">{rating}</span>
                  <StarIcon className="h-3 w-3 flex-shrink-0" />
                  <span className="font-normal leading-[140%]">({reviewCount} Reviews)</span>
                </div>
              )}
            </div>

            {/* Variant pills (if multiple) */}
            {hasMultipleVariants && (
              <div className="flex flex-wrap gap-1.5">
                {sizeValues.map((size) => {
                  const v = getVariantForSize(size);
                  const isAvailable = v?.availableForSale !== false;
                  return (
                    <button
                      key={size}
                      onClick={() => isAvailable && setSelectedSize(size)}
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border transition-colors ${
                        selectedSize === size
                          ? "bg-[#95473C] text-white border-[#95473C]"
                          : isAvailable
                            ? "bg-[#F4EDEC] text-[#95473C] border-[#D1B0AB] hover:border-[#95473C]"
                            : "bg-neutral-50 text-neutral-300 border-neutral-100 cursor-not-allowed line-through"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Frame 581 — title: Playfair 400, 18px, -0.02em, 130% */}
            <Link href={`/product/${product.handle}`} className="block">
              <h3 className="font-serif font-normal text-[14px] md:text-[18px] leading-[130%] tracking-[-0.02em] text-[#262626] line-clamp-2 hover:text-[#A8685F] transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>

          {/* Frame 14 — price row: 20px, weight 500/400 */}
          <div className="flex items-center gap-2">
            <span className="font-sans font-medium text-[16px] md:text-[20px] leading-[150%] text-[#262626]">
              <Price amount={currentPrice} currencyCode={product.priceRange.minVariantPrice.currencyCode} currencyCodeClassName="hidden" />
            </span>
            {hasDiscount && (
              <span className="font-sans font-normal text-[16px] md:text-[20px] leading-[150%] text-[#BFBFBF] line-through">
                <Price amount={compareAtPrice} currencyCode={product.priceRange.minVariantPrice.currencyCode} currencyCodeClassName="hidden" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Frame 19 — Add to Cart: outline #5B6B50, h-9, rounded 4px, text 12px */}
      <AddToCart
        product={product}
        selectedVariantId={selectedVariant?.id}
        className="flex w-full items-center justify-center border border-[#5B6B50] rounded-[4px] h-9 flex-shrink-0 text-[12px] font-sans font-medium uppercase tracking-[0.02em] text-[#5B6B50] transition-colors duration-300 hover:bg-[#5B6B50] hover:text-white active:scale-[0.98]"
      />
    </div>
  );
}
