import AdminBlogCreateButton from "@/components/admin/admin-blog/admin-blog-create-button";
import AdminBlogTable from "@/components/admin/admin-blog/admin-blog-table";
import SearchBar from "@/components/layaout/header/search-bar";
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
        <SearchBar className="flex-grow" placeholder="Buscar blogs..." />
        {/* Agregar botón de "Crear nuevo blog" aquí */}
        <AdminBlogCreateButton />
      </div>

      {/* Tabla de Blogs con Suspense para carga diferida */}
      <Suspense key={query + currentPage} fallback={<div>Loading admin blog table...</div>}>
        <AdminBlogTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
};

export default AdminBlogPage;
