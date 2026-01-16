"use client";

import { ProcessUploadedFile } from "@/actions/proccess-file-action";
import { convertBlobUrlToFile } from "@/lib/utils";
import { useRef, useState, useTransition } from "react";

const UploadFile = () => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Aquí puedes manejar los archivos seleccionados
      const fileArray = Array.from(files);
      const newFileNames = fileArray.map((file) => URL.createObjectURL(file));
      console.log("Archivos seleccionados:", newFileNames);

      setFileUrls([...fileUrls, ...newFileNames]);
    }
  };

  const handleClickUpLoad = async () => {
    startTransition(async () => {
      // Lógica para subir los archivos al servidor
      // Puedes usar fetch o cualquier otra librería para manejar la subida
      let urls = [];

      for (const url of fileUrls) {
        const imageFile = await convertBlobUrlToFile(url);
        const { imageUrl, message } = await ProcessUploadedFile(
          "dosis-files",
          imageFile
        );

        if (message !== "File uploaded successfully") {
          continue;
        }

        urls.push(imageUrl);
      }
      setFileUrls([]);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="file"
        aria-label="cargar archivo"
        hidden
        multiple
        ref={imageInputRef}
        onChange={handleFileChange}
      />
      <div className="mt-4">
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => imageInputRef.current?.click()}
          disabled={isPending}
        >
          Seleccionar Archivo
        </button>
        <p className="mt-2 text-gray-700">
          Archivos seleccionados: {fileUrls.length}
        </p>
        Archivos subidos:
        <ul className="list-disc list-inside">
          {fileUrls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
        <p className="mt-2 text-gray-700">
          <label className="ml-2 text-sm text-gray-600">
            (Se permiten múltiples archivos)
          </label>
          <label className="ml-2 text-sm text-gray-600 block mt-1">
            Formatos permitidos: jpg, png, pdf, docx
          </label>
        </p>
      </div>
      <div className="mt-4"></div>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isPending}
        onClick={handleClickUpLoad}
      >
        {isPending ? "Subiendo..." : "Subir Archivos"}
      </button>
    </div>
  );
};

export default UploadFile;
