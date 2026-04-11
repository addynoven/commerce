import Image from "next/image";

export default function BlogBanner() {
  return (
    <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900/30 z-10" />
      <Image
        src="/blog_banner.png"
        alt="Wellness Insights"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-4 tracking-tight">
          Wellness Insights
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-white/90 font-medium leading-relaxed tracking-wide">
          Learn, explore, and understand Ayurveda for everyday life.
        </p>
      </div>
    </div>
  );
}
