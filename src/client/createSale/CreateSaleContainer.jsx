import { useActionState, useState, useEffect } from "react";
import { Link } from "react-router";
import { getItems } from "@/service/itemService";
import { createSale } from "@/service/saleService";

export function CreateSaleContainer() {
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await getItems();
        setItems(res);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  const createSaleAction = async (previousState, formData) => {
    const producto_id = formData.get("product");
    const cantidad = Number(formData.get("quantity"));

    const data = {
      producto_id,
      cantidad,
    };

    try {
      const error = await createSale(data);
      if (error) {
        return error.message;
      }
      setResult("Venta registrada con éxito");
      return null;
    } catch (e) {
      return e;
    }
  };

  const [error, submitAction, isPending] = useActionState(createSaleAction);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <Link
        to="/dashboard"
        className="mb-6 px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-200"
      >
        ← Volver al Dashboard
      </Link>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registrar Venta
        </h2>

        <form action={submitAction} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Producto</label>
            <select
              name="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={isPending}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition"
            >
              <option value="">Seleccione un producto</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre_producto}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              disabled={isPending}
              placeholder="Ingrese la cantidad"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition"
            />
          </div>

          <button
            disabled={isPending}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {isPending ? "Registrando venta..." : "Registrar Venta"}
          </button>

          {error?.length > 0 && (
            <ul className="text-red-500 text-sm mt-2">
              {error.map((er, index) => (
                <li key={index} className="flex items-center gap-2">
                  ❌ {er}
                </li>
              ))}
            </ul>
          )}

          {result && !error && (
            <div className="text-green-600 text-center font-medium mt-2">
              ✔ {result}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
