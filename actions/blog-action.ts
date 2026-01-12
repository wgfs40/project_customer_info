"use server";

import type { Blog, CreateBlog, UpdateBlog } from "@/types/blog";

import { createClient } from "@/lib/supabase/server";
import { BlogFormSchema } from "@/validations/blog-validation";
import { z } from "zod";
import { type FormStateBlog } from "@/validations/form-state";
import { redirect } from "next/navigation";

export async function GetBlogs(page: number, query: string, limit: number) {
  const supabase = await createClient();
  // obtener publicaciones del blog desde la base de datos
  const { data, error, count } = await supabase
    .from("blogs")
    .select("*", { count: "exact" })
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

export async function GetBlogById(blogid: string) {
  const supabase = await createClient();
  // obtener una publicación del blog por su ID desde la base de datos
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blogid)
    .single();
  if (error) {
    return null;
  }
  return data || null;
}

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
      main_topic: blog.main_topic,
      published_in: blog.published_in instanceof Date ? blog.published_in.toISOString() : blog.published_in,
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
  formData: FormData
): Promise<FormStateBlog> {
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
