"use client";

import { Product } from "lib/shopify/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export { buildCacheKey } from "./product-cache-key";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type CacheEntry = {
  products: Product[];
  timestamp: number;
};

type ProductCacheState = {
  cache: Record<string, CacheEntry>;
  get: (key: string) => Product[] | null;
  set: (key: string, products: Product[]) => void;
  clear: () => void;
};

export const useProductCacheStore = create<ProductCacheState>()(
  persist(
    (set, getState) => ({
      cache: {},
      get: (key) => {
        const entry = getState().cache[key];
        if (!entry) return null;
        if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
        return entry.products;
      },
      set: (key, products) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { products, timestamp: Date.now() },
          },
        })),
      clear: () => set({ cache: {} }),
    }),
    {
      name: "aarshaveda-product-cache",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cache: state.cache }),
    },
  ),
);

