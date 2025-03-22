import { use, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { getSales, deleteSale } from "@/service/saleService";
import { Link } from "react-router";
import { Calendar } from "@/client/components/Calendar";

export function DashboardContainer() {
  const { user } = use(UserContext);
  const [sales, setSales] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const reloadSales = async (range) => {
    if (!range?.start || !range?.end) return;
    try {
      const res = await getSales(range);
      setSales(res);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      reloadSales(dateRange);
    }
  }, [dateRange]);

  const handleRangeSelect = (range) => {
    setDateRange(range);
  };

  const handleDelete = async (saleId) => {
    try {
      await deleteSale(saleId);
      setSales((currentSales) => currentSales.filter((sale) => sale.venta_id !== saleId));
    } catch (error) {
      console.error("Error eliminando la venta:", error);
      alert("No se pudo eliminar la venta.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido</h1>
        <p className="text-gray-600">
          Username: <span className="font-medium">{user?.username}</span>
        </p>
        <p className="text-gray-600">
          Email: <span className="font-medium">{user?.email}</span>
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-semibold text-gray-700">Ventas</h2>
        <Link
          to="/dashboard/create-sale"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          + Nueva Venta
        </Link>
      </div>

      <Calendar onRangeSelect={handleRangeSelect} />

      <div className="space-y-4 mt-3">
        {sales?.map((sale) => (
          <div key={sale.venta_id} className="bg-gray-100 shadow-md rounded-lg p-4 border-l-4 border-blue-500 flex justify-between items-center">
            <div>
              <p className="text-gray-800 font-medium">{sale.username}</p>
              <p>{sale.fecha_venta}</p>
              <p className="text-gray-600">
                Producto: <span className="font-medium">{sale.nombre_producto}</span>
              </p>
              <p className="text-gray-600">
                Cantidad: <span className="font-medium">{sale.cantidad}</span>
              </p>
              <p className="text-gray-600">
                Total: <span className="font-semibold text-blue-600">${sale.total}</span>
              </p>
            </div>

            <button
              onClick={() => handleDelete(sale.venta_id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
