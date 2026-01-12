import CategoryCreateButton from "@/components/admin/catetgory/category-create-button";
import CategoryTable from "@/components/admin/catetgory/category-table";
import SearchBar from "@/components/layaout/header/search-bar";
import { Suspense } from "react";

const PageCategory = async ({
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
        <SearchBar className="flex-grow" placeholder="Buscar categorías..." />
        <CategoryCreateButton />
      </div>
      <Suspense fallback={<div>Loading category admin page...</div>}>
        {/* Replace with actual CategoryTable component */}
        <CategoryTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
};

export default PageCategory;
