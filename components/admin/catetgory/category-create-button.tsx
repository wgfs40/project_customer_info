"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CategoryCreateButton = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push("/admin/category/create");
  };
  return (
    <Button
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      onClick={handleCreate}
    >
      <PlusIcon className="h-5 w-5" size={20} />
    </Button>
  );
};

export default CategoryCreateButton;
