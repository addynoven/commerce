"use client";

import { login } from "app/account/actions";
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white border border-neutral-200 rounded-lg shadow-sm">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-2">Login</h1>
      <p className="text-sm text-neutral-500 mb-8">Please enter your e-mail and password:</p>

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

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-neutral-900">
              Password
            </label>
            <Link href="/account/recover" className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 underline underline-offset-4">
              Forgot password?
            </Link>
          </div>
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
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
        <p className="text-sm text-neutral-500">
          Don't have an account?{" "}
          <Link href="/account/register" className="font-bold text-neutral-900 hover:text-[#6e3835] transition-colors">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
