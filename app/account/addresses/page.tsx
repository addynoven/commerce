import { logout } from "app/account/actions";
import { getCustomer, getCustomerAddresses } from "lib/shopify";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AddressManager } from "./address-manager";

export const metadata = {
  title: "Addresses",
  description: "Manage your shipping addresses.",
};

export default async function AddressesPage() {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;

  if (!customerAccessToken) {
    redirect("/account/login");
  }

  const customer = await getCustomer(customerAccessToken);
  const { addresses, defaultAddressId } = await getCustomerAddresses(customerAccessToken);

  if (!customer) {
    redirect("/account/login");
  }

  return (
    <div className="main-container py-20">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-4">Account</h1>
            <nav className="flex flex-col gap-3">
              <Link href="/account" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit pb-1">
                Dashboard
              </Link>
              <Link href="/account/orders" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit pb-1">
                Orders
              </Link>
              <Link href="/account/addresses" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 w-fit pb-1">
                Addresses
              </Link>
              <form action={logout}>
                <button type="submit" className="text-sm font-medium text-neutral-500 hover:text-red-600 transition-colors w-fit pb-1">
                  Logout
                </button>
              </form>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <AddressManager initialAddresses={addresses} defaultAddressId={defaultAddressId} />
        </div>
      </div>
    </div>
  );
}
