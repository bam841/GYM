"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/#hero" },
    { name: "DISCOVER", href: "/#equipment" },
    { name: "CONTACT US", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-zinc-900 bg-black/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xs sm:text-base md:text-xl font-display font-black tracking-tighter text-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-transform shrink-0">
          <Dumbbell className="h-5 w-5 md:h-6 md:w-6" />
          <span>GYM KO TO FITNESS GYM</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs md:text-sm font-bold tracking-wider transition-colors hover:text-yellow-400 ${
                pathname === link.href ? "text-yellow-400" : "text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Admin Login button (hidden on very small screens, shown in menu) */}
          <Link
            href="/admin"
            className="hidden md:inline-block rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold tracking-wider text-zinc-300 transition-all hover:border-yellow-400/50 hover:text-yellow-400 hover:scale-105 active:scale-95"
          >
            ADMIN LOGIN
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg border border-zinc-900 p-2 text-zinc-400 hover:text-yellow-400 hover:border-yellow-400/30 transition-all md:hidden cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="border-t border-zinc-900 bg-black/95 backdrop-blur-lg px-4 py-6 md:hidden animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-bold tracking-wider transition-colors hover:text-yellow-400 ${
                  pathname === link.href ? "text-yellow-400" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="w-full text-center rounded-lg bg-yellow-400 py-3 text-xs font-black tracking-widest text-zinc-950 transition-all hover:bg-yellow-500"
            >
              ADMIN LOGIN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
