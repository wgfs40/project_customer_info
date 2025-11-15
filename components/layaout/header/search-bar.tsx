"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const WAITH_BETWEEN_SEARCHES = 300;

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, WAITH_BETWEEN_SEARCHES);

  return (
    <div className={`w-full relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
      <Input
        type="text"
        placeholder={placeholder || "Buscar clientes..."}
        className="w-full py-2 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => handleSubmit(e.target.value)}
        defaultValue={searchParams.get("query") || ""}
      />
    </div>
  );
};

export default SearchBar;
