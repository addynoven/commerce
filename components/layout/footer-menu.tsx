"use client";

import clsx from "clsx";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function FooterMenuItem({
  item,
  showChevron = false,
}: {
  item: Menu;
  showChevron?: boolean;
}) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          "text-base font-medium text-black capitalize transition-colors hover:text-[#6e3835] flex items-center gap-1 py-2 pl-2.5 pr-2 rounded whitespace-nowrap",
          {
            "text-black": active,
          },
        )}
      >
        <span>{item.title}</span>
        {showChevron && (
          <ChevronDownIcon className="h-4 w-4 text-black" />
        )}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
