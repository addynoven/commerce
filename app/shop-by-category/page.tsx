import CategoryCard, {
    CategoryItem,
} from "components/layout/category/category-card";
import Footer from "components/layout/footer";
import { getCollections } from "lib/shopify";
import Image from "next/image";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shop by Category | Aarshaveda",
  description: "Browse our premium Ayurvedic wellness products by category.",
};

export default async function ShopByCategoryPage() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const collections = await getCollections("tag:category", countryCode);
  // Map collections to CategoryItem format, using collection.title and image if available
  const productCategories: CategoryItem[] = collections.map((c) => ({
    title: c.title,
    image: c.image?.url || "/images/collections-banner.png",
    path: `/collections/${c.handle}`,
  }));

  return (
    <div className="bg-white">
      {/* Banner Section */}
      <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/40 z-10" />
        <Image
          src="/images/category-banner.png"
          alt="Shop By Category"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-4 tracking-tight leading-tight">
            Shop By Category
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-white/90 font-medium leading-relaxed tracking-wide">
            Explore products grouped by care type and usage.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="main-container py-8">
        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400">
          Home / <span className="text-neutral-900">Shop By Category</span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
