"use server";

import type { CreateBlog, UpdateBlog } from "@/types/blog";

import { createClient } from "@/lib/supabase/server";
import { BlogFormSchema } from "@/validations/blog-validation";
import { z } from "zod";
import { type FormStateBlog } from "@/validations/form-state";
import { redirect } from "next/navigation";

/**
 * Obtiene una lista paginada de publicaciones del blog
 * @param page - Número de página (basado en 1)
 * @param query - Término de búsqueda para filtrar por título
 * @param limit - Cantidad de registros por página
 * @returns Objeto con totalBlogs y array de blogs
 * @example
 * const { totalBlogs, blogs } = await GetBlogs(1, "typescript", 10);
 */
export async function GetBlogs(page: number, query: string, limit: number) {
  const supabase = await createClient();
  // obtener publicaciones del blog desde la base de datos
  const { data, error, count } = await supabase
    .from("blogs")
    .select("*, categories(*)", { count: "exact" })
    .ilike("title", `%${query}%`)
    .range((page - 1) * limit, page * limit - 1)
    .order("created_at", { ascending: false });

  if (error) {
    return { totalBlogs: 0, blogs: [] };
  }
  const totalBlogs = count || 0;
  const blogs = data || [];
  return { totalBlogs, blogs };
}

/**
 * Obtiene las publicaciones destacadas del blog
 * @returns Array de publicaciones marcadas como destacadas y activas
 * @example
 * const featured = await GetFeaturedBlogs();
 */
export async function GetFeaturedBlogs() {
  const supabase = await createClient();
  // obtener publicaciones destacadas del blog desde la base de datos
  const { data, error } = await supabase
    .from("featured_blogs")
    .select("*, blogs(*)")
    .eq("active", true)
    .order("order", { ascending: false });
  if (error) {
    return [];
  }
  return data || [];
}

/**
 * Obtiene una publicación del blog específica por ID
 * @param blogid - ID única de la publicación del blog
 * @returns Objeto blog con datos de categoría asociada o null si no existe
 * @example
 * const blog = await GetBlogById("123");
 */
export async function GetBlogById(blogid: string) {
  const supabase = await createClient();
  // obtener una publicación del blog por su ID desde la base de datos
  const { data, error } = await supabase
    .from("blogs")
    .select("*, categories(*)", { count: "exact" })
    .eq("id", blogid)
    .single();

  if (error) {
    return null;
  }
  return data || null;
}

/**
 * Actualiza una publicación del blog existente
 * @param formData - Datos del formulario con campos: id, title, article_body, categoryid, main_topic, published_in
 * @returns Objeto con success, data (blog actualizado), message, y errors si ocurren
 * @example
 * const formData = new FormData();
 * formData.append('id', '123');
 * formData.append('title', 'Nuevo Título');
 * const result = await updateBlog(formData);
 */
export async function updateBlog(formData: FormData) {
  const supabase = await createClient();
  let formattedDate: string | null = null;
  if (formData.get("published_in")) {
    const d = new Date(formData.get("published_in") as string);
    // Si la fecha es válida, enviamos solo la parte YYYY-MM-DD (tipo date en Postgres)
    formattedDate = !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : null;
  }
  const blog: UpdateBlog = {
    id: parseInt(formData.get("id") as string),
    title: formData.get("title") as string,
    article_body: formData.get("article_body") as string,
    category_id: parseInt(formData.get("categoryid") as string),
    main_topic: formData.get("main_topic") as string,
    published_in: formattedDate,
  };
  const validationFields = BlogFormSchema.safeParse(blog);
  if (!validationFields.success) {
    const flattenedErrors = z.flattenError(validationFields.error);
    return {
      success: false,
      message: "Validation failed",
      errors: flattenedErrors.fieldErrors,
      data: blog,
    };
  }
  // actualizar una publicación del blog en la base de datos
  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: blog.title,
      article_body: blog.article_body,
      category_id: blog.category_id,
      main_topic: blog.main_topic,
      published_in: blog.published_in ? blog.published_in : null,
    })
    .eq("id", blog.id)
    .select()
    .single();
  if (error) {
    return {
      success: false,
      message: "Error updating blog",
      errors: { general: [error.message] },
      data: blog,
      /**
       * Crea una nueva publicación del blog
       * @param formData - Datos del formulario con campos: title, article_body, categoryid, main_topic, published_in
       * @returns Objeto con success, data (blog creado), message, y errors si ocurren
       * @example
       * const formData = new FormData();
       * formData.append('title', 'Mi Primer Blog');
       * formData.append('article_body', 'Contenido...');
       * const result = await createBlog(formData);
       */
    };
  }
  return {
    success: true,
    message: "Blog updated successfully",
    data: data || null,
    errors: {},
  };
}

export async function createBlog(formData: FormData) {
  const supabase = await createClient();

  const blog: CreateBlog = {
    title: formData.get("title") as string,
    article_body: formData.get("article_body") as string,
    category_id: parseInt(formData.get("categoryid") as string),
    main_topic: formData.get("main_topic") as string,
    published_in: new Date(formData.get("published_in") as string),
  };

  const validationFields = BlogFormSchema.safeParse(blog);
  if (!validationFields.success) {
    const flattenedErrors = z.flattenError(validationFields.error);
    return {
      success: false,
      message: "Validation failed",
      errors: flattenedErrors.fieldErrors,
      data: blog,
    };
  }

  // crear una nueva publicación del blog en la base de datos
  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title: blog.title,
      article_body: blog.article_body,
      category_id: blog.category_id,
      main_topic: blog.main_topic,
      published_in:
        blog.published_in instanceof Date ? blog.published_in.toISOString() : blog.published_in,
    })
    .select()
    .single();
  if (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: "Error creating blog",
      errors: { general: [error.message] },
      data: blog,
    };
  }
  return {
    success: true,
    message: "Blog created successfully",
    data: data || null,
    errors: {},
  };
}

export async function registerBlog(
  prevState: FormStateBlog,
  formData: FormData,
): Promise<FormStateBlog> {
  console.log("Form Data Received:", Array.from(formData.entries()));
  const id = formData.get("id") as string;
  if (id && /^\d+$/.test(id)) {
    let updateData = await updateBlog(formData);
    if (!updateData.success) {
      updateData.data = { ...updateData.data, id: parseInt(id) };
      return {
        success: updateData.success,
        message: updateData.message,
        data: updateData.data,
        errors: updateData.errors as any,
      };
    }
    return redirect("/admin/blog");
  } else {
    let createData = await createBlog(formData);
    if (!createData.success) {
      createData.data = { ...createData.data };
      return {
        success: createData.success,
        message: createData.message,
        data: createData.data,
        errors: createData.errors as any,
      };
    }
    return redirect("/admin/blog");
  }
}
