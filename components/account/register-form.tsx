"use client";

import { register } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";

export function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white border border-neutral-200 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-2">Create Account</h1>
      <p className="text-sm text-neutral-500 mb-8">Please fill in the information below:</p>

      <form action={action} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 outline-none transition-colors font-sans text-sm"
              placeholder="First Name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 outline-none transition-colors font-sans text-sm"
              placeholder="Last Name"
            />
          </div>
        </div>

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

        <div>
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-4 py-3 border border-neutral-200 focus:border-neutral-900 outline-none transition-colors font-sans text-sm"
            placeholder="••••••••"
          />
        </div>

        {state?.error && (
          <p className="text-xs font-medium text-red-500">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#606E4C] hover:bg-[#4a553a] text-white py-4 font-bold uppercase tracking-widest text-xs transition-colors disabled:opacity-50"
        >
          {pending ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
        <p className="text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/account/login" className="font-bold text-neutral-900 hover:text-[#6e3835] transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
