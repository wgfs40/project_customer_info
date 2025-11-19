"use server";

import type { Blog, CreateBlog, UpdateBlog } from "@/types/blog";

import { createClient } from "@/lib/supabase/server";
import { BlogFormSchema } from "@/validations/blog-validation";
import { z } from "zod";

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
  const blog: UpdateBlog = {
    id: parseInt(formData.get("id") as string),
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
  // actualizar una publicación del blog en la base de datos
  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: blog.title,
      article_body: blog.article_body,
      main_topic: blog.main_topic,
      published_in: blog.published_in,
    })
    .eq("id", blog.id)
    .select()
    .single();
  if (error) {
    return null;
  }
  return data || null;
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
      published_in: blog.published_in,
    })
    .select()
    .single();
  if (error) {
    return null;
  }
  return data || null;
}
