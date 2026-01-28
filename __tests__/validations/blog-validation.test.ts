// Test for the blog validation functions
import { Blog } from "@/types/blog";
import { BlogFormSchema } from "@/validations/blog-validation";

describe("Blog Validation", () => {
  it("should validate a correct blog post", () => {
    const blogPost: Blog = {
      id: 1,
      title: "My Blog Post",
      article_body: "This is the content of my blog post.",
      main_topic: "Technology",
      published_in: new Date(),
      created_at: new Date(),
    };

    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.title).toBe("My Blog Post");
      expect(result.data.article_body).toBe("This is the content of my blog post.");
      expect(result.data.main_topic).toBe("Technology");
    }
  });
  it("should invalidate a blog post with missing title", () => {
    const blogPost = {
      article_body: "This is the content of my blog post.",
      main_topic: "Technology",
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });
  it("should invalidate a blog post with empty content", () => {
    const blogPost = {
      title: "My Blog Post",
      article_body: "",
      main_topic: "Technology",
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });

  it("should invalidate a blog post with missing main_topic", () => {
    const blogPost = {
      title: "My Blog Post",
      article_body: "This is the content of my blog post.",
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });

  it("should reject non-string title", () => {
    const blogPost = {
      title: 12345,
      article_body: "This is the content of my blog post.",
      main_topic: "Technology",
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });

  it("should reject non-string article_body", () => {
    const blogPost = {
      title: "My Blog Post",
      article_body: 67890,
      main_topic: "Technology",
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });

  it("should reject non-string main_topic", () => {
    const blogPost = {
      title: "My Blog Post",
      article_body: "This is the content of my blog post.",
      main_topic: 12345,
    };
    const result = BlogFormSchema.safeParse(blogPost);
    expect(result.success).toBe(false);
  });
});
