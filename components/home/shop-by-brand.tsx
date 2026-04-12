import { getCollectionProducts, getProducts } from "lib/shopify";
import { ShopByBrandClient } from "./shop-by-brand-client";
import { cookies } from "next/headers";

export async function ShopByBrand() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";

  // Fetch products for "Shop by Brand" sections.
  // Vendor names in Shopify include apostrophes/spaces, so they must be quoted.
  const [products, aarshavedaProducts, naturvedaProducts, dasapushpamProducts] =
    await Promise.all([
      getCollectionProducts({ collection: "avada-best-sellers", countryCode }),
      getProducts({ query: `vendor:"Aarshaveda"`, countryCode }),
      getProducts({ query: `vendor:"Nature's Veda"`, countryCode }),
      getProducts({ query: `vendor:"Dasapushpam"`, countryCode }),
    ]);

  if (
    !products?.length &&
    !aarshavedaProducts.length &&
    !naturvedaProducts.length &&
    !dasapushpamProducts.length
  )
    return null;

  return (
    <ShopByBrandClient
      products={products}
      aarshavedaProducts={aarshavedaProducts}
      naturvedaProducts={naturvedaProducts}
      dasapushpamProducts={dasapushpamProducts}
    />
  );
}
