"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 text-white">

      <div className="flex min-h-screen items-center justify-center">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-8 text-center">

            <Link
              href="/"
              className="text-2xl font-bold"
            >
              Collaboratory
            </Link>

            <p className="mt-3 text-slate-400">
              Welcome back. Sign in to continue.
            </p>

          </div>


          {/* Login Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">

            <h1 className="text-2xl font-bold">
              Sign in
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Enter your account details below.
            </p>


            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


              {/* Password */}
              <div>

                <div className="mb-2 flex justify-between">

                  <label className="text-sm font-medium">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>


            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-400">

              Don't have an account?{" "}

              <Link
                href="/register"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Create one
              </Link>

            </p>

          </div>


          {/* Back */}
          <div className="mt-6 text-center">

            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-slate-300"
            >
              ← Back to home
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}