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
  const blogData = getBlogData.blogs as Blog[];
  const totalPages = getBlogData.totalBlogs;

  return (
    <div className="mt-6 flow-root space-y-6">
      <BlogPagination totalPages={totalPages} />
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
