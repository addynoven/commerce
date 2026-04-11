import { getCollectionProducts } from "lib/shopify";
import { RealLifeProductsClient } from "./real-life-products-client";
import { cookies } from "next/headers";

export async function RealLifeProducts() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const products = await getCollectionProducts({
    collection: "avada-best-sellers",
    countryCode,
  });

  if (!products?.length) return null;

  return <RealLifeProductsClient products={products} />;
}
