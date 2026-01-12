import { getCategoryById } from "@/actions/category-action";
import CategoryForm from "@/components/admin/catetgory/category-form";
import { Category } from "@/types/category";

const CreateUpdateCategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryid?: string }>;
}) => {
  const { categoryid } = await params;
  console.log("categoryid", categoryid);
  let category: Category | null = null;
  // validar si category id es numerico
  const isNumeric = (value: string) => /^\d+$/.test(value);
  if (categoryid && isNumeric(categoryid)) {
    // Lógica para actualizar una categoría existente
    // Aquí deberías llamar a una función para obtener la categoría por ID
    const getcategoryById = await getCategoryById(categoryid);
    category = getcategoryById as Category;
  } else if (categoryid === "create") {
    // Lógica para crear una nueva categoría
    console.log("Crear una nueva categoría");
  } else {
    // Manejar caso de ID inválido
    return <div>ID de categoría inválido.</div>;
  }

  return (
    <div>
      <CategoryForm category={category} />{" "}
    </div>
  );
};

export default CreateUpdateCategoryPage;
