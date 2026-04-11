import { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { buyNow } from "components/cart/actions";
import { Product, ProductVariant } from "lib/shopify/types";
import clsx from "clsx";

export function BuyNow({ product, quantity, className }: { product: Product; quantity: number; className?: string }) {
  const { variants, availableForSale } = product;
  const searchParams = useSearchParams();
  const [state, formAction] = useActionState(buyNow, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;

  useEffect(() => {
    if (state?.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  }, [state]);

  const handleBuyNow = () => {
    if (!selectedVariantId) return;
    
    formAction({
      merchandiseId: selectedVariantId,
      quantity: quantity
    });
  };

  return (
    <div className="flex-1">
      <button
        onClick={handleBuyNow}
        disabled={!availableForSale || !selectedVariantId}
        className={clsx(
          "w-full h-12 md:h-14 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] rounded-[6px] shadow-sm transition-colors",
          availableForSale && selectedVariantId
            ? "bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50"
            : "bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200",
          className
        )}
      >
        {!availableForSale ? "Sold Out" : "Buy Now"}
      </button>
      {state?.error && (
        <p className="text-xs text-red-500 mt-1">{state.error}</p>
      )}
    </div>
  );
}
