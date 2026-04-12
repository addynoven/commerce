import { cookies } from "next/headers";
import ProductGridItems from "components/layout/product-grid-items";
import SearchPageWrapper from "components/layout/search/search-page-wrapper";
import { defaultSort, sorting } from "lib/constants";
import { getCollections, getProducts } from "lib/shopify";
import { Testimonials } from "components/home/testimonials";

import CollectionBanner from "components/layout/search/collection-banner";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = (await props.searchParams) || {};
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const {
    sort,
    q: searchValue,
    category,
    concern,
    quantity,
    minPrice,
    maxPrice,
    available,
  } = searchParams;

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Fetch metadata first to build filters
  const collections = await getCollections(undefined, countryCode);
  const concerns = await getCollections("tag:concern", countryCode);

  // Build filters for Shopify API
  const filters: any[] = [];

  if (available === "true") filters.push({ available: true });
  if (available === "false") filters.push({ available: false });

  if (minPrice || maxPrice) {
    filters.push({
      price: {
        min: minPrice ? parseFloat(minPrice as string) : undefined,
        max: maxPrice ? parseFloat(maxPrice as string) : undefined,
      },
    });
  }

  if (category) {
    const categoryTitles = Array.isArray(category) ? category : [category];
    categoryTitles.forEach((title) => {
      const coll = collections.find((c) => c.title === title);
      if (coll) {
        filters.push({ collectionHandle: coll.handle } as any);
      } else {
        filters.push({ productType: title });
      }
    });
  }

  if (concern) {
    const concernArr = Array.isArray(concern) ? concern : [concern];
    concernArr.forEach((title) => {
      const coll = concerns.find((c) => c.title === title);
      if (coll) {
        filters.push({ tag: coll.handle } as any);
      } else {
        filters.push({ tag: title });
      }
    });
  }

  if (quantity) {
    const quantitiesArr = Array.isArray(quantity) ? quantity : [quantity];
    quantitiesArr.forEach((q) => {
      // Map "100g" -> "100 G", "100ml" -> "100 ML"
      const normalized = q.toUpperCase();
      let tag = normalized;
      if (normalized.endsWith("ML") && !normalized.includes(" ")) {
        tag = normalized.replace("ML", " ML");
      } else if (normalized.endsWith("G") && !normalized.includes(" ")) {
        tag = normalized.replace("G", " G");
      }
      filters.push({ tag });
    });
  }

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue as string,
    filters: filters.length > 0 ? filters : undefined,
    countryCode,
  });
  const allProducts = await getProducts({ countryCode }); // For filters metadata

  const resultsText = products.length > 1 ? "results" : "result";

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

  return (
    <>
      <CollectionBanner
        title="All Products"
        description="A carefully curated range of products crafted for those who value purity, balance, and intentional living."
        image="/banner/AllProducts-Banner-Background.webp"
      />

      <SearchPageWrapper
        collections={collections}
        concerns={concerns}
        productCount={products.length}
        quantities={quantities}
        header={
          <div className="pt-4">
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-8">
              Home / <span className="text-neutral-900">All Products</span>
            </div>

            {searchValue ? (
              <p className="mb-4 font-sans text-sm">
                {products.length === 0
                  ? "There are no products that match "
                  : `Showing ${products.length} ${resultsText} for `}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </p>
            ) : null}
          </div>
        }
      >
        {products.length > 0 ? (
          <ProductGridItems products={products} />
        ) : (
          <div className="py-12 text-center text-neutral-500 font-sans">
            No products found matching your search.
          </div>
        )}
      </SearchPageWrapper>

      <Testimonials />
    </>
  );
}
