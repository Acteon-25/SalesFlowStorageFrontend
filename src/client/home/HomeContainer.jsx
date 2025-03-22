export const HomeContainer = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800">Bienvenido a tu sistema de registro de ventas</h1>
        <p className="text-gray-600 mt-4">
          Gestiona tus ventas de manera rápida y sencilla con nuestra plataforma.
          Lleva el control de tus productos, clientes y reportes en un solo lugar.
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          Empezar ahora
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Registro de ventas</h3>
          <p className="text-gray-600 mt-2">Añade y gestiona tus ventas en tiempo real con facilidad.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Control de productos</h3>
          <p className="text-gray-600 mt-2">Lleva un inventario organizado con estadísticas detalladas.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">Reportes y análisis</h3>
          <p className="text-gray-600 mt-2">Obtén reportes sobre ventas y crecimiento de tu negocio.</p>
        </div>
      </div>
    </div>
  );
};