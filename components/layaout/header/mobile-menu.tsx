"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/types/menu-link";
import ShoppingCartAction from "./shopping-cart-actions";
import UserActions from "./user-actions";
import Logo from "./logo";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

const MobileMenu = ({ userSession }: { userSession: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <Logo />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6">
              <nav className="grid gap-y-4">
                {links.map((link) => {
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
              {/* Botones de accion para el carrito de compra y perfil de usuario */}
              <div className="flex items-center pl-5 space-x-5">
                <ShoppingCartAction userSession={userSession} />
                <UserActions userSession={userSession} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
