import { Blog } from "@/types/blog";
import BlogButtonView from "./blog-button-view";
import RichTextEditor from "../ui/rich-text-editor";

const BlogPrincipalPublicationItem = (blog: Blog) => {
  return (
    <>
      <header className="mb-6">
        <h1 className=" font-bold text-orange-500 mb-3">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Fecha creación: {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </header>
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
        <RichTextEditor
          content={blog.article_body.substring(0, 200)}
          isVisibleMenuBar={false}
          isBorder={false}
        />
      </section>
      <div className="flex justify-end">
        <BlogButtonView blogid={blog.id.toString()} />
      </div>
    </>
  );
};

export default BlogPrincipalPublicationItem;
