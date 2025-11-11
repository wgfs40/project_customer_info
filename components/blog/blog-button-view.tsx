"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BlogButtonView = ({ blogid }: { blogid: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    // Navigate to the blog detail page
    console.log("Navigating to blog detail with ID:", blogid);
    replace(pathname + "/" + blogid);
  };
  return (
    <Button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Ver más
    </Button>
  );
};

export default BlogButtonView;
