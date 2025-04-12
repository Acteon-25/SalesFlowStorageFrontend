import { NavLink } from "react-router";
import { use } from "react"
import { logout } from "@/service/authService";
import { UserContext } from "@/context/userContext"

export function NavbarLoggedIn() {
  const { updateUser } = use(UserContext)

  const handleLogout = async () => {
    try {
      await updateUser({ user: null })
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out");
    }
  };

  return (
    <header className="bg-gray-200 shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
          <NavLink to="/" className="hover:text-blue-600 transition">SalesFlowStorage</NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 transition ${isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Panel Principal
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  )
}