export interface ImageFile {
  id: string;
  name: string;
  image_path: string;
  mime_type: string;
  created_at: string;
}

export type NewImageFile = Omit<ImageFile, "id" | "created_at">;
export type UpdateImageFile = Partial<Omit<ImageFile, "created_at">> & {
  id: string;
};