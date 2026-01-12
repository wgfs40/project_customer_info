export interface Category {
  id: number | string;
  name: string;
  created_at: string;
}

export type RegisterCategory = Omit<Category, "id" | "created_at">;
export type UpdateCategory = Omit<Category, "created_at">;
