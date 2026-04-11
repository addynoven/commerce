"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { submitContactForm } from "./contact-actions";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
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
    <div className="bg-[#FAF7F2] p-8 md:p-12 border border-neutral-200">
      <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-8 pb-4 border-b border-neutral-200">
        Fill Your Details
      </h3>
      <form ref={formRef} action={formAction} className="space-y-6">
        <div>
          <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 mb-2">
            Full Name*
          </label>
          <input
            name="name"
            type="text"
            required
            disabled={isPending}
            placeholder="Enter your full name"
            className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green/30 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 mb-2">
            Email Address*
          </label>
          <input
            name="email"
            type="email"
            required
            disabled={isPending}
            placeholder="Enter your email address"
            className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green/30 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 mb-2">
            Phone Number
          </label>
          <input
            name="phone"
            type="tel"
            disabled={isPending}
            placeholder="Enter your phone number"
            className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green/30 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-sans font-bold uppercase tracking-widest text-neutral-500 mb-2">
            Message*
          </label>
          <textarea
            name="message"
            rows={4}
            required
            disabled={isPending}
            placeholder="Tell us how we can help you"
            className="w-full bg-white border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green/30 resize-none disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#A65B4A] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-brand-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
