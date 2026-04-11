"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-[#FAF7F2] p-6 rounded-full border border-[#E9E1D5] mb-8">
        <svg
          className="w-12 h-12 text-[#A65B4A]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-4 text-center">
        Oops! Something went wrong
      </h1>
      <p className="text-neutral-500 max-w-md text-center mb-10 text-sm md:text-base leading-relaxed tracking-wide">
        An unexpected error occurred while trying to load this page. Please
        try again.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={reset}
          className="flex items-center justify-center border border-neutral-300 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-800 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 rounded-[5px]"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="flex items-center justify-center border border-transparent bg-[#6B8E67] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-[#5A7A56] transition-all duration-300 rounded-[5px] shadow-sm hover:shadow-md"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
