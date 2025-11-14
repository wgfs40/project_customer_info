import AdminBlogTable from "@/components/admin/admin-blog/admin-blog-table";
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
    <div>
      <Suspense
        key={query + currentPage}
        fallback={<div>Loading admin blog table...</div>}
      >
        <AdminBlogTable />
      </Suspense>
    </div>
  );
};

export default AdminBlogPage;
