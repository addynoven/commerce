import Link from "next/link";
import BlogCard, { BlogPost } from "./blog-card";

export default function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="py-24 border-t border-neutral-200">
      <div className="main-container">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 text-center mb-16 underline decoration-brand-peach/30 underline-offset-8">
          Other Related Articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {posts.map((post, idx) => (
            <BlogCard key={idx} post={post} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="border border-neutral-300 px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
          >
            VIEW ALL BLOGS
          </Link>
        </div>
      </div>
    </div>
  );
}
