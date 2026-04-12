import { CartProvider } from "components/cart/cart-context";
import { CurrencyProvider } from "components/currency-context";
import { Navbar } from "components/layout/navbar";
import { BottomMobileNav } from "components/layout/navbar/bottom-mobile-nav";
import { MainWrapper } from "components/layout/main-wrapper";
import { WelcomeToast } from "components/welcome-toast";
import { WishlistProvider } from "components/wishlist/wishlist-context";
import { getCart, getCollections, getCustomer } from "lib/shopify";
import { cookies } from "next/headers";
import { baseUrl } from "lib/utils";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { VerifastBridge } from "components/verifast-bridge";
import { VerifastChat } from "components/verifast-chat";
import "./globals.css";

const instrumentSans = localFont({
  src: [
    { path: "../public/fonts/instrument-sans-v4-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/instrument-sans-v4-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/instrument-sans-v4-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/instrument-sans-v4-latin-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const playfair = localFont({
  src: [
    { path: "../public/fonts/playfair-display-v40-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/playfair-display-v40-latin-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/playfair-display-v40-latin-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/playfair-display-v40-latin-700.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/playfair-display-v40-latin-800.woff2", weight: "800", style: "normal" },
    { path: "../public/fonts/playfair-display-v40-latin-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const countryCode = (await cookies()).get("countryCode")?.value || "IN";
  
  // Don't await the fetch, pass the Promise to the context provider
  const cartPromise = getCart();
  const categoryCollectionsRaw = await getCollections("tag:category", countryCode);
  const concernCollectionsRaw = await getCollections("tag:concern", countryCode);

  // Categorize collections for mobile Shop By menu (consistent with Navbar)
  const categories = categoryCollectionsRaw.filter(
    (c) => c.title.toLowerCase() !== "all",
  );
  const concerns = concernCollectionsRaw.filter(
    (c) => c.title.toLowerCase() !== "all",
  );
  
  const customerAccessToken = (await cookies()).get("customerAccessToken")?.value;
  const customer = customerAccessToken ? await getCustomer(customerAccessToken) : null;

  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${playfair.variable} ${instrumentSans.className}`}
      suppressHydrationWarning={true}
    >
      <body className="bg-brand-cream text-black selection:bg-brand-green selection:text-white font-sans">
        <CartProvider cartPromise={cartPromise}>
          <WishlistProvider>
            <CurrencyProvider initialCountryCode={countryCode}>
              <Navbar />
              <MainWrapper>
                {children}
                <Toaster closeButton />
                <WelcomeToast />
              </MainWrapper>
              <BottomMobileNav categories={categories} concerns={concerns} customer={customer} />
              <VerifastBridge />
              <VerifastChat />
            </CurrencyProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
