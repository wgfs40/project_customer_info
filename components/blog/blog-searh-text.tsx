"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

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
    <div className="mb-6 container mx-auto px-4 bg-white p-6 rounded-lg border border-gray-200">
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default BlogSearchText;
