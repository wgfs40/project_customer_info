import { GetBlogById } from "@/actions/blog-action";
import { Blog } from "@/types/blog";
import { Calendar } from "lucide-react";
import Link from "next/link";

const BlogDetails = async ({ blogid }: { blogid: string }) => {
  const blogDetailData = (await GetBlogById(blogid)) as Blog | null;

  if (!blogDetailData) {
    return <p>Blog not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5">
      {blogDetailData ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl border-l-8 border-pink-500">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-500 text-xs font-medium">
              <Calendar size={14} />
              {blogDetailData.published_in?.toString()}
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
            {blogDetailData.title}
          </h1>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-lg">
            <p className="text-gray-700 leading-relaxed pt-5">
              {blogDetailData.article_body}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link
        href="/blog"
        className="text-pink-500 hover:underline mt-6 inline-block"
      >
        &larr; Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetails;
