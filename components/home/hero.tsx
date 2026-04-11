import { getPage } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export async function Hero() {
  const page = await getPage("home");

  const title = page?.title || "Rooted in Ayurveda, Refined for Life";
  const body =
    page?.bodySummary ||
    page?.body ||
    "A carefully curated range of products crafted for those who value purity, balance, and intentional living.";

  return (
    <section className="relative w-full flex items-center h-[480px] md:h-[720px] bg-[#F5F5F5]">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/Home-Hero-Banner.webp"
          alt={title}
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
        <Image
          src="/home/phone-banner.png"
          alt={title}
          fill
          className="object-cover object-center block md:hidden"
          priority
        />
        {/* Design gradient: linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_60%)] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full main-container !pb-0">
        <div className="max-w-[560px] flex flex-col gap-8">
          {/* Title + Body */}
          <div className="flex flex-col gap-4">
            <h1 className="font-serif font-semibold text-[36px] md:text-[52px] leading-[110%] text-white">
              {title}
            </h1>
            <p className="font-sans font-normal text-[14px] md:text-[18px] leading-[140%] text-white max-w-[420px] md:max-w-none">
              {body}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/search"
            className="inline-flex items-center justify-center bg-white text-black font-sans font-medium text-[14px] tracking-[0.02em] uppercase rounded-[6px] w-[211px] h-[52px] hover:bg-black hover:text-white transition-colors duration-300"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
