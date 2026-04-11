import {
  getCollection,
  getCollectionProducts,
  getCollections,
  getProducts,
} from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import ProductGridItems from "components/layout/product-grid-items";
import SearchPageWrapper from "components/layout/search/search-page-wrapper";
import { defaultSort, sorting } from "lib/constants";
import { AyurvedicExperts } from "components/home/ayurvedic-experts";
import { Testimonials } from "components/home/testimonials";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const collection = await getCollection(params.collection, countryCode);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

import CollectionBanner from "components/layout/search/collection-banner";

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  // Fetch all data locally
  const collectionsPromise = getCollections(undefined, countryCode);
  const productsPromise = getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
    countryCode,
  });
  const allProductsPromise = getProducts({ countryCode }); // For filter quantities
  const collectionPromise = getCollection(params.collection, countryCode);

  const [collections, products, allProducts, collection] = await Promise.all([
    collectionsPromise,
    productsPromise,
    allProductsPromise,
    collectionPromise,
  ]);

  if (!collection) return notFound();

  // Extract unique quantities from all products for the filter sidebar
  const quantities = Array.from(
    new Set(
      allProducts.flatMap((p) =>
        p.options
          .filter((o) => ["Quantity", "Size", "Weight"].includes(o.name))
          .flatMap((o) => o.values),
      ),
    ),
  ).sort();

  // Category specific banner images and content overrides...
  const bannerImages: { [key: string]: string } = {
    bestsellers: "/images/category-banner.png",
    "new-arrivals": "/images/category-banner.png",
    "combos-kits": "/images/category-banner.png",
    "organic-products": "/images/category-banner.png",
    "herbal-supplements": "/images/category-banner.png",
    "oils-lotions-serums": "/images/concerns-banner.png",
    wellness: "/images/collections-banner.png",
    "hair-care": "/images/collections-banner.png",
    "face-care": "/images/collections-banner.png",
    "body-care": "/images/collections-banner.png",
    "baby-care": "/images/collections-banner.png",
    "pain-relief": "/images/concerns-banner.png",
    "immunity-booster": "/images/concerns-banner.png",
    "weight-management": "/images/concerns-banner.png",
  };

  const bannerImage =
    bannerImages[params.collection] || "/images/collections-banner.png";

  return (
    <>
      <CollectionBanner
        title={collection.title}
        description={
          collection.description ||
          "Explore our premium range of Ayurvedic products."
        }
        image={bannerImage}
      />

      <SearchPageWrapper
        collections={collections}
        productCount={products.length}
        quantities={quantities}
        header={
          <div className="pt-4 mb-2">
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400">
              Home /{" "}
              <span className="text-neutral-900">{collection.title}</span>
            </div>
          </div>
        }
      >
        {products.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 font-sans">
            No products found in this collection.
          </div>
        ) : (
          <ProductGridItems products={products} />
        )}
      </SearchPageWrapper>

      <AyurvedicExperts />
      <Testimonials />
    </>
  );
}
