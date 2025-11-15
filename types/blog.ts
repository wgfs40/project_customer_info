export interface Blog {
  id: number;
  title: string;
  article_body: string;
  main_topic?: string;
  published_in?: Date;
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
