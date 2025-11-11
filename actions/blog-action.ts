"use server";

import { createClient } from "@/lib/supabase/server";

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