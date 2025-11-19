import { GetBlogById } from "@/actions/blog-action";
import { Blog } from "@/types/blog";

const CreateUpdateBlogPage = async ({
  params,
}: {
  params: Promise<{ blogid?: string }>;
}) => {
  const { blogid } = await params;
  let blog: Blog | null = null;
  // validar si blog id es numerico
  const isNumeric = (value: string) => /^\d+$/.test(value);
  if (blogid && isNumeric(blogid)) {
    // Lógica para actualizar un blog existente
    const getBlogById = (await GetBlogById(blogid || "")) as Blog | null;
    if (!getBlogById) {
      return <div>Blog no encontrado.</div>;
    }

    blog = getBlogById;
  } else if (blogid === "create") {
    // Lógica para crear un nuevo blog
    console.log("Crear un nuevo blog");
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
            defaultValue={blog ? blog.title : ""}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <textarea
            placeholder="Ingrese el contenido del blog"
            defaultValue={blog ? blog.article_body : ""}
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
            defaultValue={blog ? blog.main_topic : ""}
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
