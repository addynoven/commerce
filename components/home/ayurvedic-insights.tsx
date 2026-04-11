import { getAllArticles } from "lib/shopify";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function estimateReadTime(html: string): string {
  if (!html) return "5 min read";
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export async function AyurvedicInsights() {
  const articles = await getAllArticles();

  if (!articles?.length) return null;

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="main-container">
        <h2 className="text-[24px] md:text-4xl font-serif font-bold text-center mb-4 md:mb-6 text-neutral-900">
          Ayurvedic Insights
        </h2>

        {/* Carousel Container */}
        <div className="relative group px-4 md:px-0">
          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-8 pb-4 hide-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
            {articles.slice(0, 3).map((article, idx) => (
              <div
                key={article.handle}
                className="flex flex-col group/insight min-w-[240px] sm:min-w-[280px] md:min-w-0 snap-start p-3 md:p-4 rounded-xl border border-transparent hover:bg-brand-cream hover:border-brand-sage/20 transition-all duration-300"
              >
                {/* Image */}
                <Link
                  href={`/blog/${article.handle}`}
                  className="relative aspect-[3/2] overflow-hidden rounded-sm mb-6"
                >
                  <Image
                    src={article.image?.url || "/blog_banner.png"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/insight:scale-105"
                  />
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 mb-3">
                    <span>{article.authorV2?.name || "Aarshaveda"}</span>
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <span>{estimateReadTime(article.contentHtml || "")}</span>
                  </div>

                  <Link href={`/blog/${article.handle}`} className="mb-4">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-neutral-900 line-clamp-2 group-hover/insight:text-brand-green transition-colors">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt ||
                      article.contentHtml
                        ?.replace(/<[^>]*>/g, "")
                        .slice(0, 150) + "..."}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={`/blog/${article.handle}`}
                      className="inline-block border border-neutral-300 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Arrows (decorative) */}
          <button className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-6 md:-left-16 lg:-left-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-300 items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-brand-green transition-colors bg-white shadow-sm z-10">
            <ArrowLeft />
          </button>
          <button className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-6 md:-right-16 lg:-right-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-300 items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-brand-green transition-colors bg-white shadow-sm z-10">
            <ArrowRight />
          </button>
        </div>

        {/* View All Blogs CTA */}
        <div className="flex justify-center pt-8">
          <Link
            href="/blog"
            className="border border-neutral-300 px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
