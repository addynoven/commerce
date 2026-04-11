import { getExperts } from "lib/shopify";
import { AyurvedicExpertsClient } from "./ayurvedic-experts-client";

export async function AyurvedicExperts() {
  const expertsData = await getExperts();

  if (!expertsData?.length) return null;

  // Transform experts data from Metaobjects
  const experts = expertsData.map((expert: any) => {
    const fields = expert.fields;
    const name = fields.find((f: any) => f.key === "name")?.value || "Expert";
    const qualification =
      fields.find((f: any) => f.key === "qualification")?.value || "";
    const specialization =
      fields.find((f: any) => f.key === "specialization")?.value ||
      "Ayurvedic Expert";
    const imageUrl =
      fields.find((f: any) => f.key === "image")?.reference?.image?.url ||
      fields.find((f: any) => f.reference?.image?.url)?.reference?.image?.url;
    return {
      id: expert.id,
      handle: expert.handle,
      title: name,
      qualification: qualification,
      specialization: specialization,
      imageUrl: imageUrl,
    };
  });

  return (
    <section className="py-6 md:py-8 bg-white overflow-hidden">
      <div className="main-container text-center">
        <h2 className="text-[24px] md:text-[44px] font-serif font-semibold mb-4 md:mb-6 text-neutral-900 leading-tight max-w-2xl mx-auto tracking-tight">
          Need Guidance from an Ayurvedic Doctor and Experts?
        </h2>

        <AyurvedicExpertsClient experts={experts} />
      </div>
    </section>
  );
}
