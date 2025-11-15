const CreateUpdateBlogPage = async ({
  params,
}: {
  params: Promise<{ blogid?: string }>;
}) => {
  const { blogid } = await params;
  console.log("Blog ID:", blogid);
  // validar si blog id es numerico
  const isNumeric = (value: string) => /^\d+$/.test(value);
  if (blogid && !isNumeric(blogid)) {
    // Lógica para actualizar un blog existente
  } else if (blogid === "create") {
    // Lógica para crear un nuevo blog
  } else {
    // Manejar caso de ID inválido
    return <div>ID de blog inválido.</div>;
  }

  return (
    <div>
      {/* Formulario para crear o actualizar blog */}
      <h1>
        {blogid && isNumeric(blogid) ? "Actualizar Blog" : "Crear Nuevo Blog"}
      </h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            placeholder="Ingrese el título del blog"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <textarea
            placeholder="Ingrese el contenido del blog"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows={5}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tema
          </label>
          <input
            type="text"
            placeholder="Ingrese el tema del blog"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {blogid && isNumeric(blogid) ? "Actualizar Blog" : "Crear Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateUpdateBlogPage;
