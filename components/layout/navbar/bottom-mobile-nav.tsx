"use client";

import {
  ListBulletIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { WishlistIcon } from "components/wishlist/wishlist-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Customer } from "lib/shopify/types";
import { ShopByMenu } from "./shop-by-menu";

export function BottomMobileNav({
  categories = [],
  concerns = [],
  customer = null,
}: {
  categories?: any[];
  concerns?: any[];
  customer?: Customer | null;
}) {
  const pathname = usePathname();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  // Hide bottom nav on product detail pages
  if (pathname.includes("/product/")) {
    return null;
  }

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#FAFAF8] border-t border-neutral-200 px-6 py-3 z-50 flex justify-between items-center pb-6">
        <button
          onClick={() => setIsShopMenuOpen(true)}
          className="flex flex-col items-center gap-1 text-neutral-900 outline-none"
        >
          <ListBulletIcon className="h-[22px] w-[22px]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium font-sans">Shop By</span>
        </button>

        <Link
          href="/wishlist"
          aria-label="Wishlist"
          className="flex flex-col items-center gap-1 text-neutral-900"
        >
          <div className="relative">
            <WishlistIcon />
          </div>
          <span className="text-[10px] font-medium font-sans -mt-1">
            Wishlist
          </span>
        </Link>

        <Link
          href="/search"
          className="flex flex-col items-center gap-1 text-neutral-900"
        >
          <MagnifyingGlassIcon
            className="h-[22px] w-[22px]"
            strokeWidth={1.5}
          />
          <span className="text-[10px] font-medium font-sans">Search</span>
        </Link>

        <Link
          href={customer ? "/account" : "/account/login"}
          aria-label="Account"
          className="flex flex-col items-center gap-1 text-neutral-900"
        >
          <UserIcon className="h-[22px] w-[22px]" strokeWidth={1.5} />
          <span className="text-[10px] font-medium font-sans">
            {customer ? customer.firstName : "Account"}
          </span>
        </Link>
      </div>

      <ShopByMenu
        isOpen={isShopMenuOpen}
        onClose={() => setIsShopMenuOpen(false)}
        categories={categories}
        concerns={concerns}
      />
    </>
  );
}
