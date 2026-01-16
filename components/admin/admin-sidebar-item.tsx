"use client";

import Link from "next/link";
import { IconRenderer } from "../common/icon-map-lucide";
import { signOutUser } from "@/actions/service-auth";
import { useRouter } from "next/dist/client/components/navigation";

const items = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "Dashboard" as const,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: "Blog" as const,
  },
  {
    label: "Contactos",
    href: "/admin/contact",
    icon: "Contact" as const,
  },
  {
    label: "Categorías",
    href: "/admin/category",
    icon: "Category" as const,
  },
  {
    label: "Archivos",
    href: "/admin/files",
    icon: "File" as const,
  },
];

const AdminSidebarItem = () => {
  const { replace } = useRouter();
  const handleSignOut = () => {
    // Lógica para cerrar sesión de administrador si es necesario
    signOutUser().then(() => {
      replace("/");
    });
  };
  return (
    <div className="">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center p-2 font-bold text-accent-text hover:bg-gray-700 rounded-md"
        >
          <IconRenderer iconName={item.icon} className="mr-2" />
          {item.label}
        </Link>
      ))}
      <Link
        onClick={handleSignOut}
        href="#"
        className="flex items-center p-2 font-bold text-accent-text hover:bg-gray-700 rounded-md mt-4"
      >
        <IconRenderer iconName="LogOut" className="mr-2" />
        Salir de Admin
      </Link>
    </div>
  );
};

export default AdminSidebarItem;
