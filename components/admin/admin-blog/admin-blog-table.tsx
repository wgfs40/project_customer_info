// --- DATOS DE EJEMPLO ---
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Pagado",
    method: "Tarjeta de crédito",
    amount: "$250.00",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendiente",
    method: "Transferencia bancaria",
    amount: "$150.00",
  },
  {
    invoice: "INV003",
    paymentStatus: "No Pagado",
    method: "PayPal",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pagado",
    method: "Tarjeta de crédito",
    amount: "$450.00",
  },
  {
    invoice: "INV005",
    paymentStatus: "Pendiente",
    method: "Efectivo",
    amount: "$550.00",
  },
];

const getStatusClasses = (status: string) => {
  switch (status) {
    case "Pagado":
      return "bg-emerald-100 text-emerald-600";
    case "Pendiente":
      return "bg-amber-100 text-amber-600";
    case "No Pagado":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const AdminBlogTable = () => {
  const headers = ["Factura", "Estado", "Método", "Monto"];
  return (
    <div className="w-full">
      {/* 1. VISTA DE ESCRITORIO/TABLET (Standard Table) */}
      {/* Oculto en móviles, visible desde el punto de quiebre 'sm' */}
      <div className="hidden sm:block rounded-lg border bg-white shadow-md overflow-hidden">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 w-[100px]">
                {headers[0]}
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                {headers[1]}
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                {headers[2]}
              </th>
              <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 w-[100px]">
                {headers[3]}
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {invoices.map((item, index) => (
              <tr
                key={index}
                className="border-b transition-colors hover:bg-gray-50"
              >
                <td className="p-4 align-middle font-medium text-gray-900">
                  {item.invoice}
                </td>
                <td className="p-4 align-middle">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                      item.paymentStatus
                    )}`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="p-4 align-middle text-gray-700">
                  {item.method}
                </td>
                <td className="p-4 align-middle text-right font-semibold text-gray-800">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* 2. VISTA MÓVIL (Card Layout) */}
      {/* Visible solo en móviles, oculto desde el punto de quiebre 'sm' */}
      <div className="sm:hidden space-y-4" role="list">
        {invoices.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 border rounded-lg shadow-sm"
            role="listitem"
          >
            {/* Header / Título Principal */}
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-800">
                {headers[0]}: {item.invoice}
              </span>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                  item.paymentStatus
                )}`}
              >
                {item.paymentStatus}
              </span>
            </div>

            {/* Detalles (Filas) */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {/* Método */}
              <div className="col-span-1 text-gray-500 font-medium">
                {headers[2]}:
              </div>
              <div className="col-span-1 text-right text-gray-800">
                {item.method}
              </div>

              {/* Monto */}
              <div className="col-span-1 text-gray-500 font-medium">
                {headers[3]}:
              </div>
              <div className="col-span-1 text-right font-bold text-lg text-indigo-600">
                {item.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogTable;
