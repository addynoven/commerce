"use client";

import { Product } from "lib/shopify/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CATALOG_TTL_MS = 5 * 60 * 1000; // 5 minutes

type CatalogState = {
  products: Product[] | null;
  fetchedAt: number;
  set: (products: Product[]) => void;
  isFresh: () => boolean;
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      products: null,
      fetchedAt: 0,
      set: (products) => set({ products, fetchedAt: Date.now() }),
      isFresh: () => {
        const { products, fetchedAt } = get();
        if (!products || !fetchedAt) return false;
        return Date.now() - fetchedAt < CATALOG_TTL_MS;
      },
    }),
    {
      name: "aarshaveda-catalog",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
