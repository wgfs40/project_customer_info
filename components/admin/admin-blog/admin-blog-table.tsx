import { GetBlogs } from "@/actions/blog-action";
import formatDate from "@/components/common/format-date";
import IconWithTooltip from "@/components/common/icon-with-tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Blog } from "@/types/blog";
import { Edit, Trash } from "lucide-react";
import Pagination from "../../common/pagination";
import Link from "next/link";

const AdminBlogTable = async ({ page, query }: { page: number; query: string }) => {
  const blogs = await GetBlogs(page, query, 10);

  if (!blogs.data || (blogs.data as { totalBlogs: number; blogs: Blog[] }).blogs.length === 0) {
    return <div>No hay publicaciones de blog disponibles.</div>;
  }

  const totalBlogs = (blogs.data as { totalBlogs: number; blogs: Blog[] }).totalBlogs;
  const objBlogs = (blogs.data as { totalBlogs: number; blogs: Blog[] }).blogs;
  const headers = ["Titulo", "Contenido", "Tema", "Publicado En", "Acciones"];
  //const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
      {/* 1. VISTA DE ESCRITORIO/TABLET (Standard Table) */}
      {/* Oculto en móviles, visible desde el punto de quiebre 'sm' */}
      <div className="hidden sm:block rounded-lg border bg-white shadow-md overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                {headers[0]}
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                {headers[1]}
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                {headers[2]}
              </TableHead>
              <TableHead className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                {headers[3]}
              </TableHead>
              <TableHead className="text-right px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                {headers[4]}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {objBlogs.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-6 py-4 max-w-sm text-sm font-medium text-indigo-600">
                  {item.title}
                </TableCell>
                <TableCell className="px-6 py-4 max-w-md truncate text-sm text-gray-700">
                  {item.article_body.length > 60
                    ? item.article_body.substring(0, 60) + "..."
                    : item.article_body}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {item.main_topic} */}
                  {item.categories?.name || "-"}
                </TableCell>
                <TableCell className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.published_in ? formatDate(item.published_in) : "-"}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center space-x-3">
                    <Link href={`/admin/blog/${item.id}`}>
                      <IconWithTooltip tooltipText="Editar">
                        <Edit size={16} className="text-blue-600" />
                      </IconWithTooltip>
                    </Link>
                    <IconWithTooltip tooltipText="Eliminar">
                      <Trash size={16} className="text-red-500" />
                    </IconWithTooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-end">
          <Pagination totalPages={totalBlogs} />
        </div>
      </div>
      {/* 2. VISTA MÓVIL (Card Layout) */}
      {/* Visible solo en móviles, oculto desde el punto de quiebre 'sm' */}
      <div className="sm:hidden space-y-4" role="list">
        {objBlogs.map((item, index) => (
          <div key={index} className="bg-white p-4 border rounded-lg shadow-sm" role="listitem">
            {/* Header / Título Principal */}
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-800">
                {headers[0]}: {item.title}
              </span>
            </div>

            {/* Detalles (Filas) */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {/* Método */}
              <div className="col-span-1 text-gray-500 font-medium">{headers[2]}:</div>
              <div className="col-span-1 text-right text-gray-800">{item.main_topic}</div>

              {/* Monto */}
              <div className="col-span-1 text-gray-500 font-medium">{headers[3]}:</div>
              <div className="col-span-1 text-right font-bold text-lg text-indigo-600">
                {item.published_in ? formatDate(item.published_in) : "-"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogTable;
