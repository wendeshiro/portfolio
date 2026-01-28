"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "DEVELOPMENT", path: "/development" },
  { name: "DESIGN", path: "/design" },
  { name: "MARKETING", path: "/marketing" },
  { name: "ABOUT", path: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/60 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-center gap-8 px-4">
        {navItems.map((item) => {
          const isActive =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          let activeClass = "text-primary";
          if (item.name === "DESIGN") activeClass = "text-secondary";
          if (item.name === "MARKETING") activeClass = "text-tertiary";

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium tracking-widest transition-colors ${
                isActive
                  ? `${activeClass}`
                  : "text-gray-600 hover:text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
