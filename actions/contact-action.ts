"use server";

import { createClient } from "@/lib/supabase/client";
import { ContactFormSchema } from "@/validations/contact-validation";
import { type FormState } from "@/validations/form-state";
import { redirect } from "next/navigation";
import { z } from "zod";

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
