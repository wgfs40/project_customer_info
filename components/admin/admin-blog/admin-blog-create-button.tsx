"use client";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

const AdminBlogCreateButton = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/admin/blog/create");
  };

  return (
    <button
      title="Crear blog"
      onClick={handleCreate}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      <PlusIcon className="h-5 w-5" size={20} />
    </button>
  );
};

export default AdminBlogCreateButton;
