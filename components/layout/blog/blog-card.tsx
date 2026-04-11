import Image from "next/image";
import Link from "next/link";

export type BlogPost = {
  title: string;
  excerpt: string;
  author: string;
  date?: string;
  readTime?: string;
  image: string;
  slug: string;
  publishedAt?: string;
};

export default function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white overflow-hidden mb-16">
        <div className="relative aspect-[16/9] lg:aspect-square overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-4 lg:p-0">
          <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-4">
            <span>{post.author}</span>
            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
            <span>{post.readTime || post.date}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-neutral-900 mb-6 leading-tight">
            {post.title}
          </h2>
          <p className="text-sm text-neutral-600 font-medium leading-relaxed mb-8 line-clamp-3">
            {post.excerpt}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-block border border-neutral-300 px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
          >
            READ MORE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col group">
      <div className="relative aspect-[3/2] overflow-hidden mb-6 bg-neutral-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-400 mb-3">
        <span>{post.author}</span>
        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
        <span>{post.readTime || post.date}</span>
      </div>
      <h3 className="text-xl font-serif font-bold text-neutral-900 mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-green transition-colors">
        {post.title}
      </h3>
      <p className="text-xs text-neutral-600 font-medium leading-relaxed mb-6 line-clamp-2">
        {post.excerpt}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="inline-block border border-neutral-300 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-neutral-800 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all self-start"
      >
        READ MORE
      </Link>
    </div>
  );
}
