const AdminSidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <div
      className={`admin-sidebar  ${
        isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4">sidebar</h2>
      {/* Ejemplo de contenido de sidebar */}
      <ul className="space-y-2 text-sm">
        <li>
          <a href="#" className="hover:text-blue-200">
            Enlace 1
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-200">
            Enlace 2
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-200">
            Enlace 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
