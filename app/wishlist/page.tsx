"use client";

import { ProductCard } from "components/product/product-card";
import { useWishlist } from "components/wishlist/wishlist-context";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="main-container py-12 min-h-[60vh]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-neutral-900 mb-4">
          My Wishlist
        </h1>
        <p className="text-neutral-500 font-sans">
          Products you've saved for later.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-neutral-200 rounded-xl bg-white/50">
          <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mb-6">
            <svg
              className="h-10 w-10 text-[#A65B4A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-neutral-800 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-neutral-500 mb-8 max-w-xs text-center">
            Looks like you haven't saved any products yet. Start exploring our
            collection!
          </p>
          <Link
            href="/search"
            className="bg-brand-green text-white px-8 py-3 rounded-[6px] font-sans font-semibold uppercase tracking-widest hover:bg-brand-sage transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
