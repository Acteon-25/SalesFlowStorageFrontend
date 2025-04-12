import { useActionState, use } from "react"
import { useNavigate } from "react-router"
import { login, profile } from "@/service/authService"
import { UserContext } from "@/context/userContext"
import { InputForm } from "@/client/components/InputForm"

export function LoginContainer() {
  const navigate = useNavigate()
  const { updateUser } = use(UserContext)

  const loginUserAction = async (previousState, formData) => {
    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const response = await login({ email, password });
      if (response.message) {
        return response.message;
      }
      const data = await profile();

      await updateUser({ user: { ...data } });

      await navigate("/dashboard");
      return null;
    } catch (e) {
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
        <h2 className="text-xl font-semibold text-center text-gray-800">Accede a tu cuenta</h2>

        <InputForm
          type="email"
          name="email"
          label="Correo electrónico"
          disabled={isPending}
          required
        />

        <InputForm
          type="password"
          name="password"
          label="Contraseña"
          disabled={isPending}
          required
        />

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
}
