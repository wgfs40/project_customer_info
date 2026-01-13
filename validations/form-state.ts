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

export type FormStateBlog = {
  success: boolean;
  message?: string;
  data?: {
    id?: number;
    title?: string;
    article_body?: string;
    main_topic?: string;
    categoryid?: string;
    published_in?: string;
  };
  errors?: {
    title?: string[];
    article_body?: string[];
    main_topic?: string[];
    categoryid?: string[];
    published_in?: string[];
  } | null;
};

export type FormStateCategory = {
  success: boolean;
  message?: string;
  data?: {
    id?: number;
    name?: string;
  };
  errors?: {
    name?: string[];
  } | null;
};
