import { defaultSort, sorting } from "lib/constants";
import { getCollections, getProducts } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

type FilterShape =
  | { available: boolean }
  | { price: { min?: number; max?: number } }
  | { collectionHandle: string }
  | { productType: string }
  | { tag: string };

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const countryCode = req.cookies.get("countryCode")?.value || "IN";

  const sort = params.get("sort") || undefined;
  const searchValue = params.get("q") || undefined;
  const category = params.getAll("category");
  const concern = params.getAll("concern");
  const quantity = params.getAll("quantity");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const available = params.get("available");

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const [collections, concerns] = await Promise.all([
    getCollections(undefined, countryCode),
    getCollections("tag:concern", countryCode),
  ]);

  const filters: FilterShape[] = [];

  if (available === "true") filters.push({ available: true });
  if (available === "false") filters.push({ available: false });

  if (minPrice || maxPrice) {
    filters.push({
      price: {
        min: minPrice ? parseFloat(minPrice) : undefined,
        max: maxPrice ? parseFloat(maxPrice) : undefined,
      },
    });
  }

  category.forEach((title) => {
    const coll = collections.find((c) => c.title === title);
    filters.push(
      coll ? { collectionHandle: coll.handle } : { productType: title },
    );
  });

  concern.forEach((title) => {
    const coll = concerns.find((c) => c.title === title);
    filters.push({ tag: coll ? coll.handle : title });
  });

  quantity.forEach((q) => {
    const normalized = q.toUpperCase();
    let tag = normalized;
    if (normalized.endsWith("ML") && !normalized.includes(" ")) {
      tag = normalized.replace("ML", " ML");
    } else if (normalized.endsWith("G") && !normalized.includes(" ")) {
      tag = normalized.replace("G", " G");
    }
    filters.push({ tag });
  });

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
    filters: filters.length > 0 ? (filters as any) : undefined,
    countryCode,
  });

  return NextResponse.json(
    { products },
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=86400",
      },
    },
  );
}
