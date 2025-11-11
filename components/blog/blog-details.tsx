import { GetBlogById } from "@/actions/blog-action";
import { Blog } from "@/types/blog";

const BlogDetails = async ({ blogid }: { blogid: string }) => {
  const blogDetailData = (await GetBlogById(blogid)) as Blog | null;

  if (!blogDetailData) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {blogDetailData ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-blue-500">
          <h1>{blogDetailData.title}</h1>
          <p className="text-gray-700 leading-relaxed pt-5">
            {blogDetailData.article_body}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetails;
