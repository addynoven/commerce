"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Currency = {
  code: string;
  symbol: string;
  label: string;
  flag: string;
  countryCode: string; // ISO 3166-1 alpha-2 for Shopify @inContext
};

const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", label: "IND", flag: "🇮🇳", countryCode: "IN" },
  { code: "USD", symbol: "$", label: "USA", flag: "🇺🇸", countryCode: "US" },
  { code: "GBP", symbol: "£", label: "UK", flag: "🇬🇧", countryCode: "GB" },
  { code: "EUR", symbol: "€", label: "EU", flag: "🇪🇺", countryCode: "FR" },
];

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (code: string) => void;
  supportedCurrencies: Currency[];
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ 
  children,
  initialCountryCode 
}: { 
  children: React.ReactNode;
  initialCountryCode?: string;
}) {
  const router = useRouter();
  const [currency, setCurrencyState] = useState<Currency>(() => {
    // Hydrate the initial state identically to the server-rendered view
    if (initialCountryCode) {
      const found = SUPPORTED_CURRENCIES.find((c) => c.countryCode === initialCountryCode);
      if (found) return found;
    }
    return SUPPORTED_CURRENCIES[0]!;
  });

  const setCurrency = (code: string) => {
    const found = SUPPORTED_CURRENCIES.find((c) => c.code === code);
    if (found) {
      setCurrencyState(found);
      document.cookie = `countryCode=${found.countryCode}; path=/; max-age=31536000`;
      router.refresh();
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        supportedCurrencies: SUPPORTED_CURRENCIES,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
