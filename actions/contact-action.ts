"use server";

import { createClient } from "@/lib/supabase/client";
import { ContactFormSchema } from "@/validations/contact-validation";
import { type FormState } from "@/validations/form-state";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Obtiene una lista paginada de contactos enviados
 * @param page - Número de página (basado en 1)
 * @param query - Término de búsqueda para filtrar por nombre
 * @param limit - Cantidad de registros por página
 * @returns Objeto con data (array de contactos) y count (total)
 * @example
 * const { data, count } = await getContacts(1, "juan", 10);
 */
export async function getContacts(page: number, query: string, limit: number) {
  const supabase = createClient();

  let { data, count, error } = await supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .ilike("name", `%${query}%`)
    // .ilike("email", `%${query}%`)
    // .ilike("message", `%${query}%`)
    .range((page - 1) * limit, page * limit - 1)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: [], count: 0 };
  }

  return { data, count };
}

/**
 * Registra un nuevo contacto enviado a través del formulario de contacto (Server Action Form)
 * Valida los datos y redirige después de la inserción
 * @param prevState - Estado previo del formulario
 * @param formData - Datos del formulario con campos: email, name, message
 * @returns FormState con resultado de la validación
 * @throws Redirige a /contacts si el registro es exitoso
 * @example
 * const result = await contactRegister(prevState, formData);
 */
export async function contactRegister(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  // Your registration logic here
  const fields = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  };

  const validationFields = ContactFormSchema.safeParse(fields);

  if (!validationFields.success) {
    const flattenedErrors = z.flattenError(validationFields.error);
    return {
      success: false,
      message: "Validation failed",
      errors: flattenedErrors.fieldErrors,
      data: fields,
    };
  }

  const supabase = createClient();

  const { error } = await supabase.from("contacts").insert([
    {
      name: fields.name,
      email: fields.email,
      message: fields.message,
    },
  ]);
  if (error) {
    throw new Error("Failed to register contact");
  }

  redirect("/contacts");
}
