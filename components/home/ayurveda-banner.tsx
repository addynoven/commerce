import Image from "next/image";
import Link from "next/link";

export function AyurvedaBanner() {
  return (
    <section className="relative h-[400px] md:h-[640px] w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/Home-Our Story-Background.webp"
          alt="Our Story"
          fill
          className="object-cover"
        />
        {/* Design gradient: linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content — max-width 640px, center aligned */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4 w-full max-w-[640px]">
        {/* Title + body group — gap 16px */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-serif font-semibold text-[36px] md:text-[52px] leading-[110%] text-white">
            Demystifying Ayurveda for Everyday Wellness
          </h2>
          <p className="font-sans font-normal text-[14px] md:text-[16px] leading-[140%] text-white">
            Aarshaveda is inspired by Ayurveda—the ancient knowledge system
            rooted in balance, wellness, and conscious living.
          </p>
        </div>

        {/* Button — 172px × 52px */}
        <Link
          href="/about"
          className="inline-flex items-center justify-center bg-white text-black font-sans font-medium text-[14px] tracking-[0.02em] uppercase rounded-[6px] w-[172px] h-[52px] hover:bg-black hover:text-white transition-colors duration-300"
        >
          Know Our Story
        </Link>
      </div>
    </section>
  );
}
