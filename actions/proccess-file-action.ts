import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

import { v4 as uuidv4 } from "uuid";

/**
 * Procesa y sube un archivo a Supabase Storage
 * Comprime automáticamente imágenes mayores a 1MB (PNG, JPG, JPEG, WebP)
 * Soporta archivos PDF sin compresión
 * @param bucketName - Nombre del bucket en Supabase Storage
 * @param fileBody - Archivo a subir
 * @param filePath - Ruta opcional dentro del bucket (ej: "avatars")
 * @returns Objeto con imageUrl (URL pública del archivo) y message de estado
 * @example
 * const file = new File(['...'], 'photo.jpg', { type: 'image/jpeg' });
 * const { imageUrl } = await ProcessUploadedFile('public', file, 'uploads');
 */
export async function ProcessUploadedFile(bucketName: string, fileBody: File, filePath?: string) {
  //obtejer la extension del archivo
  const fileName = fileBody.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${filePath ? filePath + "/" : ""}${uuidv4()}.${fileExtension}`;

  //validar si la extension es pdf
  if (fileExtension?.toLowerCase() === "pdf" && fileBody.type === "application/pdf") {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, fileBody, { upsert: false, contentType: fileBody.type });
    if (error) {
      return { imageUrl: "", message: `Error uploading file: ${error}` };
    }

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`;
    return { imageUrl, message: "File uploaded successfully" };
  }

  //validar si la extension es de png, jpg, jpeg, gif
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(fileExtension.toLowerCase());

  //comprimir la imagen si es una imagen
  if (isImage && fileBody instanceof File && fileBody.size / 1024 / 1024 > 1) {
    try {
      const compressedFile = await imageCompression(fileBody as File, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      fileBody = new File([compressedFile], fileBody.name, {
        type: fileBody.type,
      });
      console.log("Compressed file:", fileBody);
    } catch (error) {
      console.error("Error compressing image:", error);
      return { imageUrl: "", message: "Error compressing image" };
    }
  }

  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, fileBody, { upsert: false, contentType: fileBody.type });
  if (error) {
    return { imageUrl: "", message: `Error uploading file: ${error}` };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${data.path}`;
  return { imageUrl, message: "File uploaded successfully" };
}

/**
 * Obtiene la URL pública de un archivo en Supabase Storage
 * @param bucketName - Nombre del bucket
 * @param filePath - Ruta del archivo dentro del bucket
 * @returns Objeto con message y data (URL pública)
 * @example
 * const { data } = await GetPublicFileUrl('public', 'uploads/photo.jpg');
 */
export async function GetPublicFileUrl(bucketName: string, filePath: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return { message: "Public file URL fetched successfully", data };
}

/**
 * Elimina un archivo de Supabase Storage
 * @param bucketName - Nombre del bucket
 * @param filePath - Ruta del archivo a eliminar
 * @returns Objeto con message de estado y data
 * @example
 * await DeleteFile('public', 'uploads/photo.jpg');
 */
export async function DeleteFile(bucketName: string, filePath: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from(bucketName).remove([filePath]);
  if (error) {
    return { message: "Error deleting file" };
  }

  return { message: "File deleted successfully", data };
}
