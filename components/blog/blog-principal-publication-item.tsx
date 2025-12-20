import { Blog } from "@/types/blog";
import BlogButtonView from "./blog-button-view";

const BlogPrincipalPublicationItem = (blog: Blog) => {
  return (
    <>
      <header className="mb-6">
        <h3 className="text-2xl font-bold text-pink-500 mb-3">
          Título: {blog.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Fecha creación: {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </header>
      <section className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
        {/* <h3 className="text-xl font-semibold text-accent-text mb-3">
          <p className={`font-semibold  mb-2`}>
            Comentario (Cuerpo del Artículo):
          </p>
        </h3> */}
        <p className="text-gray-700 leading-relaxed">
          {blog.article_body.substring(0, 200)}...
        </p>
      </section>
      <div className="flex justify-end">
        <BlogButtonView blogid={blog.id.toString()} />
      </div>
    </>
  );
};

export default BlogPrincipalPublicationItem;
