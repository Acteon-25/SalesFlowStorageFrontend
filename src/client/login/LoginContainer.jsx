import { useActionState, use } from "react"
import { useNavigate } from "react-router"
import { login, profile } from "@/service/authService"
import { UserContext } from "@/context/userContext"

export function LoginContainer() {
  const navigate = useNavigate()
  const { updateUser } = use(UserContext)

  const loginUserAction = async (previousState, formData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const response = await login({ email, password });
      if (response) {
        return response.message.errors;
      }
      const data = await profile();

      updateUser({ user: data });

      navigate("/dashboard");
      return null;
    } catch (e) {
      console.log(e);
      return ["Error en la conexión con el servidor"];
    }
  }

  const [error, submitAction, isPending] = useActionState(loginUserAction)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        action={submitAction}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">Login</h2>

        <input
          type="email"
          name="email"
          disabled={isPending}
          placeholder="Ej. masterfire@gmail.com"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        />

        <input
          type="password"
          name="password"
          disabled={isPending}
          placeholder="Ej. 123456"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        />

        <button
          disabled={isPending}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {isPending ? "Ingresando..." : "Login"}
        </button>

        {error?.length > 0 && (
          <ul className="text-red-500">
            {error.map((er, index) => (
              <li key={index}>❌ Error: {er}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}
