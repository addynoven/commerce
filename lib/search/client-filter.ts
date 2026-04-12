import { defaultSort, sorting } from "lib/constants";
import { Product } from "lib/shopify/types";
import categoryKeywordsRaw from "data/category-keywords.json";

type CategoryConfig = { include: string[]; exclude?: string[] };
const CATEGORY_KEYWORDS: Record<string, CategoryConfig> = Object.fromEntries(
  Object.entries(categoryKeywordsRaw as Record<string, unknown>).filter(
    ([key]) => !key.startsWith("_"),
  ),
) as Record<string, CategoryConfig>;

export type ClientFilterInput = {
  query?: string;
  sort?: string;
  category?: string[];
  concern?: string[];
  quantity?: string[];
  minPrice?: number;
  maxPrice?: number;
  available?: "true" | "false" | undefined;
};

const QUANTITY_OPTION_NAMES = new Set(["quantity", "size", "weight"]);

function normalizeQuantity(value: string): string {
  const up = value.toUpperCase().replace(/\s+/g, "");
  return up;
}

function matchCategoryByKeywords(
  product: Product,
  categoryTitle: string,
): boolean {
  const config = CATEGORY_KEYWORDS[categoryTitle];
  if (!config) return false;
  const haystack = `${product.title} ${product.vendor || ""} ${product.tags.join(" ")}`.toLowerCase();
  const includes = config.include || [];
  const excludes = config.exclude || [];
  if (includes.length === 0) return false;
  const hit = includes.some((kw) => haystack.includes(kw.toLowerCase()));
  if (!hit) return false;
  if (excludes.some((kw) => haystack.includes(kw.toLowerCase()))) return false;
  return true;
}

function matchCategory(product: Product, titles: string[]): boolean {
  if (titles.length === 0) return true;
  const pType = product.productType?.toLowerCase() || "";
  const tags = product.tags.map((t) => t.toLowerCase());
  return titles.some((rawTitle) => {
    if (matchCategoryByKeywords(product, rawTitle)) return true;
    const title = rawTitle.toLowerCase();
    return (
      pType === title ||
      tags.includes(title) ||
      tags.includes(title.replace(/\s+/g, "-"))
    );
  });
}

function matchConcern(product: Product, titles: string[]): boolean {
  if (titles.length === 0) return true;
  const lowered = titles.map((t) => t.toLowerCase());
  const tags = product.tags.map((t) => t.toLowerCase());
  return lowered.some(
    (title) =>
      tags.includes(title) ||
      tags.includes(title.replace(/\s+/g, "-")) ||
      tags.includes(`concern:${title}`),
  );
}

function matchQuantity(product: Product, values: string[]): boolean {
  if (values.length === 0) return true;
  const normalizedTargets = values.map(normalizeQuantity);
  const productValues = product.options
    .filter((o) => QUANTITY_OPTION_NAMES.has(o.name.toLowerCase()))
    .flatMap((o) => o.values.map(normalizeQuantity));
  if (productValues.length === 0) return false;
  return normalizedTargets.some((target) => productValues.includes(target));
}

function matchPrice(
  product: Product,
  minPrice?: number,
  maxPrice?: number,
): boolean {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  if (Number.isNaN(price)) return true;
  if (minPrice !== undefined && price < minPrice) return false;
  if (maxPrice !== undefined && price > maxPrice) return false;
  return true;
}

function matchAvailable(
  product: Product,
  available: ClientFilterInput["available"],
): boolean {
  if (!available) return true;
  if (available === "true") return product.availableForSale;
  return !product.availableForSale;
}

function matchQuery(product: Product, query?: string): boolean {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    product.title.toLowerCase().includes(q) ||
    product.description?.toLowerCase().includes(q) ||
    product.vendor?.toLowerCase().includes(q) ||
    product.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function sortProducts(products: Product[], sortSlug?: string): Product[] {
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sortSlug) || defaultSort;
  const sorted = [...products];
  switch (sortKey) {
    case "PRICE":
      sorted.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
      break;
    case "CREATED_AT":
      sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      break;
    case "BEST_SELLING":
      // Shopify-determined; keep source order.
      break;
    case "RELEVANCE":
    default:
      break;
  }
  return reverse ? sorted.reverse() : sorted;
}

export function filterProductsClient(
  products: Product[],
  input: ClientFilterInput,
): Product[] {
  const filtered = products.filter(
    (p) =>
      matchQuery(p, input.query) &&
      matchCategory(p, input.category || []) &&
      matchConcern(p, input.concern || []) &&
      matchQuantity(p, input.quantity || []) &&
      matchPrice(p, input.minPrice, input.maxPrice) &&
      matchAvailable(p, input.available),
  );
  return sortProducts(filtered, input.sort);
}

export function parseSearchString(search: string): ClientFilterInput {
  const params = new URLSearchParams(search);
  const minPriceRaw = params.get("minPrice");
  const maxPriceRaw = params.get("maxPrice");
  const availableRaw = params.get("available");
  return {
    query: params.get("q") || undefined,
    sort: params.get("sort") || undefined,
    category: params.getAll("category"),
    concern: params.getAll("concern"),
    quantity: params.getAll("quantity"),
    minPrice: minPriceRaw ? Number(minPriceRaw) : undefined,
    maxPrice: maxPriceRaw ? Number(maxPriceRaw) : undefined,
    available:
      availableRaw === "true" || availableRaw === "false"
        ? (availableRaw as "true" | "false")
        : undefined,
  };
}
