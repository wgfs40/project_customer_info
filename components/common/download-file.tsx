"use client";
const DownloadFile = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="file"
        aria-label="descargar archivo"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Descargar Archivo
      </button>
    </div>
  );
};

export default DownloadFile;
