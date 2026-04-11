"use client";

import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Product } from "lib/shopify/types";
import { useState, useActionState } from "react";
import { submitReview } from "./review-form-action";

function parseReviews(jsonValue: string | undefined) {
  if (!jsonValue) return null;
  try {
    const parsed = JSON.parse(jsonValue);
    return Array.isArray(parsed) ? parsed : null;
  } catch (e) {
    return null;
  }
}

export function ReviewSection({ product, localReviews = [] }: { product: Product, localReviews?: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const dynamicReviews = parseReviews(product.reviewsJson?.value);
  const reviewsToDisplay = [...localReviews, ...(dynamicReviews || [])];
  
  const totalReviews = reviewsToDisplay.length;
  const sumRating = reviewsToDisplay.reduce((acc, r: any) => acc + (r.rating || 0), 0);
  const averageRating: number = totalReviews > 0 ? Number((sumRating / totalReviews).toFixed(1)) : parseFloat(product.rating?.value || "0");

  const hasReviews = totalReviews > 0 || parseInt(product.ratingCount?.value || "0") > 0;

  const counts: {rating: number, count: number}[] = [
    { rating: 5, count: 0 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ];

  reviewsToDisplay.forEach((r: any) => {
    const rNum = Math.floor(r.rating || 0);
    const countItem = counts.find(c => c.rating === rNum);
    if (countItem) countItem.count++;
  });

  const stats = {
    average: averageRating,
    totalCount: totalReviews || parseInt(product.ratingCount?.value || "0"),
    counts
  };

  if (showForm) {
    return (
      <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-12 border border-[#E9E1D5]">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900">Write a Review</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="text-xs font-semibold uppercase tracking-widest text-[#A65B4A] hover:underline"
            >
              Cancel
            </button>
          </div>
          <ReviewForm onSuccess={() => setShowForm(false)} productId={product.id} />
        </div>
      </div>
    );
  }

  if (!hasReviews) {
    return (
      <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-12 border border-[#E9E1D5] text-center">
        <h2 className="text-3xl md:text-[36px] font-serif font-semibold text-neutral-900 mb-6">
          Customer Reviews
        </h2>
        <div className="bg-white rounded-xl p-12 shadow-sm border border-neutral-100 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1 text-neutral-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} className="h-8 w-8" />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">Be the first to review!</h3>
          <p className="text-neutral-500 mb-8">Share your experience with this product and help other customers.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all rounded-[6px]"
          >
            Write a Review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] rounded-2xl p-6 md:p-12 border border-[#E9E1D5]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h2 className="text-3xl md:text-[36px] font-serif font-semibold text-neutral-900">
          Customer Reviews
        </h2>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-neutral-900 text-white px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all rounded-[6px]"
        >
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl font-sans font-semibold text-neutral-900 mb-2">
                {stats.average}
              </span>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={clsx(
                      "h-5 w-5",
                      stats.average >= rating ? "text-[#6B8E67]" : "text-neutral-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-neutral-500 font-medium whitespace-nowrap">
                Based On {stats.totalCount} Reviews
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {stats.counts.map((count) => (
                <div key={count.rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-12 shrink-0">
                    <span className="text-xs font-semibold text-neutral-700">{count.rating}</span>
                    <StarIcon className="h-3 w-3 text-neutral-400" />
                  </div>
                  <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#6B8E67] rounded-full" 
                      style={{ width: `${(count.count / (stats.totalCount || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-400 w-10 text-right">({count.count})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8 space-y-6">
          {reviewsToDisplay.map((review: any) => (
            <div key={review.id} className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#A65B4A] font-serif font-semibold text-lg">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[15px] font-semibold text-neutral-900">{review.author}</h4>
                      {review.verified && (
                         <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#6B8E67] text-white p-[2px]">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                           <polyline points="20 6 9 17 4 12" />
                         </svg>
                       </div>
                      )}
                    </div>
                    <p className="text-[12px] text-neutral-400 font-semibold">{review.location}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[11px] text-neutral-400 font-medium">{review.date}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={clsx(
                          "h-3.5 w-3.5",
                          review.rating >= rating ? "text-[#6B8E67]" : "text-neutral-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h4 className="text-[16px] font-semibold text-neutral-900 mb-2">{review.title}</h4>
              <p className="text-[14px] text-neutral-600 leading-relaxed font-medium">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewForm({ onSuccess, productId }: { onSuccess: () => void, productId: string }) {
  const [rating, setRating] = useState(5);
  const boundSubmitReview = submitReview.bind(null, productId);
  const [state, formAction, isPending] = useActionState(boundSubmitReview, null);

  if (state?.success) {
    return (
      <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-100">
        <div className="w-16 h-16 bg-[#F1F8F1] rounded-full flex items-center justify-center text-[#6B8E67] mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-8 h-8">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-4">{state.message}</h3>
        <button 
          onClick={onSuccess}
          className="text-xs font-semibold uppercase tracking-widest text-neutral-800 hover:underline"
        >
          Back to Reviews
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-neutral-100">
        <div className="mb-8">
          <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-4">
            Overall Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <StarIcon 
                  className={clsx(
                    "h-8 w-8 transition-colors",
                    rating >= i ? "text-[#6B8E67]" : "text-neutral-100"
                  )} 
                />
              </button>
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="author" className="block text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              placeholder="e.g. Ananya Sharma"
              className="w-full bg-[#FAF7F2] border-none rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-neutral-400"
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-2">
              Review Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="e.g. Noticeable Glow in Weeks"
              className="w-full bg-[#FAF7F2] border-none rounded-sm px-4 py-3 text-sm focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="content" className="block text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-2">
            Review Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={5}
            placeholder="Share your experience with this product..."
            className="w-full bg-[#FAF7F2] border-none rounded-[5px] px-4 py-3 text-sm focus:ring-1 focus:ring-neutral-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "w-full bg-neutral-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all rounded-sm",
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-800"
          )}
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
        {state?.error && (
          <p className="text-xs text-red-500 mt-4 text-center">{state.message}</p>
        )}
      </div>
    </form>
  );
}
