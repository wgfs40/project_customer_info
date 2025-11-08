"use client";

import { signInUser } from "@/actions/service-auth";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

const LoginForm = ({ user }: { user: Session | null }) => {
  const router = useRouter();

  if (user) {
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    // Aquí puedes manejar la lógica de inicio de sesión

    // Por ejemplo, podrías enviar una solicitud a tu API de autenticación
    signInUser(email as string, password as string)
      .then(() => {
        router.refresh();
        router.push("/");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
      });

    // signNewUser(email as string, password as string)
    //   .then((data) => {
    //     console.log("Usuario creado:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error al crear usuario:", error);
    //   });
  };
  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-accent-text text-white py-2 rounded-md"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
