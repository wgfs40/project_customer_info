/**
 * Gestión de archivos de imagen en la base de datos
 * Operaciones CRUD para registros de imageFiles en Supabase
 */
"use server";
import { ProcessUploadedFile } from "@/actions/proccess-file-action";
import { createClient } from "@/lib/supabase/client";
import { NewImageFile, UpdateImageFile } from "@/types/image-files";

/**
 * Obtiene registros de archivos de imagen por ID
 * @param id - ID del archivo de imagen
 * @returns Array de registros de imageFiles
 * @example
 * const images = await getImageFilesById('123');
 */
export async function getImageFilesById(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("imageFiles").select("*").eq("id", id);
  if (error) {
    console.error("Error fetching image files:", error);
    return [];
  }
  return data;
}
/**
 * Inserta un nuevo registro de archivo de imagen en la base de datos
 * @param formData - Datos del formulario con campos: name, image_path, mime_type
 * @returns Objeto con success (boolean) y data o error
 * @example
 * const formData = new FormData();
 * formData.append('name', 'photo');
 * formData.append('image_path', 'uploads/photo.jpg');
 * const result = await insertImageFiles(formData);
 */
export async function insertImageFiles(formData: FormData) {
  const supabase = createClient();

  const newImageFile: NewImageFile = {
    name: formData.get("name") as string,
    image_path: formData.get("image_path") as string,
    mime_type: formData.get("mime_type") as string,
  };

  const { data, error } = await supabase.from("imageFiles").insert(newImageFile);
  if (error) {
    console.error("Error inserting image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}

/**
 * Actualiza un registro de archivo de imagen existente
 * @param id - ID del archivo de imagen a actualizar
 * @param formData - Datos del formulario con campos opcionales: name, image_path, mime_type
 * @returns Objeto con success (boolean) y data o error
 * @example
 * const formData = new FormData();
 * formData.append('name', 'photo-updated');
 * const result = await updateImageFiles('123', formData);
 */
export async function updateImageFiles(id: string, formData: FormData) {
  const supabase = createClient();
  const updateData: UpdateImageFile = {
    id,
    name: formData.get("name") as string | undefined,
    /**
     * Elimina un registro de archivo de imagen de la base de datos
     * @param id - ID del archivo de imagen a eliminar
     * @returns Objeto con success (boolean) y data o error
     * @example
     * const result = await deleteImageFiles('123');
     */
    image_path: formData.get("image_path") as string | undefined,
    mime_type: formData.get("mime_type") as string | undefined,
  };
  const { data, error } = await supabase.from("imageFiles").update(updateData).eq("id", id);
  if (error) {
    console.error("Error updating image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}
export async function deleteImageFiles(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("imageFiles").delete().eq("id", id);
  if (error) {
    console.error("Error deleting image files:", error);
    return { success: false, error };
  }
  return { success: true, data };
}
