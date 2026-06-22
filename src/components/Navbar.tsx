"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/#hero" },
    { name: "DISCOVER", href: "/#equipment" },
    { name: "CONTACT US", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-zinc-900 bg-black/85 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-base md:text-xl font-display font-black tracking-tighter text-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-transform">
          <Dumbbell className="h-5 w-5 md:h-6 md:w-6" />
          <span>GYM KO TO FITNESS GYM</span>
        </Link>

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

        <Link
          href="/admin"
          className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-bold tracking-wider text-zinc-300 transition-all hover:border-yellow-400/50 hover:text-yellow-400 hover:scale-105 active:scale-95"
        >
          ADMIN LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
