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
import { Playfair_Display, Instrument_Sans } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { VerifastBridge } from "components/verifast-bridge";
import { VerifastChat } from "components/verifast-chat";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
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
      className={`${instrumentSans.variable} ${playfair.variable}`}
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
