"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "DISCOVER", href: "/discover" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tighter text-orange-500">
          <Dumbbell className="h-6 w-6" />
          <span>GYM</span>
        </Link>

        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href ? "text-orange-500" : "text-zinc-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/admin"
          className="rounded-full bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-zinc-100 transition-colors hover:bg-zinc-700"
        >
          ADMIN LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
