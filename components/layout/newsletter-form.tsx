"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "./newsletter-actions";

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col items-start text-left">
      <h4 className="text-[20px] md:text-[22px] font-serif font-bold text-neutral-900 mb-4 md:mb-8">
        Newsletter
      </h4>
      <p className="text-[14px] text-neutral-600 font-medium mb-6 md:mb-8 leading-relaxed max-w-sm">
        Sign up to our newsletter to receive exclusive offers.
      </p>
      <form ref={formRef} action={formAction} className="flex items-stretch h-[48px]">
        <input
          name="email"
          type="email"
          required
          disabled={isPending}
          placeholder="Enter Your Email"
          className="flex-1 min-w-0 bg-white border border-neutral-200 px-4 py-2 text-[13px] focus:outline-none focus:border-[#606E4C] transition-all rounded-l-sm border-r-0 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#8E9D7C] text-white font-sans font-bold text-[10px] tracking-widest px-4 uppercase hover:bg-[#6e3835] transition-all rounded-r-sm disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isPending ? "..." : "SUBSCRIBE"}
        </button>
      </form>
    </div>
  );
}
