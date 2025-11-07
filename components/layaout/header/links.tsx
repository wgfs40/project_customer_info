"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos los enlaces de navegación
const links = [
  { name: "Inicio", href: "/" },
  { name: "acerca-de-mi", href: "/about" },
  { name: "servicios", href: "/services" },
  { name: "contacto", href: "/contacts" },
  { name: "blog", href: "/blog" },
  // { name: "carrito", href: "/shopping-cart" },
  // { name: "login", href: "/login" },
  // { name: "registro", href: "/register" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex space-x-2 md:space-x-8 flex-wrap justify-center">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
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
