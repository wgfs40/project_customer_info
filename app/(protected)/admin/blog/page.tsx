import AdminBlogTable from "@/components/admin/admin-blog/admin-blog-table";
import SearchBar from "@/components/layaout/header/search-bar";
import { Plus } from "lucide-react";
import { Suspense } from "react";

const AdminBlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const query = params.query || "";

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchBar
          className="flex-grow"          
          placeholder="Buscar blogs..."
        />
        {/* Agregar botón de "Crear nuevo blog" aquí */}
        <button
          title="Agregar nuevo blog"
          className="px-4 py-2 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4 font-bold" size={16} />
        </button>
      </div>

      {/* Tabla de Blogs con Suspense para carga diferida */}
      <Suspense
        key={query + currentPage}
        fallback={<div>Loading admin blog table...</div>}
      >
        <AdminBlogTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
};

export default AdminBlogPage;
