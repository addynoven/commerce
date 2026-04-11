import Link from "next/link";
import Footer from "components/layout/footer";

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-4">
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-neutral-900 mb-6">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-800 mb-4 text-center">
          Page Not Found
        </h2>
        <p className="text-neutral-500 max-w-md text-center mb-10 text-sm md:text-base leading-relaxed tracking-wide">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center border border-neutral-300 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 rounded-[5px]"
          >
            Go to Home
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center border border-transparent bg-[#6B8E67] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#5A7A56] transition-all duration-300 rounded-[5px] shadow-sm hover:shadow-md"
          >
            Shop Products
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
