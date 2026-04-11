"use server";

import { customerAccessTokenCreate, customerCreate } from "lib/shopify";
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
      return { error: res.customerUserErrors[0].message };
    }

    if (!res.customerAccessToken) {
      console.error("Login Error: No access token in response", res);
      return { error: "Invalid email or password." };
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

export async function logout() {
  (await cookies()).delete("customerAccessToken");
  redirect("/");
}
