"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getProduct } from "lib/shopify";
import { TAGS } from "lib/constants";

function ensureGlobalId(id: string) {
  if (!id) return id;
  if (id.startsWith("gid://")) return id;
  try {
    const decoded = Buffer.from(id, "base64").toString("utf-8");
    if (decoded.startsWith("gid://")) return decoded;
  } catch (e) {
    // If decoding fails, return as is
  }
  return id;
}

export type ReviewState = {
  success: boolean;
  message: string;
  error?: string;
};

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}`
  : "";
const adminEndpoint = domain ? `${domain}/admin/api/2024-04/graphql.json` : "";

export async function submitReview(productHandle: string, productId: string, prevState: any, formData: FormData): Promise<ReviewState> {
  const adminKey = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!adminKey) {
    return {
      success: false,
      message: "Shopify Admin API token not configured.",
      error: "Missing SHOPIFY_ADMIN_ACCESS_TOKEN.",
    };
  }

  const gid = ensureGlobalId(productId);
  console.log(`Syncing reviews for Product ID: ${gid} (Original: ${productId})`);

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

  // Get existing reviews and stats
  const product = await getProduct(productHandle);
  let existingReviews: any[] = [];
  const currentRating = parseFloat(product?.rating?.value || "0");
  const currentCount = parseInt(product?.ratingCount?.value || "0");

  if (product && product.reviewsJson?.value) {
    try {
      existingReviews = JSON.parse(product.reviewsJson.value);
      if (!Array.isArray(existingReviews)) existingReviews = [];
    } catch (e) {}
  }

  const updatedReviews = [newReview, ...existingReviews];
  const updatedReviewsJson = JSON.stringify(updatedReviews);
  
  const newCount = updatedReviews.length;
  const newRating = updatedReviews.reduce((acc, r) => acc + (r.rating || 0), 0) / newCount;

  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          key
          namespace
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    metafields: [
      {
        ownerId: gid,
        namespace: "custom",
        key: "reviews_json",
        type: "json",
        value: updatedReviewsJson,
      },
      {
        ownerId: gid,
        namespace: "reviews",
        key: "rating",
        type: "number_decimal",
        value: newRating.toFixed(1),
      },
      {
        ownerId: gid,
        namespace: "reviews",
        key: "rating_count",
        type: "number_integer",
        value: newCount.toString(),
      }
    ]
  };

  try {
    const response = await fetch(adminEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": adminKey,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const resBody = await response.json();
    
    if (resBody.errors || (resBody.data?.metafieldsSet?.userErrors && resBody.data.metafieldsSet.userErrors.length > 0)) {
      console.error("Shopify Admin API Error:", resBody.errors || resBody.data?.metafieldsSet?.userErrors);
      return {
        success: false,
        message: "Failed to submit review.",
        error: "Shopify API error.",
      };
    }
  } catch (error) {
    console.error("Error setting metafield:", error);
    return {
      success: false,
      message: "Failed to submit review.",
      error: "Network or configuration error.",
    };
  }

  revalidateTag(TAGS.products, "seconds");
  revalidatePath(`/product/${productHandle}`, "page");

  console.log(`Successfully updated reviews for ${productHandle}`);

  return {
    success: true,
    message: "Review submitted successfully! It will appear after approval."
  };
}
