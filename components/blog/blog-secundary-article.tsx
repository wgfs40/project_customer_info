import { GetFeaturedBlogs } from "@/actions/blog-action";
import { FeaturedBlog } from "@/types/blog";
import BlogButtonView from "./blog-button-view";
import { sanitize } from "@/lib/sanitize";

const BlogSecundaryArticle = async () => {
  const getFeatureBlog = await GetFeaturedBlogs();
  const getFeatureBlogData = getFeatureBlog as FeaturedBlog[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getFeatureBlogData.map((article, index) => (
        <article
          key={index}
          className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
        >
          <div className="h-56 bg-gray-50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
            <div className="absolute top-6 left-6">
              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]`}
              >
                {article.blogs.title}
              </span>
            </div>
          </div>
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition leading-tight">
              {article.blogs.title}
            </h3>
            <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
              {sanitize(article.blogs.article_body)}
            </p>
            <p className="text-xs text-gray-500">
              Publicado: {article.blogs.published_in?.toString()}
            </p>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-end">
            <BlogButtonView blogid={article.blogs.id.toString()} />
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogSecundaryArticle;
