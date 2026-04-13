"use server";

import { customerAccessTokenCreate, customerCreate, customerRecover } from "lib/shopify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function performLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const res = await customerAccessTokenCreate({ email, password });

    if (!res) {
      console.error("Login Error: customerAccessTokenCreate returned null/undefined");
      return { error: "Could not connect to Shopify. Please check your credentials." };
    }

    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      console.error("Login Error:", res.customerUserErrors);
      return { error: "Incorrect email or password. Please try again." };
    }

    if (!res.customerAccessToken) {
      console.error("Login Error: No access token in response", res);
      return { error: "Incorrect email or password. Please try again." };
    }

    const { accessToken, expiresAt } = res.customerAccessToken;
    
    (await cookies()).set("customerAccessToken", accessToken, {
      expires: new Date(expiresAt),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return { success: true };
  } catch (e: any) {
    console.error("Login Exception:", e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function login(prevState: any, formData: FormData) {
  const result = await performLogin(formData);
  
  if (result.error) {
    return result;
  }

  redirect("/account");
}

export async function register(prevState: any, formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required." };
  }

  let registrationSuccess = false;

  try {
    const res = await customerCreate({
      firstName,
      lastName,
      email,
      password,
    });

    if (!res) {
      console.error("Registration Error: customerCreate returned null/undefined");
      return { error: "Could not connect to Shopify." };
    }

    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { error: res.customerUserErrors[0].message };
    }
    
    registrationSuccess = true;
  } catch (e: any) {
    console.error("Registration Exception:", e);
    return { error: "An unexpected error occurred. Please try again." };
  }

  if (registrationSuccess) {
    const loginResult = await performLogin(formData);
    if (loginResult.error) {
      return loginResult;
    }
    redirect("/account");
  }
}

export async function recover(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required." };
  }

  try {
    const res = await customerRecover(email);

    if (!res) {
      return { error: "Could not connect to Shopify. Please try again." };
    }

    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      console.error("Recover Error:", res.customerUserErrors);
    }

    return {
      success: "If an account exists for that email, we've sent a password reset link. Please check your inbox.",
    };
  } catch (e: any) {
    console.error("Recover Exception:", e);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logout() {
  (await cookies()).delete("customerAccessToken");
  redirect("/");
}
