"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "../../lib/supabase/client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "Account created successfully. Check your email to verify your account."
      );

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 text-white">

      <div className="flex min-h-screen items-center justify-center py-12">

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
              Create your account and start collaborating.
            </p>

          </div>


          {/* Registration Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">

            <h1 className="text-2xl font-bold">
              Create account
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Fill in your details to get started.
            </p>


            <form
              onSubmit={handleRegister}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


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

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition placeholder:text-slate-600 focus:border-blue-500"
                />

              </div>


              {/* Confirm Password */}
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Confirm password
                </label>

                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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


              {/* Success */}
              {success && (
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                  {success}
                </div>
              )}


              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-medium transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

            </form>


            {/* Login */}
            <p className="mt-8 text-center text-sm text-slate-400">

              Already have an account?{" "}

              <Link
                href="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign in
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