import { useActionState, useState } from "react"
import { register } from "@/service/authService"
import { InputForm } from "@/client/components/InputForm"

export function RegisterContainer() {
  const [result, setResult] = useState(null)

  const registerUserAction = async (previousState, formData) => {
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    const data = {
      username,
      email,
      password
    }

    try {
      const error = await register(data)
      if (error) {
        return error.message
      }
      setResult("Registro exitoso")
      return null
    } catch (e) {
      return e
    }
  }

  const [error, submitAction, isPending] = useActionState(registerUserAction)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        action={submitAction}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-800">Bienvenido, empecemos</h2>

        <InputForm
          type="text"
          name="username"
          label="Nombre de usuario"
          disabled={isPending}
          required
          error={error?.username}
        />

        <InputForm
          type="email"
          name="email"
          label="Correo electrónico"
          disabled={isPending}
          required
          error={error?.email}
        />

        <InputForm
          type="password"
          name="password"
          label="Contraseña"
          disabled={isPending}
          required
          error={error?.password}
        />

        <button
          disabled={isPending}
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {isPending ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        {result && !error && <div>✔ {result}</div>}
      </form>
    </div>
  )
}