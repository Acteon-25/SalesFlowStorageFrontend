import { use, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { getSales, deleteSale } from "@/service/saleService";
import { Link } from "react-router";
import { Calendar } from "@/client/components/Calendar";
import { formatearFecha } from "@/utils/formatDate";

export function DashboardContainer() {
  const { user } = use(UserContext);
  const [sales, setSales] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const reloadSales = async (range = {}) => {
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

  const handleSearchWithoutDate = () => {
    setDateRange({ start: null, end: null });
    reloadSales();
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
    <div className="mx-auto p-6 min-h-screen">
      <div className="mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-gray-600">
            Username: <span className="font-medium">{user?.username}</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-700">Ventas</h2>
        <Link
          to="/dashboard/create-sale"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          + Nueva Venta
        </Link>
      </div>

      <Calendar onRangeSelect={handleRangeSelect} />

      <button
        onClick={handleSearchWithoutDate}
        className="mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
      >
        Buscar sin fecha
      </button>

      <div className="space-y-4 mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sales?.map((sale) => {
          return (
            <div
              key={sale.venta_id}
              className="w-full h-full flex flex-col rounded-2xl shadow-md bg-gray-100 p-4 border-l-4 border-blue-500 relative gap-2"
            >
              <button
                onClick={() => handleDelete(sale.venta_id)}
                className="absolute top-4 right-4 bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full flex items-center gap-1 hover:bg-red-200 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Eliminar
              </button>

              <h2 className="text-lg font-semibold pr-24 break-words">{sale.nombre_producto}</h2>
              <span className="text-xs text-gray-400">{formatearFecha(sale.fecha_venta)}</span>
              <p className="text-2xl font-bold text-blue-600">S/ {sale.total}</p>

              <div className="flex items-center text-gray-600 text-sm gap-4 mt-auto">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3z" />
                  </svg>
                  <span>Cant: {sale.cantidad}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8v4l3 3" />
                  </svg>
                  <span>Vendedor: {sale.username}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
