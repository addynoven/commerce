"use client";

import Grid from "components/grid";
import { useViewMode } from "components/layout/search/search-page-wrapper";
import { ProductCard } from "components/product/product-card";
import { Product } from "lib/shopify/types";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  const { viewMode } = useViewMode();

  return (
    <ul className={
      viewMode === "grid" 
        ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8" 
        : "flex flex-col gap-6"
    }>
      {products.map((product) => (
        <li key={product.handle} className="animate-fadeIn">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
