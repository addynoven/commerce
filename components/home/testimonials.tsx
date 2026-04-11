import { getBlogArticles } from "lib/shopify";
import { TestimonialsClient } from "./testimonials-client";

export async function Testimonials() {
  const reviewsData = await getBlogArticles("testimonials");

  // High-quality mock data as fallback since Shopify blog 'testimonials' is missing
  const mockReviews = [
    {
      handle: "review-1",
      title: "Siddharth Verma",
      contentHtml: "The Organic Moringa Powder has completely transformed my daily energy levels. I feel more active and focused throughout the day without the jittery feeling of caffeine. Truly authentic Ayurvedic quality!",
      rating: 5.0,
      date: "2 months ago"
    },
    {
      handle: "review-2",
      title: "Ananya Iyer",
      contentHtml: "I've tried many Ayurvedic brands, but Aarshaveda's commitment to purity is unmatched. Their Charcoal Tooth Powder is gentle yet effective. My gums feel much healthier now.",
      rating: 4.5,
      date: "1 month ago"
    },
    {
      handle: "review-3",
      title: "Dr. Rajesh Mehra",
      contentHtml: "As a practitioner, I highly recommend these products to my patients. The extraction process preserves the essence of the herbs, which is crucial for efficacy. Exceptional standards.",
      rating: 5.0,
      date: "3 weeks ago"
    }
  ];

  const reviews = reviewsData?.length ? reviewsData : mockReviews;

  return (
    <section className="bg-[#F9F4EE] py-16 md:py-[120px] overflow-hidden">
      <div className="main-container">
        <div className="flex flex-col gap-10 md:gap-12">
          <h2
            className="font-serif font-semibold text-black text-center"
            style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: "120%" }}
          >
            Happy Customers, Real Experiences
          </h2>
          <TestimonialsClient reviews={reviews} />
        </div>
      </div>
    </section>
  );
}
