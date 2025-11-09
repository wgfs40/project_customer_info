"use server";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export async function contactRegister(formData: FormData) {
  // Your registration logic here
  const email = formData.get("email");
  const name = formData.get("name");
  const message = formData.get("message");

  // Validate and process the form data
  if (!email || !name || !message) {
    throw new Error("All fields are required");
  }

  const supabase = createClient();

  const { error } = await supabase.from("contacts").insert([
    {
      email,
      name,
      message,
    },
  ]);
  if (error) {
    console.error("Error inserting contact:", error);
    throw new Error("Failed to register contact");
  }

  redirect("/contacts");
}
