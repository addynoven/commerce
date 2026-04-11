import { cookies } from "next/headers";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ManufacturerInfo } from "components/product/manufacturer-info";
import { ProductCard } from "components/product/product-card";
import { ProductDescription } from "components/product/product-description";
import { ProductTabs } from "components/product/product-tabs";
import { ReviewSection } from "components/product/review-section";
import { getReviewsForProduct } from "components/product/review-form-action";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const product = await getProduct(params.handle, countryCode);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
        images: [
          {
            url,
            width,
            height,
            alt,
          },
        ],
      }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const product = await getProduct(params.handle, countryCode);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const localReviews = await getReviewsForProduct(product.id);

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* Breadcrumb */}
      <div className="main-container pt-8">
        <nav className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400">
          <Link href="/" className="hover:text-neutral-800 transition-colors">
            Home
          </Link>
          {" / "}
          <Link
            href="/search"
            className="hover:text-neutral-800 transition-colors"
          >
            All Products
          </Link>
          {" / "}
          <span className="text-neutral-900">{product.title}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="main-container !pb-0">
        <div className="flex flex-col py-8 lg:flex-row lg:gap-16">
          {/* Gallery */}
          <div className="h-full w-full basis-full lg:basis-1/2">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-neutral-100" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Product Info */}
          <div className="basis-full lg:basis-1/2 pt-8 lg:pt-0">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Content Tabs Section */}
      <div id="product-tabs" className="w-full">
        <Suspense fallback={null}>
          <ProductTabs descriptionHtml={product.descriptionHtml || ""} />
        </Suspense>
      </div>

      {/* People Usually Pair This With */}
      <Suspense fallback={null}>
        <PairingProducts id={product.id} />
      </Suspense>

      {/* Customer Reviews Section */}
      <div className="main-container py-16">
        <Suspense fallback={null}>
          <ReviewSection product={product} localReviews={localReviews} />
        </Suspense>
      </div>

      {/* Manufacturer Information */}
      <div className="w-full mt-16 mb-8 border-y border-neutral-100">
        <Suspense fallback={null}>
          <ManufacturerInfo product={product} />
        </Suspense>
      </div>

      {/* You May Also Like */}
      <div className="bg-white">
        <Suspense fallback={null}>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>


      <Footer />
    </div>
  );
}

async function PairingProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  const pairingProducts = relatedProducts.slice(0, 3);

  return (
    <div className="py-16 bg-white">
      <div className="main-container !pb-0">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-neutral-900 mb-12 italic">
          People Usually Pair This With
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          {pairingProducts.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-16 md:py-24 main-container">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-neutral-900 mb-12 italic">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {relatedProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.handle} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/search"
          className="border border-neutral-300 px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
        >
          Shop All Products
        </Link>
      </div>
    </div>
  );
}
