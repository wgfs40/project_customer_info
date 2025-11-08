import React from "react";

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Buscar servicios..."
        className={`${className} w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-inner focus:ring-2  transition duration-200`}
      />
    </>
  );
};

export default Search;
