"use client";

import { AddToCart } from "components/cart/add-to-cart";
import { Product } from "lib/shopify/types";
import { BuyNow } from "./buy-now";

export function MobileProductCTA({ product }: { product: Product }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
      <div className="flex-1">
        <AddToCart
          product={product}
          quantity={1}
          className="w-full h-11 bg-white border border-[#6B8E67] text-[#6B8E67] text-[10px] font-semibold uppercase tracking-[0.15em] hover:bg-neutral-50 rounded-[6px]"
        />
      </div>
      <BuyNow
        product={product}
        quantity={1}
        className="!w-full !h-11 !bg-[#6B8E67] !text-white !border-0 !text-[10px] !font-semibold !uppercase !tracking-[0.15em] hover:!bg-[#5A7A56] !rounded-[6px]"
      />
    </div>
  );
}
