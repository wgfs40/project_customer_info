export type FormState = {
  success: boolean;
  message?: string;
  data?: {
    identifier?: string;
    name?: string;
    email?: string;
    message?: string;
  };
  errors?: {
    identifier?: string[];
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
};
