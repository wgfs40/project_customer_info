"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Configuración de opciones para cookies de sesión
 * @internal
 */
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  domain: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname
    : "localhost",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

/**
 * Registra un nuevo usuario en la plataforma
 * Crea una cuenta de autenticación y establece la cookie de sesión
 * @param email - Email del nuevo usuario
 * @param password - Contraseña del nuevo usuario
 * @throws Redirige a / después de registro exitoso
 * @throws Error si el email ya existe o hay problemas de autenticación
 * @example
 * await signNewUser('user@example.com', 'password123');
 */
export const signNewUser = async (email: string, password: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log("Error during sign up:", error);
    throw new Error(error.message);
  }
  //crear la cookie de sesión
  const cookiesStore = await cookies();
  cookiesStore.set("access-token", data.session?.access_token || "", cookieOptions);
  redirect("/");
};

/**
 * Inicia sesión de un usuario existente
 * Valida credenciales y establece la cookie de sesión
 * @param formData - Datos del formulario con campos: email, password
 * @returns No retorna; redirige a / si es exitoso
 * @throws Error si las credenciales son inválidas
 * @example
 * const formData = new FormData();
 * formData.append('email', 'user@example.com');
 * formData.append('password', 'password123');
 * await signInUser(formData);
 */
export const signInUser = async (formData: FormData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    /**
     * Cierra la sesión del usuario actual
     * @throws Error si hay problemas al cerrar sesión
     * @example
     * await signOutUser();
     */
  });

  if (error) {
    console.log("Error during sign in:", error);
    throw new Error(error.message);
  }

  //crear la cookie de sesión
  const cookiesStore = await cookies();
  cookiesStore.set("access-token", data.session?.access_token || "", cookieOptions);
  redirect("/");
};
export const signOutUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  /**
   * Obtiene la sesión actual del usuario autenticado
   * @returns Objeto de sesión con datos del usuario y tokens
   * @throws Error si hay problemas al obtener la sesión
   * @example
   * const session = await getUserSession();
   */

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserSession = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  /**
   * Obtiene datos del usuario a partir de un JWT token
   * @param jwt - JWT token del usuario
   * @returns Objeto con datos del usuario
   * @throws Error si el token es inválido
   * @example
   * const user = await getUserWithJWT('eyJhbGc...');
   */

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserWithJWT = async (jwt: string) => {
  /**
   * Envía un email de reset de contraseña al usuario
   * @param email - Email del usuario que solicita reset de contraseña
   * @returns Datos de la solicitud de reset
   * @throws Error si el email no existe o hay problemas al enviar
   * @example
   * await resetPasswordForEmail('user@example.com');
   */
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser(jwt);
  if (error) {
    /**
     * Actualiza la contraseña del usuario autenticado actual
     * @param newPassword - Nueva contraseña del usuario
     * @returns Objeto con datos del usuario actualizado
     * @throws Error si el usuario no está autenticado o hay problemas al actualizar
     * @example
     * await updateUserPassword('newPassword123');
     */
    throw new Error(error.message);
  }
  return data;
};

export const resetPasswordForEmail = async (email: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-password`,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const updateUserPassword = async (newPassword: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
