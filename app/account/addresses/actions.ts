"use server";

import { 
  customerAddressCreate, 
  customerAddressDelete, 
  customerAddressUpdate, 
  customerDefaultAddressUpdate 
} from "lib/shopify";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createAddress(formData: FormData) {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;
  if (!customerAccessToken) return { error: "Not authenticated" };

  const address = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    company: formData.get("company") as string,
    address1: formData.get("address1") as string,
    address2: formData.get("address2") as string,
    city: formData.get("city") as string,
    province: formData.get("province") as string,
    zip: formData.get("zip") as string,
    country: formData.get("country") as string,
    phone: formData.get("phone") as string,
  };

  try {
    const res = await customerAddressCreate(customerAccessToken, address);
    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { error: res.customerUserErrors[0].message };
    }
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (e) {
    return { error: "Failed to create address" };
  }
}

export async function updateAddress(addressId: string, formData: FormData) {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;
  if (!customerAccessToken) return { error: "Not authenticated" };

  const address = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    company: formData.get("company") as string,
    address1: formData.get("address1") as string,
    address2: formData.get("address2") as string,
    city: formData.get("city") as string,
    province: formData.get("province") as string,
    zip: formData.get("zip") as string,
    country: formData.get("country") as string,
    phone: formData.get("phone") as string,
  };

  try {
    const res = await customerAddressUpdate(customerAccessToken, addressId, address);
    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { error: res.customerUserErrors[0].message };
    }
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (e) {
    return { error: "Failed to update address" };
  }
}

export async function deleteAddress(addressId: string) {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;
  if (!customerAccessToken) return { error: "Not authenticated" };

  try {
    const res = await customerAddressDelete(customerAccessToken, addressId);
    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { error: res.customerUserErrors[0].message };
    }
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (e) {
    return { error: "Failed to delete address" };
  }
}

export async function setDefaultAddress(addressId: string) {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;
  if (!customerAccessToken) return { error: "Not authenticated" };

  try {
    const res = await customerDefaultAddressUpdate(customerAccessToken, addressId);
    if (res.customerUserErrors && res.customerUserErrors.length > 0) {
      return { error: res.customerUserErrors[0].message };
    }
    revalidatePath("/account/addresses");
    return { success: true };
  } catch (e) {
    return { error: "Failed to set default address" };
  }
}
