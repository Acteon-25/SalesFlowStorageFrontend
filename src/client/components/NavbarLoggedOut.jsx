import { NavLink } from "react-router";

export function NavbarLoggedOut() {

  return (
    <header className="bg-gray-200 shadow-md">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-gray-800">
          <NavLink to="/" className="hover:text-blue-600 transition">MainPage</NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 transition ${isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 transition ${isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `text-gray-600 hover:text-blue-600 transition ${isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  )
}