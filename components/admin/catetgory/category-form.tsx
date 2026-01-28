"use client";
import { registerCategory } from "@/actions/category-action";
import { Input } from "@/components/ui/input";
import { isNumeric } from "@/lib/utils";
import { Category } from "@/types/category";
import { type FormStateCategory } from "@/validations/form-state";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const INITIAL_FORM_STATE: FormStateCategory = {
  success: false,
  data: {},
  errors: null,
};

const CategoryForm = ({ category }: { category: Category | null }) => {
  const { pending } = useFormStatus();
  const [formState, formAction] = useActionState(registerCategory, INITIAL_FORM_STATE);

  const handleAction = async (formData: FormData) => {
    formAction(formData);
    formState.success && console.log("Category saved successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">
        {isNumeric(String(category?.id)) ? "Edit Category" : "Create Category"}
      </h1>
      <form className="space-y-4" action={handleAction}>
        <Input
          type="hidden"
          name="id"
          value={isNumeric(String(category?.id)) ? category?.id : ""}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            type="text"
            name="name"
            defaultValue={category?.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
        >
          {pending ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
