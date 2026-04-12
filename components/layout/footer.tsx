import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Logo } from "components/logo";
import { getMenu } from "lib/shopify";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FooterMenuItem } from "./footer-menu";
import { NewsletterForm } from "./newsletter-form";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const copyrightName = COMPANY_NAME || SITE_NAME || "Aarshaveda LLC";

  // Dynamic menu fetching from Shopify (handles as defined in the plan)
  const [quickLinks, shopMenu, policyMenu] = await Promise.all([
    getMenu("footer-quick-links"),
    getMenu("footer-shop"),
    getMenu("footer-policies"),
  ]);

  const uspItems = [
    {
      text: "NATURAL HERBS",
      icon: "/footer/Natural Herbs.svg",
    },
    {
      text: "NO ADDED SUGAR",
      icon: "/footer/No Added Sugar.svg",
    },
    {
      text: "NO EXTRACTS USED",
      icon: "/footer/No Extracts Used.svg",
    },
    {
      text: "NO ARTIFICIAL COLORS",
      icon: "/footer/No Artificial Colors.svg",
    },
    {
      text: "BPA FREE PACKAGING",
      icon: "/footer/BPA Free Packaging.svg",
    },
  ];

  return (
    <footer className="bg-[#FAF7F2]">
      {/* 1. Values Ribbon (USP Bar) */}
      <div className="bg-[#606E4C] py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap min-w-max gap-12 md:gap-24 items-center">
          {[...uspItems, ...uspItems, ...uspItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 flex-none">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.text}
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12"
                />
              </div>
              <h2 className="text-white font-serif font-semibold tracking-[0.2em] text-lg md:text-2xl">
                {item.text}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Footer Content */}
      <div className="main-container pt-8 md:pt-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-16 mb-10 md:mb-20 md:border-b md:border-neutral-200 md:pb-16 text-center md:text-left">
          {/* Logo & Tagline */}
          <div className="max-w-sm flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block mb-6 md:mb-1">
              <Logo variant="maroon" className="scale-150 md:scale-100 origin-center mb-4 md:mb-0" />
            </Link>
            <p className="text-[15px] md:text-[13px] font-sans font-medium tracking-[0.18em] text-neutral-800 uppercase leading-[150%]">
              Over 100 Years of Ayurveda Heritage
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col items-start gap-6 md:gap-6 w-full md:w-auto text-left">
            <h3 className="text-2xl md:text-xl font-serif font-bold text-neutral-900">
              Contact Us
            </h3>
            <div className="flex flex-col items-start gap-5 md:gap-6">
              <Link
                href="tel:+914844058439"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-14 h-14 md:w-11 md:h-11 bg-[#A65B4A] rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-[#6e3835] transition-colors flex-none">
                  <PhoneIcon className="h-6 w-6 md:h-5 md:w-5" />
                </div>
                <span className="text-base md:text-[15px] font-semibold text-neutral-800 group-hover:text-[#6e3835] transition-colors tracking-wide">
                  +91 484 405 8439
                </span>
              </Link>
              <Link
                href="mailto:info@aarshaveda.com"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-14 h-14 md:w-11 md:h-11 bg-[#A65B4A] rounded-full flex items-center justify-center text-white shadow-sm group-hover:bg-[#6e3835] transition-colors flex-none">
                  <EnvelopeIcon className="h-6 w-6 md:h-5 md:w-5" />
                </div>
                <span className="text-base md:text-[15px] font-semibold text-neutral-800 group-hover:text-[#6e3835] transition-colors tracking-wide">
                  info@aarshaveda.com
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Link Grid - Reordered for Mobile to match screenshot */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5 md:gap-12 mb-8 md:mb-20">
          {/* Newsletter - First on mobile after contact, using separate div for divider */}
          <div className="order-1 lg:order-4 border-b lg:border-0 border-neutral-100 pb-5 lg:pb-0">
            <NewsletterForm />
          </div>

          {/* Quick Links */}
          <div className="order-2 lg:order-1 border-b lg:border-0 border-neutral-100 pb-5 lg:pb-0">
            <h4 className="text-lg md:text-xl font-serif font-bold text-neutral-900 mb-3 md:mb-8">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              {(quickLinks.length > 0
                ? quickLinks
                : [
                  { title: "About Us", path: "/about" },
                  { title: "Contact", path: "/contact" },
                  { title: "Blog", path: "/blog" },
                  { title: "FAQs", path: "/contact#faq" },
                  {
                    title: "Sacred Lotus Retreat",
                    path: "/search?q=retreat",
                  },
                ]
              ).map((item) => (
                <FooterMenuItem key={item.title} item={item} />
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div className="order-3 lg:order-2 border-b lg:border-0 border-neutral-100 pb-5 lg:pb-0">
            <h4 className="text-lg md:text-xl font-serif font-bold text-neutral-900 mb-3 md:mb-8">
              Shop
            </h4>
            <ul className="flex flex-col gap-3 md:gap-4">
              {(shopMenu.length > 0
                ? shopMenu
                : [
                  { title: "All Products", path: "/search" },
                  { title: "Shop By Category", path: "/shop-by-category" },
                  { title: "Shop By Concern", path: "/search/concerns" },
                  { title: "Organic Products", path: "/search?q=organic" },
                ]
              ).map((item) => {
                const needsChevron = [
                  "All Products",
                  "Shop By Category",
                  "Shop By Concern",
                ].some((t) => item.title.includes(t));
                return (
                  <FooterMenuItem
                    key={item.title}
                    item={item}
                    showChevron={needsChevron}
                  />
                );
              })}
            </ul>
          </div>

          {/* Policies */}
          <div className="order-4 lg:order-3 border-b lg:border-0 border-neutral-100 pb-5 lg:pb-0">
            <h4 className="text-lg md:text-xl font-serif font-bold text-neutral-900 mb-3 md:mb-8">
              Policies
            </h4>
            <ul className="flex flex-col gap-1 md:gap-4">
              {(policyMenu.length > 0
                ? policyMenu
                : [
                  { title: "Privacy Policy", path: "/privacy-policy" },
                  { title: "Return & Refund Policy", path: "/refund-policy" },
                  { title: "Terms Of Service", path: "/terms-of-service" },
                ]
              ).map((item) => (
                <FooterMenuItem key={item.title} item={item} />
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Product Ranges Sub-Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-5 md:gap-12 pt-6 md:pt-16 pb-6 md:pb-16 border-t border-neutral-100 md:border-neutral-200">
          {[
            {
              title: "Baby & Mom",
              links: [
                {
                  label: "Best Baby Care Product",
                  href: "/search?q=baby+care",
                },
                {
                  label: "Best Baby Massage Oil",
                  href: "/search?q=baby+massage",
                },
                { label: "Best Baby Skin Care", href: "/search?q=baby+skin" },
                { label: "Best Mom Care Oil", href: "/search?q=mom+care" },
              ],
            },
            {
              title: "Hair & Scalp",
              links: [
                { label: "Best Hair Oil", href: "/search?q=hair+oil" },
                {
                  label: "Best Ayurvedic Hair Oil",
                  href: "/search?q=ayurvedic+hair+oil",
                },
                { label: "Best Hair Growth Oil", href: "/search?q=growth+oil" },
                {
                  label: "Best Natural Hair Oil",
                  href: "/search?q=natural+hair+oil",
                },
              ],
            },
            {
              title: "Face & Skin",
              links: [
                { label: "Best Skin Serum", href: "/search?q=skin+serum" },
                { label: "Best Face Serum", href: "/search?q=face+serum" },
                {
                  label: "Best Ayurvedic Serum",
                  href: "/search?q=ayurvedic+serum",
                },
                { label: "Best Skin Glow Cream", href: "/search?q=skin+glow" },
              ],
            },
            {
              title: "Oils",
              links: [
                { label: "Best Coconut Oil", href: "/search/coconut-oil" },
                { label: "Best Amla Oil", href: "/search/amla-oil" },
                {
                  label: "Best Cold Pressed Oil",
                  href: "/search?q=cold+pressed",
                },
                {
                  label: "Best Ayurvedic Oil",
                  href: "/search?q=ayurvedic+oil",
                },
              ],
            },
          ].map((col, idx, arr) => (
            <div
              key={col.title}
              className={clsx("flex flex-col", {
                "border-b lg:border-0 border-neutral-100 pb-5 lg:pb-0":
                  idx < arr.length - 1,
              })}
            >
              <h5 className="text-base md:text-lg font-serif font-bold text-neutral-900 mb-3 md:mb-6">
                {col.title}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <FooterMenuItem
                    key={link.label}
                    item={{ title: link.label, path: link.href }}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Copyright Bar */}
      <div className="bg-[#A65B4A] py-8 md:py-5">
        <div className="main-container flex flex-col md:flex-row justify-between items-center gap-6 !pb-0">
          <div className="flex items-center gap-5 order-1 md:order-2">
            {[
              {
                label: "Facebook",
                href: "https://www.facebook.com/AyurvedaKerala",
                icon: Facebook,
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/aarshavedawellness/",
                icon: Instagram,
              },
              {
                label: "Pinterest",
                href: "https://www.pinterest.com/aarshaveda/",
                icon: ({ width, height, className }: { width: number; height: number; className: string }) => (
                  <svg width={width} height={height} className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                ),
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@aarshaveda",
                icon: Youtube,
              },
            ].map((social) => (
              <div
                key={social.label}
                className="w-10 h-10 md:w-8 md:h-8 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
              >
                <Link href={social.href}>
                  <social.icon className="text-white" width={20} height={20} />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-white text-[13px] md:text-xs font-semibold tracking-[0.05em] order-2 md:order-1">
            Copyright © {new Date().getFullYear()} {copyrightName}
          </p>
        </div>
      </div>
    </footer>
  );
}
