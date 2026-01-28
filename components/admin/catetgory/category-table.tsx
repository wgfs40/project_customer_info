import { getCategories } from "@/actions/category-action";
import formatDate from "@/components/common/format-date";
import Pagination from "@/components/common/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types/category";

const CategoryTable = async ({ page, query }: { page: number; query: string }) => {
  const { totalCategories, categories } = await getCategories(page, query, 10);

  if (categories.length === 0) {
    return <div>No hay categorías disponibles.</div>;
  }
  const totalCats = totalCategories;
  const objCats = (categories as Category[]) || [];

  const headers = ["Nombre", "Creado En", "Acciones"];

  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
      <div className="hidden sm:block rounded-lg border bg-white shadow-md overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {objCats.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(item.created_at!)}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Editar</button>
                  <button className="ml-2 text-red-600 hover:text-red-900">Eliminar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-end">
          <Pagination totalPages={totalCats} />
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
