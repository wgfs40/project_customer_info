"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BlogButtonView = ({ blogid }: { blogid: string }) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = () => {
    // Navigate to the blog detail page
    replace(pathname + "/" + blogid);
  };
  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="flex items-center gap-2 font-black text-gray-900 group-hover:text-pink-600 transition-all uppercase text-[11px] tracking-widest"
    >
      Ver más
    </Button>
  );
};

export default BlogButtonView;
