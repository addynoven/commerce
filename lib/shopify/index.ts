import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "lib/constants";
import { isShopifyError } from "lib/type-guards";
import { ensureStartsWith } from "lib/utils";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  revalidateTag,
} from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import {
  customerAccessTokenCreateMutation,
  customerAddressCreateMutation,
  customerAddressDeleteMutation,
  customerAddressUpdateMutation,
  customerCreateMutation,
  customerDefaultAddressUpdateMutation,
} from "./mutations/customer";
import {
  getAllArticlesQuery,
  getBlogArticleQuery,
  getBlogArticlesQuery,
} from "./queries/blog";
import { getCartQuery } from "./queries/cart";
import {
  getCustomerAddressesQuery,
  getCustomerOrdersQuery,
  getCustomerQuery,
} from "./queries/customer";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from "./queries/product";
import {
  Article,
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  Customer,
  ShopifyAddToCartOperation,
  ShopifyAllArticlesOperation,
  ShopifyBlogArticleOperation,
  ShopifyBlogArticlesOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ProductFilter,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, "https://")
  : "";
const endpoint = domain ? `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}` : "";
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables,
  countryCode = "IN",
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
  countryCode?: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    if (!endpoint) {
      throw new Error("SHOPIFY_STORE_DOMAIN environment variable is not set");
    }

    // Inject @inContext dynamically into the root GraphQL query/mutation
    let localizedQuery = query;
    if (countryCode && /^query\s|^mutation\s/.test(query.trim())) {
      localizedQuery = query.replace(
        /(query|mutation)([^\{]+)\{/,
        `$1$2 @inContext(country: ${countryCode}) {`
      );
    }

    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(localizedQuery && { query: localizedQuery }),
        ...(variables && { variables }),
      }),
    });

    const body = await result.json();

    if (body.errors) {
      console.error("Shopify GraphQL Errors:", JSON.stringify(body.errors, null, 2));
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};

const reshapeCollection = (
  collection: ShopifyCollection,
): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/collections/${collection.handle}`,
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true,
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, media, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
    videos: removeEdgesAndNodes(media || { edges: [] }),
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds,
    },
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value!;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines,
    },
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  "use cache: private";
  cacheTag(TAGS.cart);
  cacheLife("seconds");

  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return undefined;
  }

  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

export async function customerCreate(input: any): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerCreateMutation,
    variables: { input },
  });

  return res.body.data.customerCreate;
}

export async function customerAccessTokenCreate(input: any): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerAccessTokenCreateMutation,
    variables: { input },
  });

  return res.body.data.customerAccessTokenCreate;
}

export async function getCustomerOrders(customerAccessToken: string): Promise<any[]> {
  const res = await shopifyFetch<any>({
    query: getCustomerOrdersQuery,
    variables: { customerAccessToken },
  });

  return removeEdgesAndNodes(res.body.data.customer?.orders || { edges: [] });
}

export async function getCustomerAddresses(customerAccessToken: string): Promise<any> {
  const res = await shopifyFetch<any>({
    query: getCustomerAddressesQuery,
    variables: { customerAccessToken },
  });

  return {
    addresses: removeEdgesAndNodes(res.body.data.customer?.addresses || { edges: [] }),
    defaultAddressId: res.body.data.customer?.defaultAddress?.id,
  };
}

export async function customerAddressCreate(customerAccessToken: string, address: any): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerAddressCreateMutation,
    variables: { customerAccessToken, address },
  });

  return res.body.data.customerAddressCreate;
}

export async function customerAddressUpdate(customerAccessToken: string, id: string, address: any): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerAddressUpdateMutation,
    variables: { customerAccessToken, id, address },
  });

  return res.body.data.customerAddressUpdate;
}

export async function customerAddressDelete(customerAccessToken: string, id: string): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerAddressDeleteMutation,
    variables: { customerAccessToken, id },
  });

  return res.body.data.customerAddressDelete;
}

export async function customerDefaultAddressUpdate(customerAccessToken: string, addressId: string): Promise<any> {
  const res = await shopifyFetch<any>({
    query: customerDefaultAddressUpdateMutation,
    variables: { customerAccessToken, addressId },
  });

  return res.body.data.customerDefaultAddressUpdate;
}

export async function getCustomer(customerAccessToken: string): Promise<Customer | null> {
  const res = await shopifyFetch<any>({
    query: getCustomerQuery,
    variables: {
      customerAccessToken,
    },
  });

  return res.body.data.customer;
}

export async function getCollection(
  handle: string,
  countryCode: string = "IN"
): Promise<Collection | undefined> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: {
      handle,
    },
    countryCode,
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  countryCode = "IN",
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  countryCode?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife("days");

  if (!endpoint) {
    console.log(
      `Skipping getCollectionProducts for '${collection}' - Shopify not configured`,
    );
    return [];
  }

  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
    },
    countryCode,
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products),
  );
}

export async function getCollections(query?: string, countryCode: string = "IN"): Promise<Collection[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  if (!endpoint) {
    console.log("Skipping getCollections - Shopify not configured");
    return [
      {
        handle: "",
        title: "All",
        description: "All products",
        seo: {
          title: "All",
          description: "All products",
        },
        path: "/search",
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    variables: query ? { query } : undefined,
    countryCode,
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);

  let reshaped = reshapeCollections(shopifyCollections).filter(
    (collection) => !collection.handle.startsWith("hidden"),
  );

  // Local fallback: filter collections based on handle
  if (query === "tag:category") {
    reshaped = reshaped.filter((c) => {
      const h = c.handle;
      // Core categories have simple handles, SEO ones are long and complex
      const isCore = h.split("-").length <= 3 && !c.title.includes("|");
      return (
        isCore &&
        (h.includes("herbal") ||
          h.includes("oil") ||
          h.includes("serum") ||
          h.includes("supplement") ||
          h.includes("care") ||
          h.includes("kit") ||
          h.includes("powder"))
      );
    });
  } else if (query === "tag:concern") {
    reshaped = reshaped.filter((c) => {
      const h = c.handle;
      const isCore = h.split("-").length <= 3 && !c.title.includes("|");
      return (
        isCore &&
        (h.includes("wellness") ||
          h.includes("pain") ||
          h.includes("immunity") ||
          h.includes("digestion") ||
          h.includes("weight") ||
          h.includes("organic") ||
          h.includes("stress") ||
          h.includes("sleep"))
      );
    });
  }

  const collections = [
    {
      handle: "",
      title: "All",
      description: "All products",
      seo: {
        title: "All",
        description: "All products",
      },
      path: "/search",
      updatedAt: new Date().toISOString(),
    },
    ...reshaped,
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  if (!endpoint) {
    console.log(`Skipping getMenu for '${handle}' - Shopify not configured`);
    return [];
  }

  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    variables: {
      handle,
    },
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/collections") // Keep as collections
        .replace("/pages", ""),
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle },
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string, countryCode: string = "IN"): Promise<Product | undefined> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  if (!endpoint) {
    console.log(`Skipping getProduct for '${handle}' - Shopify not configured`);
    return undefined;
  }

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle,
    },
    countryCode,
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string,
  countryCode: string = "IN"
): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: {
      productId,
    },
    countryCode,
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  filters,
  countryCode = "IN",
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  filters?: ProductFilter[];
  countryCode?: string;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  // If filters are provided, combine them with the base query
  let combinedQuery = query || "";
  if (filters && filters.length > 0) {
    const filterParts: string[] = [];

    // Group filters to use OR for same types
    const availabilities = filters
      .filter((f) => f.available !== undefined)
      .map((f) => f.available);
    const productTypes = filters
      .filter((f) => f.productType)
      .map((f) => f.productType);
    const collectionHandles = filters
      .filter((f) => (f as any).collectionHandle)
      .map((f) => (f as any).collectionHandle);
    const quantities = filters
      .filter((f) => f.variantOption?.name === "Quantity")
      .map((f) => f.variantOption?.value);
    const tags = filters.filter((f) => f.tag).map((f) => f.tag);
    const priceMins = filters
      .filter((f) => f.price?.min !== undefined)
      .map((f) => f.price?.min);
    const priceMaxes = filters
      .filter((f) => f.price?.max !== undefined)
      .map((f) => f.price?.max);

    if (availabilities.length > 0) {
      filterParts.push(`available_for_sale:${availabilities[0]}`);
    }

    if (collectionHandles.length > 0) {
      const parts = collectionHandles.map((h) => `collections:${h}`);
      filterParts.push(`(${parts.join(" OR ")})`);
    }

    if (productTypes.length > 0) {
      const parts = productTypes.map((t) => `product_type:"${t}"`);
      filterParts.push(`(${parts.join(" OR ")})`);
    }

    if (quantities.length > 0) {
      // Products often store quantity in tags if not variants
      const parts = quantities.map((q) => `tag:"${q}"`);
      filterParts.push(`(${parts.join(" OR ")})`);
    }

    if (tags.length > 0) {
      const parts = tags.map((t) => `tag:"${t}"`);
      filterParts.push(`(${parts.join(" OR ")})`);
    }

    if (priceMins.length > 0) {
      const min = Math.min(...(priceMins as number[]));
      filterParts.push(`price:>=${min}`);
    }

    if (priceMaxes.length > 0) {
      const max = Math.max(...(priceMaxes as number[]));
      filterParts.push(`price:<=${max}`);
    }

    if (filterParts.length > 0) {
      const filtersJoined = filterParts.join(" AND ");
      combinedQuery = combinedQuery
        ? `(${combinedQuery}) AND (${filtersJoined})`
        : filtersJoined;
    }
  }

  console.log("DEBUG: Final Shopify Query:", combinedQuery);

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: {
      query: combinedQuery || undefined,
      reverse,
      sortKey,
    },
    countryCode,
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getBlogArticles(
  blogHandle: string = "news",
): Promise<Article[]> {
  "use cache";
  cacheTag(TAGS.blogs);
  cacheLife("days");

  if (!endpoint) {
    console.log(
      `Skipping getBlogArticles for '${blogHandle}' - Shopify not configured`,
    );
    return [];
  }

  const res = await shopifyFetch<ShopifyBlogArticlesOperation>({
    query: getBlogArticlesQuery,
    variables: {
      handle: blogHandle,
    },
  });

  if (!res.body.data.blog) {
    return [];
  }

  return removeEdgesAndNodes(res.body.data.blog.articles);
}

export async function getBlogArticle(
  blogHandle: string,
  articleHandle: string,
): Promise<Article | undefined> {
  "use cache";
  cacheTag(TAGS.blogs);
  cacheLife("days");

  if (!endpoint) {
    console.log(
      `Skipping getBlogArticle for '${articleHandle}' - Shopify not configured`,
    );
    return undefined;
  }

  const res = await shopifyFetch<ShopifyBlogArticleOperation>({
    query: getBlogArticleQuery,
    variables: {
      blogHandle,
      articleHandle,
    },
  });

  return res.body.data.blog?.articleByHandle;
}

export async function getAllArticles(): Promise<Article[]> {
  "use cache";
  cacheTag(TAGS.blogs);
  cacheLife("days");

  if (!endpoint) {
    console.log("Skipping getAllArticles - Shopify not configured");
    return [];
  }

  const res = await shopifyFetch<ShopifyAllArticlesOperation>({
    query: getAllArticlesQuery,
  });

  return removeEdgesAndNodes(res.body.data.articles);
}

export async function getExperts() {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("days");

  const query = `
    query {
      metaobjects(type: "expert", first: 10) {
        edges {
          node {
            id
            handle
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch<any>({ query });

  return res.body.data.metaobjects.edges.map((edge: any) => edge.node) || [];
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections, "seconds");
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products, "seconds");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
