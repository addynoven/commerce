import { getCollections } from "lib/shopify";
import { CategoriesClient } from "./categories-client";
import { cookies } from "next/headers";

// Static categories that are always shown regardless of Shopify tags.
// Replace image paths with Shopify CDN URLs once collections are set up.
const STATIC_CATEGORIES = [
  {
    handle: "wellness",
    title: "Wellness",
    path: "/collections/wellness",
    image: {
      url: "/images/category-Wellness.png",
      altText: "Wellness",
    },
  },
  {
    handle: "pain-relief",
    title: "Pain Relief",
    path: "/collections/pain-relief",
    image: {
      url: "/images/category-PainRelief.png",
      altText: "Pain Relief",
    },
  },
];

export async function Categories() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const collections = await getCollections("tag:category", countryCode);

  // Filter out the 'All' collection and hidden ones
  const shopifyCollections = (collections ?? []).filter(
    (c) => c.handle !== "" && !c.handle.startsWith("hidden-"),
  );

  // Merge: Shopify collections first, then append static ones not already present
  const shopifyHandles = new Set(shopifyCollections.map((c) => c.handle));
  const staticToAdd = STATIC_CATEGORIES.filter(
    (c) => !shopifyHandles.has(c.handle),
  );
  const displayCollections = [...shopifyCollections, ...staticToAdd];

  if (!displayCollections.length) return null;

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="main-container !pb-0 flex flex-col items-center gap-12">
        <h2 className="font-serif font-semibold text-[32px] md:text-[40px] leading-[120%] text-center text-[#000000]">
          Shop By Categories
        </h2>
        <CategoriesClient collections={displayCollections} />
      </div>
    </section>
  );
}
