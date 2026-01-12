import { omit } from "zod/mini";

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export type newContact = Omit<Contact, "id" | "created_at">;
export type UpdateContact = Partial<Omit<Contact, "created_at">> & {
  id: string;
};
