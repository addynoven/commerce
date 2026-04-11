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
          "text-[14px] font-semibold transition-colors hover:text-[#6e3835] flex items-center justify-between group py-1",
          {
            "text-neutral-900": active,
            "text-neutral-600": !active,
          },
        )}
      >
        <div className="flex items-center">
          <span className="w-0 group-hover:w-2 h-[1px] bg-[#6e3835] mr-0 group-hover:mr-2 transition-all"></span>
          {item.title}
        </div>
        {showChevron && (
          <ChevronDownIcon className="h-4 w-4 text-neutral-400 group-hover:text-[#6e3835] transition-colors" />
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
