"use client";

import { recover } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";

export function RecoverForm() {
  const [state, action, pending] = useActionState(recover, undefined);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white border border-neutral-200 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-2">Reset Password</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Enter your email and we'll send you a link to reset your password.
      </p>

      <form action={action} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 outline-none transition-colors font-sans text-sm"
            placeholder="example@email.com"
          />
        </div>

        {state?.error && (
          <p className="text-xs font-medium text-red-500">{state.error}</p>
        )}

        {state?.success && (
          <p className="text-xs font-medium text-green-600">{state.success}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#606E4C] hover:bg-[#4a553a] text-white py-4 font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50"
        >
          {pending ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
        <p className="text-sm text-neutral-500">
          Remember your password?{" "}
          <Link href="/account/login" className="font-bold text-neutral-900 hover:text-[#6e3835] transition-colors">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
