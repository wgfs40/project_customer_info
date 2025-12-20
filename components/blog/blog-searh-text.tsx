"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const WAITH_BETWEEN_SEARCHES = 300;

const BlogSearchText = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(pathname + "?" + params.toString());
  }, WAITH_BETWEEN_SEARCHES);

  return (
    <>
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pink-600 transition">
        <Search size={22} />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
        className="w-full pl-16 pr-8 py-6 bg-white shadow-2xl shadow-pink-100/40 border-none rounded-[2rem] text-xl outline-none focus:ring-4 ring-pink-50 transition-all placeholder:text-gray-300"
      />
    </>
  );
};

export default BlogSearchText;
