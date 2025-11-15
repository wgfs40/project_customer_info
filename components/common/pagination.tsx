"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageUrl = (currentPage: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(currentPage));

    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="flex justify-center mt-8 space-x-4">
      {currentPage <= 1 ? (
        <span
          className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          aria-disabled="true"
        >
          Anterior
        </span>
      ) : (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Anterior
        </Link>
      )}
      {currentPage >= totalPages ? (
        <span
          className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          aria-disabled="true"
        >
          Siguiente
        </span>
      ) : (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Siguiente
        </Link>
      )}
    </div>
  );
};

export default Pagination;
