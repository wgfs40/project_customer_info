import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

import { v4 as uuidv4 } from "uuid";

// proceso de subir archivos en supabase storage
export async function ProcessUploadedFile(
  bucketName: string,
  fileBody: File,
  filePath?: string
) {
  //obtejer la extension del archivo
  const fileName = fileBody.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${filePath ? filePath + "/" : ""}${uuidv4()}.${fileExtension}`;

  console.log("fileExtension", fileExtension);
  console.log("path", path);
  console.log("filename", fileName);
  console.log("contentType", fileBody.type);

  //validar si la extension es pdf
  if (fileExtension?.toLowerCase() === "pdf") {
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
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(
    fileExtension.toLowerCase()
  );

  //comprimir la imagen si es una imagen
  console.log("filebody type:", fileBody);
  if (isImage) {
    try {
      const compressedFile = await imageCompression(fileBody as File, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      console.log("Compressed file size:", compressedFile);

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

// obtener la url publica de un archivo en supabase storage
export async function GetPublicFileUrl(bucketName: string, filePath: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

  return { message: "Public file URL fetched successfully", data };
}

// eliminar un archivo en supabase storage
export async function DeleteFile(bucketName: string, filePath: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath]);
  if (error) {
    return { message: "Error deleting file" };
  }

  return { message: "File deleted successfully", data };
}
