"use client";
import { Input } from "../ui/input";

interface SearchProps {
  className?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ className, onSearch, placeholder }) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder || "Buscar servicios..."}
        className={`${className} w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-inner focus:ring-2  transition duration-200`}
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
