import { getContacts } from "@/actions/contact-action";
import Pagination from "@/components/common/pagination";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import { Contact } from "@/types/contact";

const ContactTable = async ({ page, query }: { page: number; query: string }) => {
  const contacts = await getContacts(page, query, 10);
  const totalContacts = contacts.count || 0;
  const objContacts = contacts.data as Contact[];

  const headers = ["Nombre", "Correo Electrónico", "Mensaje", "Fecha", "Acciones"];
  return (
    <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
      <div className="hidden sm:block rounded-lg border bg-white shadow-md overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {objContacts.map((item) => (
              <TableRow key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 flex justify-end">
          <Pagination totalPages={totalContacts} />
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
