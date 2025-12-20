"use client";

import { links } from "@/types/menu-link";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="ml-10 flex items-baseline space-x-8">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-magenta hover:bg-pink-700 hover:text-white rounded-full ${
              isActive
                ? "bg-magenta text-white px-6 py-2  font-bold  transition"
                : "hover:text-magenta px-3 py-2 font-medium"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
