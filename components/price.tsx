"use client";

import clsx from "clsx";

import { useCurrency } from "components/currency-context";

const Price = ({
  amount,
  className,
  currencyCode,
  currencyCodeClassName,
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<"p">) => {
  const { currency } = useCurrency();
  const activeCurrencyCode = currencyCode || currency.code;

  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: activeCurrencyCode,
        currencyDisplay: "narrowSymbol",
      }).format(parseFloat(amount))}`}
      <span className={clsx("ml-1", currencyCodeClassName || "inline")}>
        {`${activeCurrencyCode}`}
      </span>
    </p>
  );
};

export default Price;
