"use client";

import { useMemo, useState } from "react";
import BlogCard, { BlogPost } from "./blog-card";

const ALL = "All Articles";

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) if (p.category) set.add(p.category);
    return [ALL, ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState<string>(ALL);

  const filtered = useMemo(
    () => (active === ALL ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Category pills */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap mb-10 md:mb-12">
        {categories.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`flex-none whitespace-nowrap rounded-full border px-5 py-2 text-sm font-sans font-medium transition-colors ${
                isActive
                  ? "border-[#C9A7A1] bg-[#F5E8E5] text-[#95473C]"
                  : "border-neutral-300 text-neutral-800 hover:border-neutral-400"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-sm text-neutral-600">No articles in this category yet.</p>
        </div>
      ) : (
        <>
          {featured && <BlogCard post={featured} featured />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
