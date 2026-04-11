import Image from "next/image";

export default function CollectionBanner({
  title,
  description,
  image = "/images/collections-banner.png",
}: {
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
      {/* Background Image Placeholder - Will be updated with generated image */}
      <div className="absolute inset-0 bg-neutral-900/40 z-10" />
      <div className="relative h-full w-full">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-white/90 font-medium leading-relaxed tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
}
