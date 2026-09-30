"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
            C
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Collaboratory
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <a
            href="#home"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#about"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            About
          </a>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">

          <button className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white">
            Login
          </button>

          <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            Get Started
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="rounded-lg p-2 text-white md:hidden"
        >
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Navigation */}
      {mobileMenu && (
        <div className="border-t border-white/10 bg-slate-950 px-6 py-6 md:hidden">

          <div className="flex flex-col gap-5">

            <a
              href="#home"
              onClick={() => setMobileMenu(false)}
              className="text-slate-300 hover:text-white"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={() => setMobileMenu(false)}
              className="text-slate-300 hover:text-white"
            >
              Features
            </a>

            <a
              href="#about"
              onClick={() => setMobileMenu(false)}
              className="text-slate-300 hover:text-white"
            >
              About
            </a>

            <button className="rounded-lg border border-white/10 py-3 text-slate-300">
              Login
            </button>

            <button className="rounded-lg bg-blue-600 py-3 text-white">
              Get Started
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}