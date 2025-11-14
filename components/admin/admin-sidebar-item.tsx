import Link from "next/link";
import { IconRenderer } from "../common/icon-map-lucide";

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
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings" as const,
  },
];

const AdminSidebarItem = () => {
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
    </div>
  );
};

export default AdminSidebarItem;
