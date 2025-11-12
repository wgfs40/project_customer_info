import AdminLayoutManager from "@/components/admin/admin-layout-manager";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="admin-layout-container">
        <AdminLayoutManager>{children}</AdminLayoutManager>
      </div>
    </>
  );
};

export default LayoutAdmin;
