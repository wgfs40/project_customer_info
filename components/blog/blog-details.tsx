import { GetBlogById } from "@/actions/blog-action";
import { Blog } from "@/types/blog";
import { Calendar } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "../ui/rich-text-editor";

const BlogDetails = async ({ blogid }: { blogid: string }) => {
  const blogDetailData = await GetBlogById(blogid);

  if (!blogDetailData) {
    return <p>Blog not found.</p>;
  }

  const blogDetail = blogDetailData.data as Blog;

  return (
    // agregar dos columna una de los subtitulos y otra del contenido
    <div className="grid grid-cols-12 gap-8">
      {blogDetailData ? (
        <>
          <div className="col-span-3 p-8 rounded-xl shadow-2xl border-l-8 ">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Subtítulos</h2>
            <ul className="space-y-2">
              <li className="text-slate-700">Subtítulo 1</li>
              <li className="text-slate-700">Subtítulo 2</li>
              <li className="text-slate-700">Subtítulo 3</li>
            </ul>
          </div>
          <div className="col-span-9 p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-500 text-xs font-medium">
                <Calendar size={14} />
                {blogDetail.published_in?.toString()}
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
              {blogDetail.title}
            </h1>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6 text-lg">
              <RichTextEditor
                content={blogDetail.article_body}
                isVisibleMenuBar={false}
                isBorder={false}
              />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <Link href="/blog" className="text-pink-500 hover:underline mt-6 inline-block">
        &larr; Back to Blog
      </Link>
    </div>
  );
};

export default BlogDetails;
