import Image from "next/image";

export default function ContactBanner() {
  return (
    <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900/40 z-10" />
      <Image
        src="/banner/Contact-Hero-Banner.webp"
        alt="Get in Touch with Aarshaveda"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-4 tracking-tight leading-tight">
          Get in Touch with <br className="hidden md:block" /> Aarshaveda
        </h1>
        <p className="max-w-2xl text-sm md:text-base text-white/90 font-medium leading-relaxed tracking-wide">
          Whether you need product information, order support, or general
          assistance, our team is here to help.
        </p>
      </div>
    </div>
  );
}
