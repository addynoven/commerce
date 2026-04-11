import { UserIcon } from "@heroicons/react/24/outline";
import CartModal from "components/cart/modal";
import { CurrencySelector } from "components/currency-selector";
import { Logo } from "components/logo";
import { WishlistIcon } from "components/wishlist/wishlist-icon";
import { getCollections, getCustomer, getMenu } from "lib/shopify";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { MegaMenu, type MegaMenuCard, type MegaMenuLink } from "./mega-menu";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("customer-account-main-menu");
  const collections = await getCollections();
  const categoryCollectionsRaw = await getCollections("tag:category");
  const concernCollectionsRaw = await getCollections("tag:concern");
  const customerAccessToken = (await cookies()).get(
    "customerAccessToken",
  )?.value;
  const customer = customerAccessToken
    ? await getCustomer(customerAccessToken)
    : null;

  // Filter out the 'All' collection if it exists
  const dynamicCollections = collections.filter(
    (c) => c.title.toLowerCase() !== "all",
  );

  // Map all collections for "All Products" featured cards
  const allProductsFeatured: MegaMenuCard[] = dynamicCollections
    .filter((c) => c.image)
    .slice(0, 4)
    .map((c) => ({
      title: c.title,
      path: c.path,
      image: {
        url: c.image!.url,
        altText: c.image!.altText,
      },
    }));

  const allProductsLinks: MegaMenuLink[] = [
    { title: "Shop All", path: "/search" },
    { title: "Bestsellers", path: "/search?sort=trending-desc" },
    { title: "New Arrivals", path: "/search?sort=latest-desc" },
  ];

  const categoryCollections = categoryCollectionsRaw
    .filter((c) => c.title.toLowerCase() !== "all")
    .slice(0, 8);
  const concernCollections = concernCollectionsRaw
    .filter((c) => c.title.toLowerCase() !== "all")
    .slice(0, 8);

  const categoryCards: MegaMenuCard[] = categoryCollections
    .filter((c) => c.image)
    .slice(0, 6)
    .map((c) => ({
      title: c.title,
      path: c.path,
      image: {
        url: c.image!.url,
        altText: c.image!.altText,
      },
    }));

  const categoryLinks: MegaMenuLink[] = categoryCollections.map((c) => ({
    title: c.title,
    path: c.path,
  }));

  const concernCards: MegaMenuCard[] = concernCollections
    .filter((c) => c.image)
    .slice(0, 8)
    .map((c) => ({
      title: c.title,
      path: c.path,
      image: {
        url: c.image!.url,
        altText: c.image!.altText,
      },
    }));

  const concernLinks: MegaMenuLink[] = concernCollections.map((c) => ({
    title: c.title,
    path: c.path,
  }));

  return (
    <>
      <div className="bg-[#6D8060] px-4 py-2 text-center text-sm font-medium text-white transition-colors">
        Enjoy Free Shipping on All Orders Over ₹999
      </div>
      <nav className="relative border-b border-neutral-200 bg-white">
        {/* Mobile Header (0 to 768px) */}
        <div className="flex md:hidden w-full justify-between items-center py-4 px-4 bg-white">
          <div className="flex items-center">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} customer={customer} />
            </Suspense>
          </div>
          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center absolute left-1/2 -translate-x-1/2"
          >
            <Logo variant="maroon" className="scale-75 origin-center" />
          </Link>
          <div className="flex items-center">
            <CartModal />
          </div>
        </div>

        {/* Tablet Header (768px to 1024px) */}
        <div className="hidden md:flex lg:hidden w-full items-center justify-between relative bg-white py-4 px-8 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-4">
            <CurrencySelector />
            <Link
              href="/search"
              className="text-neutral-700 hover:text-[#6e3835]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>

          <Link
            href="/"
            prefetch={true}
            className="flex items-center justify-center absolute left-1/2 -translate-x-1/2"
          >
            <Logo variant="maroon" className="scale-90 origin-center" />
          </Link>

          <div className="flex justify-end items-center gap-4">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="text-neutral-700 hover:text-[#6e3835] transition-colors"
            >
              <WishlistIcon />
            </Link>
            <Link
              href={customer ? "/account" : "/account/login"}
              aria-label="Account"
              className="text-neutral-700 hover:text-[#6e3835] transition-colors flex items-center gap-2"
            >
              <UserIcon className="h-5 w-5" />
              {customer && (
                <span className="text-xs font-medium hidden xl:inline">
                  {customer.firstName}
                </span>
              )}
            </Link>
            <CartModal />
          </div>
        </div>

        {/* Desktop Header (1024px and up) */}
        <div className="hidden lg:flex w-full items-center justify-between bg-white py-4 px-12 xl:px-24 max-w-[1440px] mx-auto">
          <div className="flex items-center">
            <Link
              href="/"
              prefetch={true}
              className="mr-6 flex items-center justify-start"
            >
              <Logo variant="maroon" />
            </Link>
          </div>

          <div className="flex-1 max-w-[500px] flex justify-center mx-8">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          <div className="flex justify-end items-center gap-6">
            <CurrencySelector />
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="text-neutral-700 hover:text-[#6e3835] transition-colors"
            >
              <WishlistIcon />
            </Link>
            <Link
              href={customer ? "/account" : "/account/login"}
              aria-label="Account"
              className="text-neutral-700 hover:text-[#6e3835] transition-colors flex items-center gap-2"
            >
              <UserIcon className="h-6 w-6" />
              {customer && (
                <span className="text-sm font-medium">
                  {customer.firstName}
                </span>
              )}
            </Link>
            <CartModal />
          </div>
        </div>
      </nav>
      <div className="hidden md:flex w-full justify-center py-3 border-b border-neutral-200 bg-[#FAFAF8] relative">
        <div className="flex justify-center w-full max-w-[1440px] mx-auto px-8 lg:px-12 xl:px-24">
          <ul className="flex gap-10 text-sm font-medium items-center font-sans tracking-wide">
            <li>
              <MegaMenu
                title="All Products"
                mainLinks={allProductsLinks}
                featuredCards={allProductsFeatured}
                gridCols="grid-cols-4"
              />
            </li>
            <li>
              <MegaMenu
                title="Shop By Category"
                mainLinks={categoryLinks}
                featuredCards={categoryCards}
                gridCols="grid-cols-6"
              />
            </li>
            <li>
              <MegaMenu
                title="Shop By Concern"
                mainLinks={concernLinks}
                featuredCards={concernCards}
                gridCols="grid-cols-4"
              />
            </li>
            <li>
              <Link
                href="/about"
                className="text-neutral-700 hover:text-[#6e3835] transition-colors text-sm font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/consultation"
                className="text-neutral-700 hover:text-[#6e3835] transition-colors text-sm font-medium"
              >
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
