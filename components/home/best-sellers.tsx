import { ProductCarouselClient } from "./product-carousel-client";
import { getCollectionProducts } from "lib/shopify";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export async function BestSellers() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const products = await getCollectionProducts({
    collection: "avada-best-sellers",
    countryCode,
  });

  if (!products?.length) return null;

  return (
    <section className="py-6 md:py-8 bg-white overflow-x-clip">
      <div className="main-container">
        <h2 className="font-serif font-semibold text-[28px] md:text-[40px] leading-[120%] text-center mb-6 md:mb-10 text-[#000000]">
          Our Best Sellers
        </h2>

        <ProductCarouselClient products={products.slice(0, 5)} showBestsellerBadge />


        {/* Shop All CTA */}
        <div className="flex justify-center">
          <Link
            href="/search"
            className="border border-neutral-300 px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 rounded-[5px]"
          >
            Shop All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
