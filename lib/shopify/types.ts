export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
  image?: Image;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  compareAtPrice?: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  image?: Image;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  media: Connection<Video>;
  seo: SEO;
  tags: string[];
  vendor: string;
  productType: string;
  usps?: { value: string };
  offers?: { value: string };
  viewCount?: { value: string };
  faqs?: { value: string };
  benefits?: { value: string };
  howToUse?: { value: string };
  ingredients?: { value: string };
  rating?: { value: string };
  ratingCount?: { value: string };
  reviewsJson?: { value: string };
  updatedAt: string;
};

export type ProductFilter = {
  available?: boolean;
  variantOption?: {
    name: string;
    value: string;
  };
  productType?: string;
  vendor?: string;
  price?: {
    min?: number;
    max?: number;
  };
  tag?: string;
};

export type Video = {
  id: string;
  sources: {
    url: string;
    mimeType: string;
    format: string;
  }[];
  previewImage: {
    url: string;
  };
};

export type Product = Omit<ShopifyProduct, "variants" | "images" | "media"> & {
  variants: ProductVariant[];
  images: Image[];
  videos: Video[];
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
  variables: {
    query?: string;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    filters?: ProductFilter[];
  };
};

export type ShopifyArticle = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  image?: Image;
  authorV2: {
    name: string;
  };
  blog: {
    handle: string;
    title: string;
  };
  seo: SEO;
};

export type Article = ShopifyArticle;

export type ShopifyBlogArticlesOperation = {
  data: {
    blog: {
      title: string;
      handle: string;
      articles: Connection<ShopifyArticle>;
    };
  };
  variables: {
    handle: string;
    first?: number;
  };
};

export type ShopifyBlogArticleOperation = {
  data: {
    blog: {
      articleByHandle: ShopifyArticle;
    };
  };
  variables: {
    blogHandle: string;
    articleHandle: string;
  };
};

export type ShopifyAllArticlesOperation = {
  data: {
    articles: Connection<ShopifyArticle>;
  };
  variables: {
    first?: number;
  };
};
export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};
