import ContactTable from "@/components/admin/contact/contact-table";
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
    <div>
      <Suspense fallback={<div>Loading contact admin page...</div>}>
        {/* Replace with actual ContactTable component */}
        <ContactTable page={currentPage} query={query} />
      </Suspense>
    </div>
  );
};

export default AdminContact;
