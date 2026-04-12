"use client";

import ProductGridItems from "components/layout/product-grid-items";
import {
  filterProductsClient,
  parseSearchString,
} from "lib/search/client-filter";
import { Product } from "lib/shopify/types";
import { useCatalogStore } from "lib/stores/catalog-store";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  initialProducts: Product[];
  allProducts: Product[];
};

function readSearchString(): string {
  if (typeof window === "undefined") return "";
  return window.location.search.replace(/^\?/, "");
}

export function CachedProductsGrid({ initialProducts, allProducts }: Props) {
  const storedCatalog = useCatalogStore((s) => s.products);
  const setCatalog = useCatalogStore((s) => s.set);
  const isFresh = useCatalogStore((s) => s.isFresh);

  const [searchString, setSearchString] = useState<string>("");
  const hydratedRef = useRef(false);

  // Seed the catalog store with the server-provided full catalog exactly once
  // per load so the persisted store stays fresh and in sync.
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    if (!isFresh() || (storedCatalog?.length ?? 0) !== allProducts.length) {
      setCatalog(allProducts);
    }
  }, [allProducts, isFresh, setCatalog, storedCatalog]);

  // Sync with the URL + listen for shallow history updates from the sidebar.
  useEffect(() => {
    const sync = () => setSearchString(readSearchString());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const products = useMemo(() => {
    // On the very first render (before effects run), render what the server
    // already sent so there is zero flash of wrong content.
    if (!hydratedRef.current && searchString === "") {
      return initialProducts;
    }
    const catalog =
      storedCatalog && storedCatalog.length > 0 ? storedCatalog : allProducts;
    const filters = parseSearchString(searchString);
    return filterProductsClient(catalog, filters);
  }, [allProducts, initialProducts, searchString, storedCatalog]);

  if (products.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-500 font-sans">
        No products found matching your search.
      </div>
    );
  }

  return <ProductGridItems products={products} />;
}
