"use server";

import { shopifyFetch } from "lib/shopify";
import { customerCreateMutation } from "lib/shopify/mutations/customer";
import { revalidateTag } from "next/cache";

export async function subscribeToNewsletter(
  prevState: any,
  formData: FormData,
) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { message: "Please enter a valid email address.", status: "error" };
  }

  try {
    const res = await shopifyFetch<any>({
      query: customerCreateMutation,
      variables: {
        input: {
          email,
          password: `Newsletter@${Math.random().toString(36).slice(-8)}`, // API requires a password
          acceptsMarketing: true,
        },
      },
    });

    const data = res.body.data.customerCreate;

    if (data.customer) {
      // @ts-ignore
      revalidateTag("customer", "seconds");
      return { message: "Success! You've been subscribed.", status: "success" };
    }

    if (data.customerUserErrors && data.customerUserErrors.length > 0) {
      const error = data.customerUserErrors[0];

      // If customer already exists, we consider it a success for newsletter signup
      if (error.code === "TAKEN") {
        return {
          message: "You are already in our list! Thank you.",
          status: "success",
        };
      }

      return {
        message: error.message || "Subscription failed.",
        status: "error",
      };
    }

    return {
      message: "Subscription failed. Please try again later.",
      status: "error",
    };
  } catch (error: any) {
    if (
      error.extensions?.code === "THROTTLED" ||
      error.message?.includes("Limit exceeded")
    ) {
      return {
        message: "Too many attempts. Please try again in a few minutes.",
        status: "error",
      };
    }
    console.error("Newsletter subscription error:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
      status: "error",
    };
  }
}
