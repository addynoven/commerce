import Image from "next/image";

const milestones = [
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
    year: "2018–2020",
    bullets: [
      "Expanded consulting and product development.",
      "Supported brands like Eastern Condiments, Haeal Pharma, Iron Kettle, Harrisons Malayalam (RPG), Vedic Tiger.",
    ],
  },
  {
    year: "2021",
    bullets: [
      "Entered Australia, UK, Malaysia.",
    ],
  },
  {
    year: "2022",
    bullets: [
      "White-label manufacturing for 4 global wellness brands.",
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
];

export function JourneyTimeline() {
  return (
    <section className="py-24 bg-[#FAF7F2] overflow-hidden px-4">
      <div className="main-container !pb-0 mb-16">
        <h4 className="text-3xl md:text-5xl font-serif font-bold text-center text-neutral-900">
          Our Journey in Milestones
        </h4>
      </div>

      <div className="relative md:overflow-x-auto hide-scrollbar pb-12 md:cursor-grab md:active:cursor-grabbing">
        {/* Mobile vertical rail */}
        <div className="md:hidden absolute left-[22px] top-6 bottom-6 w-[2px] bg-[#606E4C]/30 rounded-full" />
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:px-8 md:min-w-max relative z-10">
          {milestones.map((m, idx, arr) => (
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
  );
}
