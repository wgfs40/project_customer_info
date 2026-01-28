"use client";

import { registerBlog } from "@/actions/blog-action";
import FormError from "@/components/common/form-error";
import { isNumeric } from "@/lib/utils";
import { Blog } from "@/types/blog";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { type FormStateBlog } from "@/validations/form-state";
import { Category } from "@/types/category";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { sanitize } from "@/lib/sanitize";

const INITIAL_FORM_STATE: FormStateBlog = {
  success: false,
  message: "",
  data: {},
  errors: {},
};

const AdminBlogForm = ({
  blogid,
  blog,
  categories,
}: {
  blogid: string;
  blog: Blog | null;
  categories: Category[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [formState, formAction] = useActionState(registerBlog, INITIAL_FORM_STATE);

  const [editorContent, setEditorContent] = useState(blog ? blog.article_body : "");

  const handleAction = async (formData: FormData) => {
    formData.set("article_body", sanitize(editorContent));
    formAction(formData);
    formState.success && toast.success("¡Blog guardado con éxito!");
  };

  return (
    <div>
      {/* Formulario para crear o actualizar blog */}
      <h1>{blogid && isNumeric(blogid) ? "Actualizar Blog" : "Crear Nuevo Blog"}</h1>
      <form className="space-y-4" action={handleAction} ref={formRef}>
        {/* agregar un type hidden para el id */}
        <input name="id" type="hidden" value={blogid} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            placeholder="Ingrese el título del blog"
            defaultValue={blog ? blog.title : ""}
            name="title"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <FormError error={formState.errors?.title} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contenido</label>
          <RichTextEditor
            content={editorContent}
            onChange={setEditorContent}
            isBorder={true}
            isVisibleMenuBar={true}
          />
          <FormError error={formState.errors?.article_body} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tema</label>
          <select
            title="categorias"
            name="categoryid"
            defaultValue={blog && blog.category_id ? blog.category_id : ""}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {categories
              ? categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              : null}
            <option value="">Seleccione una categoría</option>
          </select>
          <FormError error={formState.errors?.categoryid} />
          <input type="hidden" name="main_topic" value="General" />
        </div>
        <div>
          <label htmlFor="published_in" className="block text-sm font-medium text-gray-700">
            Fecha de Publicación
          </label>
          <input
            id="published_in"
            type="date"
            defaultValue={
              blog && blog.published_in
                ? new Date(blog.published_in).toISOString().split("T")[0]
                : ""
            }
            name="published_in"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <FormError error={formState.errors?.published_in} />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {blogid && isNumeric(blogid)
            ? pending
              ? "Actualizando Blog"
              : "Actualizar Blog"
            : pending
              ? "Creando Blog"
              : "Crear Blog"}
        </button>
      </form>
    </div>
  );
};

export default AdminBlogForm;
