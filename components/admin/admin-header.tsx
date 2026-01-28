import { Menu, X } from "lucide-react";

const AdminHeader = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="admin-header">
      {/* Botón de Menú (visible solo en móvil/tablet) */}
      <button
        id="menu-button"
        onClick={handleMenuClick}
        aria-label={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
        className="sm:hidden p-1 rounded hover:bg-white/10 transition-colors"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <h1 className="text-xl font-bold">header</h1>

      {/* Espaciador para centrar el título si el botón no existe */}
      <div className="sm:hidden w-6"></div>
    </div>
  );
};

export default AdminHeader;
