import Image from "next/image";
import Link from "next/link";

export type CategoryItem = {
  title: string;
  image: string;
  path: string;
};

export default function CategoryCard({ category }: { category: CategoryItem }) {
  return (
    <Link
      href={category.path}
      className="group relative aspect-square overflow-hidden block"
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-6 tracking-tight">
          {category.title}
        </h2>
        <div className="border border-white/40 px-8 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm group-hover:bg-white group-hover:text-neutral-900 transition-all duration-300">
          VIEW PRODUCTS
        </div>
      </div>
    </Link>
  );
}
