import { JourneyTimeline } from "components/about/journey-timeline";
import { AyurvedicExperts as ExpertsSection } from "components/home/ayurvedic-experts";
import { RetreatBanner } from "components/home/retreat-banner";
import Footer from "components/layout/footer";
import Image from "next/image";

export const metadata = {
  title: "About Us | Aarshaveda",
  description:
    "Discover the journey, heritage, and meaning behind Aarshaveda's commitment to Ayurvedic excellence.",
};

export default function AboutPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/about/About-Hero-Banner.webp"
          alt="Our Journey Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-6 drop-shadow-lg">
            Our Journey with Ayurveda
          </h1>
          <p className="text-sm md:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed opacity-90 tracking-wide">
            Inspired by ancient wisdom and shaped for modern needs, Aarshaveda
            is designed to support balance, clarity, and long-term wellbeing.
          </p>
        </div>
      </section>

      {/* 2. Demystifying Ayurveda Quote */}
      <section className="bg-[#FAF7F2] py-24 relative overflow-hidden">
        {/* Decorative Watermarks */}
        <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Image
            src="/about/logo.svg"
            alt=""
            width={400}
            height={400}
            className="grayscale"
          />
        </div>
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Image
            src="/about/logo.svg"
            alt=""
            width={400}
            height={400}
            className="grayscale"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center color-[#95473C] mb-8">
            <Image src="/about/logo_red.svg" alt="" width={80} height={80} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10">
            Demystifying Ayurveda
          </h2>
          <div className="relative">
            <p className="text-lg md:text-2xl italic text-neutral-700 leading-relaxed max-w-3xl mx-auto">
              "We cannot change the world we live in and take it back to
              earlier, less stressful times, when peace was the rule and not the
              exception. Since this is reality, it is clearly time to adopt a
              lifestyle which permits us to survive and find Health and Peace.
              This lifestyle is the Ayurveda Way of Life"
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Origin & The Meaning - Split Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* The Origin — image left, text right on desktop; image above text on mobile */}
        <div className="relative min-h-[400px] order-1 md:order-1">
          <Image
            src="/about/About-The Origin.webp"
            alt="The Origin"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#3D4838] p-12 lg:p-24 flex flex-col justify-center text-white min-h-[500px] order-2 md:order-2">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-8">
            The Origin
          </h2>
          <p className="text-base lg:text-lg leading-relaxed opacity-90 font-light">
            From time immemorial, the pursuit of health and freedom from disease
            has been central to human life. Ancient sages gathered to reflect on
            wellbeing, life, and harmony, sharing their insights through the
            Guru-Shishya Parampara—the sacred lineage of teacher and student.
            Over centuries, this oral wisdom was carefully preserved and passed
            down across generations.
          </p>
        </div>

        {/* The Meaning — image above text on mobile; text left, image right on desktop */}
        <div className="relative min-h-[400px] order-3 md:order-4">
          <Image
            src="/about/About-The Meaning.webp"
            alt="The Meaning"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#3D4838] p-12 lg:p-24 flex flex-col justify-center text-white min-h-[500px] order-4 md:order-3">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-8">
            The Meaning
          </h2>
          <p className="text-base lg:text-lg leading-relaxed opacity-90 font-light">
            Aarshaveda is derived from two words—Aarsha, meaning knowledge
            originating from the ancient sages of India, and Veda, meaning
            knowledge or science. This wisdom was eventually documented as the
            Vedas, with medical knowledge rooted in the Atharva Veda. Ayurveda
            emerged from this tradition and is regarded as its Upaveda—the
            applied science of balanced living.
          </p>
        </div>
      </section>

      {/* 4. Our Heritage of Ayurvedic Excellence */}
      <section className="py-24 px-4 bg-white">
        <div className="main-container text-center !pb-0">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-16">
            Our Heritage of Ayurvedic <br className="hidden md:block" />{" "}
            Excellence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Profile 1 */}
            <div className="bg-[#F2F5F1] md:bg-[#FAF7F2] p-3 md:p-12 flex flex-row md:flex-row items-center gap-3 md:gap-8 rounded">
              <div className="relative w-28 h-40 md:w-48 md:h-64 flex-none">
                <div className="hidden md:block absolute inset-0 bg-white rounded-full md:translate-y-4 md:scale-[1.02] border border-neutral-100" />
                <Image
                  src="/about/Kollasseril-Govindan.svg"
                  alt="Kunju Panicker"
                  fill
                  className="object-cover md:rounded-full md:border-4 md:border-white md:shadow-xl grayscale"
                  style={{ objectPosition: "20% 10%" }}
                />
              </div>
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="inline-block bg-[#E1E6DD] text-[#809671] px-2 py-1 text-sm font-semibold rounded mb-1 md:mb-4 md:text-xs md:font-bold md:bg-[#D3E1D4] md:text-[#3D4838]">
                  1914 to 1973
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-medium md:font-bold text-neutral-900">
                  Kunju Panicker
                </h3>
                <p className="text-[#95473C] md:text-[#A65B4A] font-sans md:font-serif md:italic text-base md:text-sm">
                  Ayurveda Acharya Vaidyan
                </p>
                <p className="text-neutral-900 md:text-neutral-500 font-serif italic text-base md:text-xs">
                  Kollasseril Govindan
                </p>
              </div>
            </div>

            {/* Profile 2 */}
            <div className="bg-[#F2F5F1] md:bg-[#FAF7F2] p-3 md:p-12 flex flex-row md:flex-row items-center gap-3 md:gap-8 rounded">
              <div className="relative w-28 h-40 md:w-48 md:h-64 flex-none">
                <div className="hidden md:block absolute inset-0 bg-white rounded-full md:translate-y-4 md:scale-[1.02] border border-neutral-100" />
                <Image
                  src="/about/Vallomparambath-Panickassery.svg"
                  alt="Govindan Vaidyar"
                  fill
                  className="object-cover md:rounded-full md:border-4 md:border-white md:shadow-xl grayscale"
                  style={{ objectPosition: "75% 10%" }}
                />
              </div>
              <div className="flex flex-col items-start gap-1 text-left">
                <span className="inline-block bg-[#E1E6DD] text-[#809671] px-2 py-1 text-sm font-semibold rounded mb-1 md:mb-4 md:text-xs md:font-bold md:bg-[#D3E1D4] md:text-[#3D4838]">
                  1918 to 1990
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-medium md:font-bold text-neutral-900">
                  Govindan Vaidyar
                </h3>
                <p className="text-[#95473C] md:text-[#A65B4A] font-sans md:font-serif md:italic text-base md:text-sm">
                  Ayurveda Acharya Vaidyan
                </p>
                <p className="text-neutral-900 md:text-neutral-500 font-serif italic text-base md:text-xs">
                  Vallomparambath Panickassery
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 text-neutral-900 md:text-neutral-600 leading-relaxed font-normal md:font-medium text-center">
            <p>
              Aarshaveda is built on a distinguished heritage of Ayurvedic
              excellence passed down through generations. The foundation was
              laid by Ayurveda Acharya Vaidyan KGK Panicker, a respected pioneer
              who established Kerala Ayurveda in 1945 with a mission to preserve
              and promote the richness of Ayurvedic tradition through quality
              products and services.
            </p>
            <p>
              This legacy was further strengthened by Acharya Vaidyan Govindan
              Vaidyar, a renowned physician trained under eminent scholars and
              deeply rooted in classical Ayurvedic practice. Together, their
              contributions shaped a tradition defined by discipline, integrity,
              and scholarship.
            </p>
            <p>
              Today, Aarshaveda Wellness proudly carries this heritage forward
              under the leadership of Mr. Venkatesh Anilkumar, continuing over
              eight decades of Ayurvedic wisdom with a commitment to
              authenticity, quality, and global wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Symbol of Healing (Existing) */}
      <section className="bg-[#FAF7F2] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="p-12 lg:p-24 space-y-8 order-2 md:order-1">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-neutral-900 leading-tight">
              The Symbol of <br /> Ayurvedic Healing
            </h2>
            <div className="space-y-6 text-neutral-700 leading-relaxed font-medium">
              <p>
                This 14th-century bronze depiction of Lord Dhanvantari, crafted
                during the Vijayanagara era using the Lost Wax (Cire-Perdue)
                technique, symbolises the divine origin of Ayurveda. As
                described in the Bhagavatha Purana, Dhanvantari emerged during
                the churning of the ocean, representing the birth of healing
                knowledge.
              </p>
              <p>
                Ayurveda is the Science of Harmony—the balance of mind, body,
                and spirit. When this balance is disturbed, discomfort arises;
                restoring it is the essence of Ayurvedic living and the path to
                lasting health and peace.
              </p>
            </div>
          </div>
          <div className="relative min-h-[400px] md:min-h-[600px] order-1 md:order-2">
            <Image
              src="/about/About-Symbol of Healing-Background.webp"
              alt="Lord Dhanvantari Bronze Statue"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 10. Transformation Quote Banner (Existing) */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/about/About-We Transform-Background.webp"
          alt="Green Leaves Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="flex justify-center mb-6">
            <Image
              src="/about/logo.svg"
              alt="Green Leaves Background"
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="relative">
            <span className="absolute -left-8 -top-8 text-6xl md:text-8xl text-white/20 font-serif leading-none h-[50px] overflow-visible">
              “
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
              We transform Ayurvedic heritage into actionable modern healthcare
              through intelligence, innovation, and integrity.
            </h2>
            <span className="absolute -right-8 -bottom-8 text-6xl md:text-8xl text-white/20 font-serif leading-none h-[50px] overflow-visible translate-y-4">
              ”
            </span>
          </div>
        </div>
      </section>

      {/* 10.1 Prescribed in Ancient Texts */}
      <section className="bg-[#F9F4EE] pt-7 pb-8 px-5 md:py-24 md:px-4 relative overflow-hidden isolate">
        {/* Decorative Watermarks - Logo Symbol */}
        <div className="absolute left-[-160px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none w-[320px] h-[320px] md:left-[-5%] md:w-[400px] md:h-[400px] md:opacity-[0.05]">
          <Image
            src="/about/logo.svg"
            alt=""
            fill
            className="grayscale object-contain"
          />
        </div>
        <div className="absolute right-[-160px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none w-[320px] h-[320px] md:right-[-5%] md:w-[400px] md:h-[400px] md:opacity-[0.05]">
          <Image
            src="/about/logo.svg"
            alt=""
            fill
            className="grayscale object-contain"
          />
        </div>

        <div className="main-container relative z-10 text-center flex flex-col items-center gap-4 !pb-0">
          <h2 className="font-serif font-medium md:font-bold text-2xl md:text-5xl leading-[1.2] text-black md:text-neutral-900 max-w-4xl mx-auto">
            We Prepare Products as Prescribed in Ancient Texts
          </h2>
          <p className="text-base md:text-base text-[#1F1F1F] md:text-neutral-700 leading-[1.5] md:leading-relaxed max-w-3xl mx-auto font-normal md:font-medium">
            Our traditional Ayurvedic formulations are crafted strictly in
            accordance with classical Ayurvedic texts, following methods passed
            down through generations. Using traditional brass, stone, and copper
            vessels—including time-honoured Urulis cast through the lost- wax
            technique—our oils are prepared to ensure even heating and
            preservation of natural colour and potency. Each formulation
            undergoes Thailamoorchanam, a classical purification process that
            enhances efficacy, stability, and absorption, staying true to the
            principles outlined by the ancient sages.
          </p>
        </div>
      </section>

      {/* 6. Formulations Split */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Classical */}
        <div className="relative min-h-[300px] md:min-h-[400px] order-1 md:order-2">
          <Image
            src="/about/About-Classic%20Products.webp"
            alt="Classical Formulations"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#3D4838] p-8 md:p-12 lg:p-24 flex flex-col justify-center text-white min-h-[400px] md:min-h-[500px] order-2 md:order-1">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
            Classical Ayurvedic <br /> Formulations
          </h2>
          <p className="text-base lg:text-lg leading-relaxed opacity-90 font-light mb-8 max-w-lg">
            Over 200 time-tested formulations prepared strictly according to the
            ancient texts of Ayurveda.
          </p>
          <button className="w-full md:w-fit border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#3D4838] transition-colors">
            SEE PRODUCTS
          </button>
        </div>

        {/* Modern */}
        <div className="relative min-h-[300px] md:min-h-[400px] order-3">
          <Image
            src="/about/About-Modern%20Products.webp"
            alt="Modern Formulations"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-[#3D4838] p-8 md:p-12 lg:p-24 flex flex-col justify-center text-white min-h-[400px] md:min-h-[500px] order-4">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6 italic">
            Modern, Yet Purely <br /> Ayurvedic
          </h2>
          <p className="text-base lg:text-lg leading-relaxed text-white font-medium mb-8 max-w-lg">
            Innovative Ayurvedic products designed for today's lifestyles—easy
            to use, effective, and rooted in traditional principles.
          </p>
          <button className="w-full md:w-fit border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#3D4838] transition-colors">
            SEE PRODUCTS
          </button>
        </div>
      </section>

      {/* 7. Mom & Baby Banner */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/about/About-Dasapushpam-Background.webp"
          alt="Mom and Baby Care"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center px-4 max-w-4xl text-white">
          <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.2em] mb-4">
            PROTECT | NOURISH | DELIGHT
          </p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">
            Dasapushpam — Care for <br /> Mom & Baby
          </h2>
          <p className="text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            A soothing Ayurvedic formula enriched with ten sacred flowers and
            nourishing botanicals for baby and mother's delicate skin.
          </p>
          <button className="w-full md:w-fit bg-white text-neutral-900 px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors rounded-sm shadow-sm hover:shadow-md">
            EXPLORE PRODUCTS
          </button>
        </div>
      </section>

      {/* 8. B2B Solutions */}
      <section className="py-24 bg-white px-4">
        <div className="main-container text-center mb-16 !pb-0">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
            B2B Solutions for Wellness Brands
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto font-medium">
            End-to-end support for product development, sourcing, compliance,
            and production to help your brand scale with credibility and
            consistency.
          </p>
        </div>

        <div className="main-container grid grid-cols-1 md:grid-cols-3 gap-8 !pb-0">
          {[
            {
              title: "White Labelling for Ayurvedic Products",
              img: "/about/About-White Labeling-Background.webp",
            },
            {
              title: "R&D and New Product Development",
              img: "/about/About-R&D-NDP-Background.webp",
            },
            {
              title: "Wellness Living Spaces",
              img: "/about/About-Wellness Spaces-Background.webp",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative group h-[500px] overflow-hidden rounded-sm"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 via-30% to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <h3 className="text-2xl font-serif font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h3>
                <button className="w-full md:w-fit text-white text-[10px] font-bold uppercase tracking-widest border border-white/30 px-6 py-3 md:py-2 hover:bg-black hover:text-white transition-all">
                  KNOW MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Certifications */}
      <section className="py-24 bg-[#FAF7F2] px-4">
        <div className="main-container text-center mb-16 !pb-0">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
            Certified for Quality and Integrity
          </h2>
          <p className="text-neutral-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Our products are manufactured and handled in facilities that meet
            recognised quality, safety, and regulatory standards—ensuring
            consistency, transparency, and trust.
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {[
            "fssai",
            "ministryofayush",
            "euorganic",
            "iso",
            "fda",
            "indiaorganic",
            "usdaorganic",
            "healthcanada",
            "gmpquality",
          ].map((cert) => (
            <div key={cert} className="relative h-12 w-24 md:h-16 md:w-32">
              <Image
                src={`/certified/${cert === "fda" ? "FDARegistered" : cert === "fssai" ? "FSSAI" : cert === "ministryofayush" ? "MinistryOfAyush" : cert === "euorganic" ? "EUOrganic" : cert === "iso" ? "ISO" : cert === "indiaorganic" ? "IndiaOrganic" : cert === "usdaorganic" ? "USDAOrganic" : cert === "healthcanada" ? "HealthCanada" : "GMPQuality"}.webp`}
                alt={cert}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 11. Meet the Founding Family */}
      <section className="bg-[#3A4433] overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[480px] md:h-[640px]">
          {/* Image — left half, full bleed */}
          <div className="relative w-full md:w-1/2 h-[360px] md:h-full flex-shrink-0">
            <Image
              src="/about/About-Founding Family.webp"
              alt="The Founding Family"
              fill
              className="object-cover"
            />
          </div>

          {/* Text — right half */}
          <div className="flex-1 flex items-center bg-[#3A4433] px-8 py-12 md:p-[100px]">
            <div className="flex flex-col gap-7 max-w-[520px]">
              <h2 className="font-serif font-semibold text-[32px] md:text-[40px] leading-[120%] text-[#FCFBF8]">
                Meet the Founding Family
              </h2>
              <p className="font-serif font-semibold text-[16px] md:text-[18px] leading-[150%] tracking-[0.02em] text-[#FCFBF8]">
                <span className="font-bold">Venkatesh Anilkumar:</span> Finance
                graduate turned Ayurveda entrepreneur. Son of two worlds:
                commerce and care. Builder of a brand that heals without
                compromise.
              </p>
              <p className="font-serif font-semibold text-[16px] md:text-[18px] leading-[150%] text-[#FCFBF8]">
                <span className="font-bold">Parvathy Mohan:</span> MBA in
                Finance and Marketing. Former corporate risk and compliance
                strategist. Now the heart of Aarshaveda&apos;s culture, systems,
                and soul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Our Journey in Milestones */}
      <section className="py-24 bg-[#FAF7F2] overflow-hidden px-4">
        <div className="main-container !pb-0 mb-16">
          <h4 className="text-3xl md:text-5xl font-serif font-bold text-center text-neutral-900">
            Our Family Milestones
          </h4>
        </div>

        <div className="relative md:overflow-x-auto hide-scrollbar pb-12 md:cursor-grab md:active:cursor-grabbing">
          {/* Mobile vertical rail */}
          <div className="md:hidden absolute left-[22px] top-6 bottom-6 w-[2px] bg-[#606E4C]/30 rounded-full" />
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:px-8 md:min-w-[2400px] relative z-10">
            {[
              {
                year: "2015",
                bullets: [
                  "Began exports and private labelling of products; launched Chyavanprash.",
                  "Got Ayush Manufacturing Licence (Karnataka), Import Export Licence, USDA & India Organic certifications.",
                ],
              },
              {
                year: "2016",
                bullets: [
                  "Aarshaveda is officially registered.",
                  "Launched Dasapushpam Baby Oil.",
                  "Received 14 proprietary licences from Telangana Ayush board.",
                ],
              },
              {
                year: "2017",
                bullets: [
                  "Baby Oil became #1 bestseller on Amazon India.",
                  "Selected as an Amazon Success Story Brand.",
                ],
              },
              {
                year: "2018–2022",
                bullets: [
                  "Expanded consultancies, R&D, and product development",
                  "Supported brands in UK, UAE, USA",
                  "Condiments, Herbs and White Labelling for Harrisons Malayalam.",
                ],
              },
              {
                year: "2023",
                bullets: [
                  "Opened The Sacred Lotus, an Ayurveda boutique hospital in Fort Kochi.",
                ],
              },
              {
                year: "2024",
                bullets: [
                  "300+ products, exports to 10+ countries.",
                  "Presence in wellness resorts & retail.",
                  "Hospitality centres across Fort Kochi & Bangalore.",
                  "Consulting, Product Development & White Labelling.",
                ],
              },
              {
                year: "2025",
                bullets: [
                  "Opened a Treatment Centre in Bangalore.",
                  "Official partnerships with Four Seasons Resort Seychelles to supply ayurveda products.",
                  "Started exporting Chyavanprash to UK.",
                ],
              },
            ].map((m, idx, arr) => (
              <div key={idx} className="flex-none w-full md:w-[320px] md:pt-4 relative pl-12 md:pl-0">
                {/* Desktop horizontal line */}
                {idx < arr.length - 1 && (
                  <div className="hidden md:block absolute top-[32px] left-1/2 w-[calc(100%+32px)] h-[1px] bg-[#606E4C]/40 z-0" />
                )}

                {/* Mobile dot — sits on the rail */}
                <div className="md:hidden absolute left-[13px] top-6 w-5 h-5 rounded-full border-2 border-[#606E4C] bg-[#FAF7F2] flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-[#606E4C]" />
                </div>

                {/* Desktop dot */}
                <div className="hidden md:flex justify-center mb-8 relative z-10">
                  <div className="w-8 h-8 rounded-full border-2 border-[#606E4C] bg-[#FAF7F2] flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#606E4C]" />
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white p-6 md:p-8 rounded-lg md:rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 md:min-h-[220px]">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#606E4C] mb-4 md:mb-6">
                    {m.year}
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {m.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex gap-3 text-sm text-neutral-700 font-medium leading-relaxed"
                      >
                        <span className="flex-none mt-1.5 w-1.5 h-1.5 bg-[#606E4C] rounded-full" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Building Aarshaveda Together */}
      <section className="grid grid-cols-1 md:grid-cols-2 bg-white">
        <div className="bg-[#3D4838] p-12 lg:p-24 flex flex-col justify-center text-white min-h-[600px]">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-8">
            Building Aarshaveda, Together
          </h2>
          <div className="space-y-6 text-sm lg:text-base leading-relaxed opacity-90 font-light">
            <p className="text-white">
              While I immersed myself in the roots of our tradition, Parvathy,
              my wife, held the fort financially. She returned to her audit job
              so I could pursue this dream. Not once did she ask for
              recognition.
            </p>
            <p className="text-white">
              Years later in 2024, she joined Aarshaveda full-time and built its
              backbone—from SOPs to people practices, from inventory systems to
              culture, she transformed a passion project into a brand for the
              long haul.
            </p>
            <blockquote className="bg-white/10 p-8 border-l-4 border-white italic text-lg mt-8 inline-block max-w-lg">
              We both made a promise: We would expand, but never at the expense
              of our values.
            </blockquote>
          </div>
        </div>
        <div className="relative min-h-[600px]">
          <Image
            src="/about/About-Building Aarshaveda.webp"
            alt="The family bond"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20 text-center px-8">
            <div className="relative w-48 h-32 mb-4">
              <Image
                src="/logo/White.webp"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white font-serif italic text-2xl lg:text-4xl leading-tight">
              Over 100 Years of <br /> Ayurveda Heritage
            </p>
          </div>
        </div>
      </section>

      <JourneyTimeline />

      {/* 14. Retreat Banner */}
      <RetreatBanner />

      {/* 15. Ayurvedic Experts Section */}
      <ExpertsSection />

      <Footer />
    </div>
  );
}
