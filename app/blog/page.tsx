import BlogBanner from "components/layout/blog/blog-banner";
import { BlogPost } from "components/layout/blog/blog-card";
import BlogList from "components/layout/blog/blog-list";
import FAQAccordion from "components/layout/contact/faq-accordion";
import Footer from "components/layout/footer";
import { getAllArticles } from "lib/shopify";

export const metadata = {
  title: "Wellness Insights | Aarshaveda Blog",
  description:
    "Explore the wisdom of Ayurveda through our Wellness Insights blog.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function estimateReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default async function BlogPage() {
  const articles = await getAllArticles();

  // Map Shopify articles to BlogPost format
  const posts: BlogPost[] = articles.map((article) => ({
    title: article.title,
    excerpt: article.excerpt || "",
    author: article.authorV2?.name || "Aarshaveda",
    date: formatDate(article.publishedAt),
    readTime: estimateReadTime(article.contentHtml || ""),
    image: article.image?.url || "/blog_banner.png",
    slug: article.handle,
    publishedAt: article.publishedAt,
    category: article.blog?.title,
  }));

  return (
    <div className="bg-white">
      <BlogBanner />

      <div className="main-container py-8">
        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-8">
          Home / <span className="text-neutral-900">Blog</span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
              No articles yet
            </h2>
            <p className="text-sm text-neutral-600">
              Check back soon for wellness insights and Ayurvedic wisdom.
            </p>
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-[#FAF7F2] py-24 mt-24">
        <div className="main-container">
          <FAQAccordion />
        </div>
      </div>

      <Footer />
    </div>
  );
}
