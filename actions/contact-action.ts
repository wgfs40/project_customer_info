"use server";

import { createClient } from "@/lib/supabase/client";
import { ContactFormSchema } from "@/validations/contact-validation";
import { type FormState } from "@/validations/form-state";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getContacts(page: number, query: string, limit: number) {
  const supabase = createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let { data, count, error } = await supabase
    .from("contacts")
    .select("*", { count: "exact" })
    .ilike("name", `%${query}%`)
    .ilike("email", `%${query}%`)
    .ilike("message", `%${query}%`)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Failed to fetch contacts");
  }

  return { data, count };
}

export async function contactRegister(
  prevState: FormState,
  formData: FormData
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
