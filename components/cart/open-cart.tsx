import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center transition-colors">
      <ShoppingCartIcon
        className={clsx(
          "h-6 text-neutral-700 transition-all ease-in-out group-hover:scale-110 group-hover:text-brand-hover",
          className,
        )}
      />

      {quantity && quantity > 0 ? (
        <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A65B4A] text-[9px] font-bold text-white ring-2 ring-white animate-in zoom-in duration-300">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
