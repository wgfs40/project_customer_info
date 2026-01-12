export interface Blog {
  id: number;
  title: string;
  article_body: string;
  main_topic?: string;
  categoryid?: number;
  published_in?: Date | string | null;
  created_at: Date;
}

export interface FeaturedBlog {
  id: number;
  blog_id: number;
  order: number;
  active: boolean;
  blogs: Blog;
}

export type CreateBlog = Omit<Blog, "id" | "created_at">;
export type UpdateBlog = Partial<Omit<Blog, "id" | "created_at">> & {
  id: number;
};
