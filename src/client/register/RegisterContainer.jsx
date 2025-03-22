import { useActionState, useState } from "react"
import { register } from "@/service/authService"

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
        return error.message.errors
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
        <h2 className="text-xl font-semibold text-center text-gray-800">Registro</h2>
        <input
          type="text"
          name="username"
          disabled={isPending}
          placeholder="Ej. MasterFire"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
        />

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
          {isPending ? "Registrando..." : "Register"}
        </button>

        {error?.length > 0 && (
          <ul className="text-red-500">
            {error.map((er, index) => (
              <li key={index}>❌ Error: {er}</li>
            ))}
          </ul>
        )}

        {error?.username && <p className="text-red-500">❌ {error.username[0]}</p>}
        {error?.email && <p className="text-red-500">❌ {error.email[0]}</p>}
        {error?.password && <p className="text-red-500">❌ {error.password[0]}</p>}

        {result && !error && <div>✔ {result}</div>}
      </form>
    </div>
  )
}