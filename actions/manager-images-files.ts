"use server";
import { ProcessUploadedFile } from "@/actions/proccess-file-action";
import { createClient } from "@/lib/supabase/client";
import { NewImageFile, UpdateImageFile } from "@/types/image-files";

export async function getImageFilesById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("imageFiles")
    .select("*")
    .eq("id", id);
  if (error) {
    console.error("Error fetching image files:", error);
    return [];
  }
  return data;
}
export async function insertImageFiles(formData: FormData) {
  const supabase = createClient();

  const newImageFile: NewImageFile = {
    name: formData.get("name") as string,
    image_path: formData.get("image_path") as string,
    mime_type: formData.get("mime_type") as string,
  };

  const { data, error } = await supabase
    .from("imageFiles")
    .insert(newImageFile);
  if (error) {
    console.error("Error inserting image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

export async function updateImageFiles(id: string, formData: FormData) {
  const supabase = createClient();
  const updateData: UpdateImageFile = {
    id,
    name: formData.get("name") as string | undefined,
    image_path: formData.get("image_path") as string | undefined,
    mime_type: formData.get("mime_type") as string | undefined,
  };
  const { data, error } = await supabase
    .from("imageFiles")
    .update(updateData)
    .eq("id", id);
  if (error) {
    console.error("Error updating image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}
export async function deleteImageFiles(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("imageFiles")
    .delete()
    .eq("id", id);
  if (error) {
    console.error("Error deleting image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}
