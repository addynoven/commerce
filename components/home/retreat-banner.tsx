import { getPage } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export async function RetreatBanner() {
  const page = await getPage("retreat");

  const title = page?.title || "A Space to Restore and Rebalance";
  const body =
    page?.bodySummary ||
    page?.body ||
    "Our retreats offer a mindful blend of Ayurveda, nature, and guided practices—creating an environment that supports deep relaxation and conscious living.";

  return (
    <section className="relative h-[480px] md:h-[640px] w-full overflow-hidden">
      {/* Background with dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/Home-Sacred lotus-Section-Background.webp"
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-12 md:px-[120px] md:py-[120px]">
        <div className="flex max-w-[560px] flex-col items-center gap-8">
          {/* Logo + Text Group */}
          <div className="flex flex-col items-center gap-5">
            {/* Sacred Lotus Logo */}
            <div className="relative h-[147px] w-[80px]">
              <Image
                src="/the-sacred-lotus.webp"
                alt="The Sacred Lotus"
                fill
                className="object-contain"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start gap-4">
              <h2 className="w-full font-serif text-[28px] font-semibold leading-[120%] text-white md:text-[40px] text-center">
                {title}
              </h2>

              <p className="w-full font-sans text-[16px] font-normal leading-[140%] text-white md:text-[18px] text-center">
                {body}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href="https://www.sacredlotusretreat.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-[6px] bg-white px-4 py-4 font-sans text-[14px] font-medium uppercase leading-[140%] tracking-[0.02em] text-black transition-colors duration-300 hover:bg-neutral-100"
          >
            Know More About Retreat
          </Link>
        </div>
      </div>
    </section>
  );
}
