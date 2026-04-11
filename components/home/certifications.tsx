import Image from "next/image";

export function Certifications() {
  const logos = [
    { file: "CertifiedLogos_FDA Registered 1.webp", alt: "FDA Registered" },
    { file: "CertifiedLogos_Ministry Of Ayush 2.webp", alt: "Ministry of Ayush" },
    { file: "CertifiedLogos_GMP 2.webp", alt: "GMP Certified" },
    { file: "CertifiedLogos_Health Canada 2.webp", alt: "Health Canada" },
    { file: "CertifiedLogos_India Organic 2.webp", alt: "India Organic" },
    { file: "CertifiedLogos_ISO_9001-2015 1.webp", alt: "ISO 9001:2015" },
  ];

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="main-container !pb-0 flex flex-col items-center gap-20">
        {/* Heading block — max-width 640px, gap 20px */}
        <div className="flex flex-col items-center gap-5 w-full max-w-[640px]">
          <h2 className="font-serif font-semibold text-[32px] md:text-[40px] leading-[120%] text-center text-[#000000]">
            Certified for Quality and Integrity
          </h2>
          <p className="font-sans font-normal text-[16px] md:text-[18px] leading-[140%] text-center text-[#000000] max-w-[560px]">
            Our products are manufactured and handled in facilities that meet
            recognised quality, safety, and regulatory standards—ensuring
            consistency, transparency, and trust.
          </p>
        </div>

        {/* Badge marquee — full-width, 160×160px logos, gap 56px */}
        <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
          <div className="flex animate-marquee items-center gap-14 flex-nowrap min-w-max">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={`${logo.file}-${idx}`}
                className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] flex-none"
              >
                <Image
                  src={`/certifiedbadge/${logo.file}`}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
