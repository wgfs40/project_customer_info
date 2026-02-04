import { GetBlogs } from "@/actions/blog-action";
import BlogPrincipalPublicationItem from "./blog-principal-publication-item";
import { Blog } from "@/types/blog";
import BlogPagination from "./blog-pagination";

const BlogPrincipalPublication = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const getBlogData = await GetBlogs(currentPage, query, 10);
  const blogData = (getBlogData.data as { totalBlogs: number; blogs: Blog[] }).blogs;
  const totalPages = (getBlogData.data as { totalBlogs: number; blogs: Blog[] }).totalBlogs;

  return (
    <div className="mt-6 flow-root space-y-6">
      <BlogPagination totalPages={totalPages} />
      {totalPages === 0 && <p className="text-center text-gray-500">No blogs available.</p>}
      {blogData.length > 0 &&
        blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-orange-500"
          >
            <BlogPrincipalPublicationItem key={blog.id} {...blog} />
          </div>
        ))}
    </div>
  );
};

export default BlogPrincipalPublication;
