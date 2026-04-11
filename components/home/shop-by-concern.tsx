import { getCollections } from "lib/shopify";
import { ShopByConcernClient } from "./shop-by-concern-client";
import { cookies } from "next/headers";

export async function ShopByConcern() {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  const collections = await getCollections("tag:concern", countryCode);

  const concernCollections = collections.filter(
    (c) => c.handle !== "" && !c.handle.startsWith("hidden-"),
  );

  if (!concernCollections.length) return null;

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="main-container !pb-0 flex flex-col items-center gap-12">
        <h2 className="font-serif font-semibold text-[32px] md:text-[40px] leading-[120%] text-center text-[#000000]">
          Shop By Concern
        </h2>
        <ShopByConcernClient collections={concernCollections} />
      </div>
    </section>
  );
}
