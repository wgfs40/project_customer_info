"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definimos los enlaces de navegación para móvil (pueden ser diferentes)
const mobileLinks = [
  { name: "Inicio", href: "/" },
  { name: "Clientes", href: "/clientes" },
  { name: "Añadir Cliente", href: "/clientes/nuevo" },
  { name: "Informes", href: "/informes" },
  { name: "Configuración", href: "/configuracion" },
  { name: "Soporte", href: "/soporte" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-xl font-bold text-gray-800">
                  Customer Info
                </Link>
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <nav className="grid gap-y-4">
                {mobileLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-3 py-3 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                href="/search"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Buscar
              </Link>
              <p className="mt-6 text-center text-base font-medium text-gray-500">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
