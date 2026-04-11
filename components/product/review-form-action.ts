"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export type ReviewState = {
  success: boolean;
  message: string;
  error?: string;
};

export async function submitReview(productId: string, prevState: any, formData: FormData): Promise<ReviewState> {
  const rating = formData.get("rating");
  const author = formData.get("author");
  const title = formData.get("title");
  const content = formData.get("content");

  if (!rating || !author || !title || !content) {
    return {
      success: false,
      message: "Please fill in all fields.",
      error: "Missing required fields.",
    };
  }

  const newReview = {
    id: Date.now().toString(),
    author: author.toString(),
    location: "Verified Buyer",
    date: new Date().toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }),
    rating: parseInt(rating.toString(), 10),
    title: title.toString(),
    content: content.toString(),
    verified: true,
  };

  const dataFile = path.join(process.cwd(), "data", "reviews.json");
  
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, "{}", "utf8");
  }

  let reviewsData: Record<string, any[]> = {};
  try {
    reviewsData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch (e) {
    reviewsData = {};
  }

  if (!reviewsData[productId]) {
    reviewsData[productId] = [];
  }

  reviewsData[productId].unshift(newReview);

  fs.writeFileSync(dataFile, JSON.stringify(reviewsData, null, 2), "utf8");

  // Revalidate to show new review
  revalidatePath("/product/[handle]", "page");

  return {
    success: true,
    message: "Thank you for your review! It has been published.",
  };
}

export async function getReviewsForProduct(productId: string) {
  const dataFile = path.join(process.cwd(), "data", "reviews.json");
  if (!fs.existsSync(dataFile)) {
    return [];
  }
  try {
    const reviewsData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
    return reviewsData[productId] || [];
  } catch (e) {
    return [];
  }
}
