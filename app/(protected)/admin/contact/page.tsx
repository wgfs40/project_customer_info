import ContactTable from "@/components/admin/contact/contact-table";
import SearchBar from "@/components/layaout/header/search-bar";
import { Suspense } from "react";

const AdminContact = async ({
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
        <SearchBar className="flex-grow" placeholder="Buscar contactos..." />
      </div>
      <Suspense fallback={<div>Loading contact admin page...</div>}>
        {/* Replace with actual ContactTable component */}
        <ContactTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
};

export default AdminContact;
