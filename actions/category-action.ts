"use server";

import { createClient } from "@/lib/supabase/server";
import { RegisterCategory, UpdateCategory } from "@/types/category";
import { FormStateCategory } from "@/validations/form-state";
import { redirect } from "next/dist/client/components/navigation";

/**
 * Obtiene una lista paginada de categorías
 * @param page - Número de página (basado en 1)
 * @param query - Término de búsqueda para filtrar por nombre
 * @param limit - Cantidad de registros por página
 * @returns Objeto con totalCategories y array de categorías
 * @example
 * const { totalCategories, categories } = await getCategories(1, "tech", 10);
 */
export async function getCategories(page: number, query: string, limit: number) {
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
/**
 * Obtiene una categoría específica por ID
 * @param categoryId - ID de la categoría
 * @returns Objeto categoría o null si no existe
 * @example
 * const category = await getCategoryById("456");
 */
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
/**
 * Crea una nueva categoría
 * @param formData - Datos del formulario con campo: name
 * @returns Objeto con success, data, y errors
 * @example
 * const formData = new FormData();
 * formData.append('name', 'Tecnología');
 * const result = await createCategory(formData);
 */
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
    /**
     * Actualiza una categoría existente
     * @param formData - Datos del formulario con campos: id, name
     * @returns Objeto con success, data, y errors
     * @example
     * const formData = new FormData();
     * formData.append('id', '456');
     * formData.append('name', 'Tecnología Avanzada');
     * const result = await updateCategory(formData);
     */
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

  const { data, error } = await supabase.from("categories").update({ name }).eq("id", categoryId);
  /**
   * Registra una nueva categoría o actualiza una existente (Server Action Form)
   * Detecta si el formulario es para crear o actualizar según la presencia del ID
   * @param prevState - Estado previo del formulario
   * @param formData - Datos del formulario con campos: id (opcional), name
   * @returns FormStateCategory con estado de la operación
   * @example
   * const result = await registerCategory(prevState, formData);
   */
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
  formData: FormData,
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
