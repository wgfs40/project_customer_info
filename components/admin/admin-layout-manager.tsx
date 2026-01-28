"use client";

import { useState } from "react";
import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

const AdminLayoutManager = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="flex-grow flex content-bg sm:grid sm:grid-cols-4 lg:grid-cols-5 overflow-hidden relative">
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
        <section className="admin-children-container">{children}</section>
      </main>
    </>
  );
};

export default AdminLayoutManager;
