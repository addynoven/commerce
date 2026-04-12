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
    <div className="flex flex-col items-start text-left p-2 gap-4">
      <h4 className="text-lg md:text-2xl font-serif font-medium text-black">
        Newsletter
      </h4>
      <div className="flex flex-col gap-3">
        <p className="text-base font-normal text-black leading-[140%]">
          Sign up to our newsletter to receive exclusive offers.
        </p>
        <form ref={formRef} action={formAction} className="flex items-center gap-2 h-11">
          <input
            name="email"
            type="email"
            required
            disabled={isPending}
            placeholder="Enter Your Email"
            className="w-full md:w-80 h-11 bg-white border border-[#8C8C8C] px-3 py-2 text-xs focus:outline-none focus:border-[#606E4C] transition-all rounded-[5px] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending}
            className="h-11 px-3 bg-[#809671] text-white font-sans font-medium text-[13px] tracking-[0.02em] uppercase hover:bg-[#6e7d60] transition-all rounded-[5px] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isPending ? "..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
    </div>
  );
}
