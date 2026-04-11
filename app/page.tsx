import { AyurvedaBanner } from "components/home/ayurveda-banner";
import { AyurvedicExperts } from "components/home/ayurvedic-experts";
import { AyurvedicInsights } from "components/home/ayurvedic-insights";
import { BestSellers } from "components/home/best-sellers";
import { Categories } from "components/home/categories";
import { Certifications } from "components/home/certifications";
import { Hero } from "components/home/hero";
import { RealLifeProducts } from "components/home/real-life-products";
import { RetreatBanner } from "components/home/retreat-banner";
import { ShopByBrand } from "components/home/shop-by-brand";
import { ShopByConcern } from "components/home/shop-by-concern";
import { Testimonials } from "components/home/testimonials";
import { WhyAarshaveda } from "components/home/why-aarshaveda";
import Footer from "components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Aarshaveda | Ayurvedic Wellness Products",
  description:
    "Discover premium Ayurvedic products rooted in 100+ years of heritage. Shop natural wellness, skincare, haircare, and more.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <div className="flex flex-col gap-12 md:gap-[120px] bg-white">
      <Hero />
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
      <Suspense fallback={null}>
        <BestSellers />
      </Suspense>
      <AyurvedaBanner />
      <ShopByConcern />
      <Certifications />
      <WhyAarshaveda />
      <Suspense fallback={null}>
        <ShopByBrand />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <RealLifeProducts />
      </Suspense>
      <RetreatBanner />
      <Suspense fallback={null}>
        <AyurvedicExperts />
      </Suspense>
      <Suspense fallback={null}>
        <AyurvedicInsights />
      </Suspense>
      <Footer />
    </div>
  );
}
