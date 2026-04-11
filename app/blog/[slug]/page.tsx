import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { BlogPost } from "components/layout/blog/blog-card";
import RelatedArticles from "components/layout/blog/related-articles";
import Footer from "components/layout/footer";
import ShareButtons from "components/blog/share-buttons";
import { getAllArticles, getBlogArticle } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try to fetch the article from the default "news" blog
  const article = await getBlogArticle("news", slug);

  if (!article) {
    notFound();
  }

  // Get all articles for related posts
  const allArticles = await getAllArticles();
  const relatedPosts: BlogPost[] = allArticles
    .filter((a) => a.handle !== slug)
    .slice(0, 3)
    .map((a) => ({
      title: a.title,
      excerpt: a.excerpt || "",
      author: a.authorV2?.name || "Aarshaveda",
      date: formatDate(a.publishedAt),
      readTime: estimateReadTime(a.contentHtml || ""),
      image: a.image?.url || "/blog_banner.png",
      slug: a.handle,
    }));

  const postImage = article.image?.url || "/blog_banner.png";

  return (
    <div className="bg-white">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <nav className="text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-8">
          Home / Blog /{" "}
          <span className="text-neutral-900">{article.title}</span>
        </nav>

        <div className="flex justify-between items-center py-6 border-y border-neutral-100 mb-12">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-800 hover:text-brand-green transition-colors"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-neutral-900 mb-8 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-8">
              <span>{article.authorV2?.name || "Aarshaveda"}</span>
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              <span>{estimateReadTime(article.contentHtml || "")}</span>
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-800">
                Share this post
              </span>
              <ShareButtons title={article.title} />
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src={postImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-100 max-w-5xl mx-auto mb-16" />

      {/* Article Content — rendered from Shopify contentHtml */}
      <article className="max-w-3xl mx-auto px-4 mb-24">
        <div
          className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:font-semibold prose-p:text-base prose-p:text-neutral-700 prose-p:leading-relaxed prose-img:rounded-sm prose-blockquote:border-l-4 prose-blockquote:border-brand-peach prose-blockquote:pl-12 prose-blockquote:italic prose-blockquote:font-serif"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        <div className="mt-16 pt-8 border-t border-neutral-100 flex flex-col gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-800">
            Share this post
          </span>
          <ShareButtons title={article.title} />
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && <RelatedArticles posts={relatedPosts} />}

      <Footer />
    </div>
  );
}
