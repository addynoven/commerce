import CategoryCard, {
  CategoryItem,
} from "components/layout/category/category-card";
import Footer from "components/layout/footer";
import { getCollections } from "lib/shopify";
import { cookies } from "next/headers";

export const metadata = {
  title: "Our Collections | Aarshaveda",
  description:
    "Explore our curated Ayurvedic collections for holistic health and wellness.",
};

export default async function CollectionsPage() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const collections = await getCollections(undefined, countryCode);

  const collectionsData: CategoryItem[] = collections
    .filter((c) => c.handle !== "" && !c.handle.startsWith("hidden-"))
    .map((c) => ({
      title: c.title,
      image: c.image?.url || "/images/collections-banner.png",
      path: `/collections/${c.handle}`,
    }));

  return (
    <div className="bg-white">
      <div className="main-container flex flex-col items-center gap-12">
        <h2 className="font-serif font-semibold text-[32px] md:text-[40px] leading-[120%] text-center text-[#000000]">
          Shop By Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {collectionsData.map((collection) => (
            <CategoryCard key={collection.title} category={collection} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
