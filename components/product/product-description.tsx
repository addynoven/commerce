"use client";

import clsx from "clsx";
import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BuyNow } from "./buy-now";

function StarRating({ rating = 4 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-yellow-500" : "text-neutral-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; days: number; pincode: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = pincode.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      setStatus({
        type: "error",
        message: "Please enter a valid 6-digit pincode",
      });
      return;
    }

    setStatus({ type: "loading" });
    setTimeout(() => {
      const firstDigit = parseInt(trimmed[0]!, 10);
      const days = 3 + (firstDigit % 4);
      setStatus({ type: "success", days, pincode: trimmed });
    }, 600);
  };

  return (
    <div className="space-y-4">
      <label className="text-xs md:text-sm font-semibold text-[#2D312E] block">
        Check delivery at your location
      </label>
      <form
        onSubmit={handleSubmit}
        className="flex border border-neutral-300 rounded-[6px] overflow-hidden focus-within:border-neutral-900 transition-colors"
      >
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const next = e.target.value.replace(/\D/g, "").slice(0, 6);
            setPincode(next);
            if (status.type === "error" || status.type === "success") {
              setStatus({ type: "idle" });
            }
          }}
          placeholder="Enter Pincode"
          className="flex-1 text-sm px-4 py-3 md:py-3.5 focus:outline-none placeholder:text-neutral-400 font-sans"
        />
        <button
          type="submit"
          disabled={status.type === "loading"}
          className="bg-[#6B8E67]/90 text-white px-6 md:px-8 py-3 md:py-3.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#6B8E67] transition-colors border-l border-neutral-300 disabled:opacity-60"
        >
          {status.type === "loading" ? "Checking..." : "Submit"}
        </button>
      </form>
      {status.type === "error" && (
        <p className="text-xs text-red-600 font-medium">{status.message}</p>
      )}
      {status.type === "success" && (
        <p className="text-xs text-[#6B8E67] font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
          Delivery available to {status.pincode} in {status.days}-
          {status.days + 2} business days
        </p>
      )}
    </div>
  );
}

function QuantitySelector({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <span className="text-xs md:text-sm font-sans text-neutral-500">
        Quantity:
      </span>
      <div className="flex items-center border border-neutral-300 rounded-sm">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          −
        </button>
        <span className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium border-x border-neutral-300 min-w-[32px] md:min-w-[40px] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}

function parseMetafieldArray(value: string | undefined): string[] {
  if (!value) return [];
  try {
    // Shopify list of single-line text/json is often a JSON array string
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch (e) {
    return [value];
  }
}

function AvailableOffers({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(true);

  // Get offers from metafield first, then tags as fallback
  const metafieldOffers = parseMetafieldArray(product.offers?.value);
  const offerTags = product.tags
    .filter((t) => t.startsWith("offer:"))
    .map((t) => t.replace("offer:", ""));

  const displayOffers =
    metafieldOffers.length > 0
      ? metafieldOffers
      : offerTags.length > 0
        ? offerTags
        : [
            "Free Shipping on orders above ₹999",
            "Extra Savings on Combos when you buy more than one product",
            "Limited-time offers applied automatically at checkout",
          ];

  return (
    <div className="border border-neutral-200 rounded-[5px] overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-brand-cream"
      >
        <span className="text-xs md:text-sm font-semibold text-neutral-800">
          Available Offers
        </span>
        <svg
          className={`h-4 w-4 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-3 md:px-4 py-2 md:py-3 space-y-2 border-t border-neutral-200">
          {displayOffers.map((offer, idx) => (
            <p
              key={idx}
              className="text-[11px] md:text-xs text-neutral-600 flex items-start gap-2"
            >
              <span className="text-brand-green mt-0.5">•</span>
              {offer}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function AlsoAvailableInCards({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {products.map((p) => (
        <a
          key={p.handle}
          href={`/product/${p.handle}`}
          className="flex flex-col rounded-[6px] border border-neutral-200 overflow-hidden hover:border-neutral-400 transition-all"
        >
          <div className="relative aspect-square w-full bg-[#FAF7F2]">
            <Image
              src={p.featuredImage?.url || "/product-placeholder.jpg"}
              alt={p.featuredImage?.altText || p.title}
              fill
              className="object-contain p-3"
              sizes="120px"
            />
          </div>
          <div className="p-2 bg-white space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A65B4A] truncate">
              {p.vendor}
            </p>
            <p className="text-[11px] font-medium text-neutral-800 leading-tight line-clamp-2">
              {p.title}
            </p>
            <Price
              amount={p.priceRange.minVariantPrice.amount}
              currencyCode={p.priceRange.minVariantPrice.currencyCode}
              className="text-[11px] font-semibold text-neutral-900"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

export function ProductDescription({ product, alsoAvailableProducts = [] }: { product: Product; alsoAvailableProducts?: Product[] }) {
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();

  const variant = product.variants.find((variant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );

  const selectedVariant =
    variant || (product.variants.length === 1 ? product.variants[0] : null);

  const currentPrice = selectedVariant
    ? selectedVariant.price.amount
    : product.priceRange.minVariantPrice.amount;
  const compareAtPrice = product.priceRange.maxVariantPrice.amount;
  const hasDiscount = parseFloat(compareAtPrice) > parseFloat(currentPrice);
  const isAvailable = selectedVariant
    ? selectedVariant.availableForSale
    : product.availableForSale;

  // Dynamic USPs from metafields or tags
  const metafieldUSPs = parseMetafieldArray(product.usps?.value);
  const uspTags = product.tags
    .filter((t) => t.startsWith("usp:"))
    .map((t) => t.replace("usp:", ""));

  const defaultUSPs = [
    {
      label: "Natural Herbs",
      icon: (
        <Image
          src="/footer/Natural Herbs.svg"
          alt="Natural Herbs"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      ),
    },
    {
      label: "No Artificial Colors",
      icon: (
        <Image
          src="/footer/No Artificial Colors.svg"
          alt="No Artificial Colors"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      ),
    },
    {
      label: "No Added Sugar",
      icon: (
        <Image
          src="/footer/No Added Sugar.svg"
          alt="No Added Sugar"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      ),
    },
  ];

  const currentUSPList = metafieldUSPs.length > 0 ? metafieldUSPs : uspTags;

  const displayUSPs =
    currentUSPList.length > 0
      ? currentUSPList.map((label) => ({
          label,
          icon: (
            <CheckCircle2
              className="w-6 h-6 text-[#6B8E67]"
              strokeWidth={1.5}
            />
          ),
        }))
      : defaultUSPs;

  return (
    <div className="space-y-6">
      {/* Stock Badge */}
      <div className="flex items-center gap-2 md:gap-4">
        <span
          className={clsx(
            "inline-block text-[9px] md:text-[10px] font-semibold uppercase tracking-widest px-2.5 md:px-3 py-1 md:py-1.5 rounded-[4px]",
            isAvailable
              ? "bg-[#E8F3E8] text-[#6B8E67]"
              : "bg-red-50 text-red-600",
          )}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold text-neutral-900 leading-tight tracking-tight">
        {product.title}
        {selectedVariant && product.variants.length > 1 && (
          <span className="text-lg md:text-xl text-neutral-400 ml-2 md:ml-4 font-sans font-normal">
            ({selectedVariant.title})
          </span>
        )}
      </h1>

      {/* Short Description */}
      {product.description && (
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
          {product.description.length > 140 ? (
            <>
              {product.description.substring(0, 140)}...{" "}
              <a
                href="#product-tabs"
                className="text-[#A65B4A] font-semibold hover:underline cursor-pointer ml-1 inline-block"
              >
                See More
              </a>
            </>
          ) : (
            product.description
          )}
        </p>
      )}

      {/* Rating Row */}
      <div className="flex items-center gap-2 md:gap-3">
        <StarRating rating={parseFloat(product.rating?.value || "0")} />
        <span className="text-xs md:text-[13px] text-neutral-500 font-medium">
          {product.ratingCount?.value
            ? `(${product.ratingCount.value} Reviews)`
            : "(No Reviews)"}
        </span>
      </div>

      {/* Price Section */}
      <div className="flex items-baseline gap-3 md:gap-4 py-2">
        <Price
          amount={currentPrice}
          currencyCode={
            selectedVariant
              ? selectedVariant.price.currencyCode
              : product.priceRange.minVariantPrice.currencyCode
          }
          className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-neutral-900 leading-none"
        />
        {hasDiscount && (
          <Price
            amount={compareAtPrice}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            className="text-lg md:text-xl lg:text-2xl text-neutral-400 line-through font-sans"
          />
        )}
      </div>

      {/* Quantity & Bought Badges */}
      <div className="space-y-4">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

        <div className="inline-flex items-center gap-2 bg-[#E8F3E8] px-3 md:px-4 py-2 md:py-2.5 rounded-full border border-[#D1E7D1]">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-[#6B8E67] rounded-full flex items-center justify-center">
            <svg
              className="w-2.5 h-2.5 md:w-3 md:h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <span className="text-xs md:text-sm font-semibold text-[#2D312E]">
            {product.viewCount?.value || "9"}{" "}
            <span className="font-medium">
              people bought this in the last 24 hours
            </span>
          </span>
        </div>
      </div>

      {/* Also Available In */}
      {alsoAvailableProducts.length > 0 && (
        <div className="bg-[#FAF7F2] rounded-[5px] p-4 md:p-6 border border-[#E9E1D5]">
          <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] text-[#A65B4A] mb-4 md:mb-5">
            Also Available In:
          </p>
          <AlsoAvailableInCards products={alsoAvailableProducts} />
        </div>
      )}

      {/* CTA Buttons — Desktop (inline) */}
      <div className="hidden md:flex gap-4 pt-2">
        <div className="flex-1">
          <AddToCart
            product={product}
            quantity={quantity}
            className="w-full h-14 bg-[#6B8E67] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#5A7A56] rounded-[6px] shadow-sm"
          />
        </div>
        <BuyNow product={product} quantity={quantity} />
      </div>

      {/* USP Icons */}
      <div className="flex items-center justify-between py-6 md:py-8 border-y border-neutral-100">
        {displayUSPs.map((usp) => (
          <div
            key={usp.label}
            className="flex flex-col items-center gap-2 md:gap-3"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-neutral-200 flex items-center justify-center bg-white shadow-sm">
              {usp.icon}
            </div>
            <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.1em] text-neutral-700 text-center max-w-[70px] md:max-w-[80px] leading-tight font-sans">
              {usp.label}
            </span>
          </div>
        ))}
      </div>

      {/* Delivery Checker */}
      <DeliveryChecker />

      {/* Available Offers */}
      <AvailableOffers product={product} />
    </div>
  );
}
