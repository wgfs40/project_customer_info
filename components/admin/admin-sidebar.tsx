import AdminSidebarItem from "./admin-sidebar-item";

const AdminSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <div
      className={`admin-sidebar  ${
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">sidebar</h2>
      {/* Ejemplo de contenido de sidebar */}
      <AdminSidebarItem />
    </div>
  );
};

export default AdminSidebar;
