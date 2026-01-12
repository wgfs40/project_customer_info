"use server";

import { createClient } from "@/lib/supabase/server";
import { RegisterCategory, UpdateCategory } from "@/types/category";
import { FormStateCategory } from "@/validations/form-state";
import { redirect } from "next/dist/client/components/navigation";

export async function getCategories(
  page: number,
  query: string,
  limit: number
) {
  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("categories")
    .select("*", { count: "exact" })
    .ilike("name", `%${query}%`)
    .range((page - 1) * limit, page * limit - 1)
    .order("created_at", { ascending: false });

  if (error) {
    return { totalCategories: 0, categories: [] };
  }
  const totalCategories = count || 0;
  const categories = data || [];
  return { totalCategories, categories };
}
export async function getCategoryById(categoryId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();
  if (error) {
    return null;
  }
  return data || null;
}
export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const category_obj: RegisterCategory = {
    name: formData.get("name") as string,
  };

  const { name } = category_obj;

  const { data, error } = await supabase.from("categories").insert({
    name,
  });

  if (error) {
    console.error("Supabase Insert Error:", error);
    throw new Error("Error creating category");
  }
  return {
    success: true,
    data: data || {},
    errors: null,
  };
}
export async function updateCategory(formData: FormData) {
  const supabase = await createClient();

  const update_category_obj: UpdateCategory = {
    id: formData.get("id") as string | unknown as number,
    name: formData.get("name") as string,
  };

  const { id: categoryId, name } = update_category_obj;

  const { data, error } = await supabase
    .from("categories")
    .update({ name })
    .eq("id", categoryId);
  if (error) {
    throw new Error("Error updating category");
  }
  return {
    success: true,
    data: data || {},
    errors: null,
  };
}

export async function registerCategory(
  prevState: FormStateCategory,
  formData: FormData
): Promise<FormStateCategory> {
  const categoryId = formData.get("id");
  if (categoryId && /^\d+$/.test(categoryId as string)) {
    let updateData = await updateCategory(formData);
    if (!updateData.success) {
      redirect("/admin/category");
      return {
        success: updateData.success,
        message: "Error updating category",
        data: updateData.data,
        errors: updateData.errors as any,
      };
    }
    return {
      success: updateData.success,
      message: "Category updated successfully",
      data: updateData.data,
      errors: null,
    };
  } else {
    let createData = await createCategory(formData);
    if (!createData.success) {
      createData.data = { ...createData.data };
      redirect("/admin/category");
      return {
        success: createData.success,
        message: "Error creating category",
        data: createData.data,
        errors: createData.errors as any,
      };
    }
    return {
      success: true,
      message: "Category created successfully",
      data: createData.data,
      errors: null,
    };
  }
}
