"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useWishlist } from "./wishlist-context";

export function WishlistIcon() {
  const { wishlistCount } = useWishlist();

  return (
    <div className="relative group cursor-pointer">
      <HeartIcon className="h-6 w-6 text-neutral-700 group-hover:text-brand-green transition-colors" />
      {wishlistCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A65B4A] text-[9px] font-bold text-white ring-2 ring-white animate-in zoom-in duration-300">
          {wishlistCount}
        </span>
      )}
    </div>
  );
}
