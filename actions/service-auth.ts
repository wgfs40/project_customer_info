"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// configuracion de la cookie de sesión
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  domain: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname
    : "localhost",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

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
  cookiesStore.set(
    "access-token",
    data.session?.access_token || "",
    cookieOptions
  );
  redirect("/");
};

export const signInUser = async (formData: FormData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.log("Error during sign in:", error);
    throw new Error(error.message);
  }

  //crear la cookie de sesión
  const cookiesStore = await cookies();
  cookiesStore.set(
    "access-token",
    data.session?.access_token || "",
    cookieOptions
  );
  redirect("/");
};
export const signOutUser = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const getUserSession = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getUserWithJWT = async (jwt: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser(jwt);
  if (error) {
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
