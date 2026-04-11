"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProductPage = pathname.includes("/product/");

  return (
    <main className={isProductPage ? "" : "pb-16 md:pb-0"}>
      {children}
    </main>
  );
}
