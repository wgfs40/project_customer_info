"use client";

import { getCaptchaToken } from "@/actions/recapcha-action";
import { signInUser } from "@/actions/service-auth";
import ComposeSubmitButton from "@/components/common/compose-submit-button";
import { Session } from "@supabase/supabase-js";

const LoginForm = ({ user }: { user: Session | null }) => {
  if (user) {
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <form
        action={async (formData: FormData) => {
          const token = await getCaptchaToken();
          await signInUser(token, formData);
        }}
        className="space-y-6"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          <ComposeSubmitButton
            buttonText="Iniciar sesión"
            buttonTextPending="Iniciando sesión..."
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
