import { GetBlogById } from "@/actions/blog-action";
import { getCategories } from "@/actions/category-action";
import AdminBlogForm from "@/components/admin/admin-blog/admin-blog-form";
import { Blog } from "@/types/blog";

const CreateUpdateBlogPage = async ({
  params,
}: {
  params: Promise<{ blogid?: string }>;
}) => {
  const { blogid } = await params;
  let blog: Blog | null = null;
  const categories = await getCategories(1, "", 1000); // Obtener todas las categorías
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

  blog &&
    (blog.categories =
      categories.categories.find((cat) => cat.id === blog?.category_id) ||
      undefined);
  return (
    <div>
      <AdminBlogForm
        blogid={blogid || ""}
        blog={blog}
        categories={categories.categories}
      />
    </div>
  );
};

export default CreateUpdateBlogPage;
