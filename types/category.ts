export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export type CreateCategory = Omit<Category, "id" | "created_at">;
export type UpdateCategory = Omit<Category, "created_at">;
