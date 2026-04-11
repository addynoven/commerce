import { logout } from "app/account/actions";
import { getCustomer, getCustomerOrders } from "lib/shopify";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Dashboard",
  description: "View your profile and orders.",
};

export default async function AccountPage() {
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;

  if (!customerAccessToken) {
    redirect("/account/login");
  }

  const customer = await getCustomer(customerAccessToken);
  const orders = await getCustomerOrders(customerAccessToken);

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
              <Link href="/account" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 w-fit pb-1">
                Dashboard
              </Link>
              <Link href="/account/orders" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit pb-1">
                Orders
              </Link>
              <Link href="/account/addresses" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit pb-1">
                Addresses
              </Link>
              <form action={logout}>
                <button type="submit" className="text-sm font-medium text-neutral-500 hover:text-red-600 transition-colors w-fit pb-1">
                  Logout
                </button>
              </form>
            </nav>
          </div>

          <div className="pt-8 border-t border-neutral-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">Default Address</h2>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {customer.firstName} {customer.lastName}<br />
              {customer.email}
            </p>
            <Link href="/account/addresses" className="inline-block mt-4 text-[11px] font-bold uppercase tracking-widest text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-all">
              Manage Addresses
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-12">
            <h2 className="text-[20px] font-serif font-bold text-neutral-900 mb-6">Recent Orders</h2>
            {orders.length > 0 ? (
              <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm font-sans">
                  <thead>
                    <tr className="bg-neutral-50 border-b border-neutral-200">
                      <th className="px-6 py-4 font-bold text-neutral-900">Order</th>
                      <th className="px-6 py-4 font-bold text-neutral-900">Date</th>
                      <th className="px-6 py-4 font-bold text-neutral-900">Status</th>
                      <th className="px-6 py-4 font-bold text-neutral-900 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {orders.slice(0, 5).map((order: any) => (
                      <tr key={order.id} className="hover:bg-neutral-25 transition-colors">
                        <td className="px-6 py-4 font-medium text-neutral-900">
                          <Link href={`/account/orders/${order.id}`} className="hover:text-[#6e3835] transition-colors">
                            {order.orderNumber}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-neutral-500">
                          {new Date(order.processedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            order.financialStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {order.financialStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-900 text-right font-medium">
                          {order.totalPrice.amount} {order.totalPrice.currencyCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-12 text-center">
                <p className="text-neutral-500 mb-6">You haven't placed any orders yet.</p>
                <Link href="/search" className="inline-block bg-[#606E4C] text-white px-8 py-3 font-bold uppercase tracking-widest text-[11px] transition-colors hover:bg-[#4a553a]">
                  Start Shopping
                </Link>
              </div>
            )}
            {orders.length > 5 && (
              <div className="mt-6 text-right">
                <Link href="/account/orders" className="text-xs font-bold text-[#6e3835] hover:text-black transition-colors">
                  View all orders →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
