import { GetFeaturedBlogs } from "@/actions/blog-action";
import { FeaturedBlog } from "@/types/blog";
import BlogButtonView from "./blog-button-view";

const BlogSecundaryArticle = async () => {
  const getFeatureBlog = await GetFeaturedBlogs();
  const getFeatureBlogData = getFeatureBlog as FeaturedBlog[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {getFeatureBlogData.map((article, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
        >
          <h4 className={`font-bold text-lg text-action-text mb-2`}>
            {article.blogs.title}
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            {article.blogs.article_body}
          </p>
          <p className="text-xs text-gray-500">
            Publicado: {article.blogs.published_in?.toString()}
          </p>
          <div className="flex justify-end mt-4">
            <BlogButtonView blogid={article.blogs.id.toString()} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogSecundaryArticle;
