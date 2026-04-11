import { logout } from "app/account/actions";
import { getCustomer, getCustomerOrders } from "lib/shopify";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Orders",
  description: "View your order history.",
};

export default async function OrdersPage() {
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
              <Link href="/account" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit pb-1">
                Dashboard
              </Link>
              <Link href="/account/orders" className="text-sm font-bold text-neutral-900 border-b border-neutral-900 w-fit pb-1">
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
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h2 className="text-[20px] font-serif font-bold text-neutral-900 mb-8">Order History</h2>
          
          {orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div key={order.id} className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-neutral-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Order Number</p>
                        <p className="text-sm font-bold text-neutral-900">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Date Placed</p>
                        <p className="text-sm text-neutral-900">{new Date(order.processedAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Total Amount</p>
                        <p className="text-sm font-bold text-neutral-900">{order.totalPrice.amount} {order.totalPrice.currencyCode}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.financialStatus === "PAID" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.financialStatus}
                      </span>
                      <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                        {order.fulfillmentStatus || "UNFULFILLED"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-6 py-6 border-t border-neutral-100">
                    <div className="divide-y divide-neutral-100">
                      {order.lineItems.edges.map((edge: any) => {
                        const item = edge.node;
                        return (
                          <div key={item.title} className="py-4 first:pt-0 last:pb-0 flex gap-6 items-center">
                            {item.variant?.image && (
                              <div className="w-16 h-16 bg-neutral-50 border border-neutral-100 rounded-md overflow-hidden flex-none">
                                <img src={item.variant.image.url} alt={item.variant.image.altText || item.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
                              <p className="text-xs text-neutral-400 mt-1">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-100 rounded-lg p-12 text-center">
              <p className="text-neutral-500 mb-6">You haven't placed any orders yet.</p>
              <Link href="/search" className="inline-block bg-[#606E4C] text-white px-8 py-3 font-bold uppercase tracking-widest text-[11px] transition-colors hover:bg-[#4a553a]">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
