import BlogPrincipalPublication from "@/components/blog/blog-principal-publication";
import BlogSecundaryArticle from "@/components/blog/blog-secundary-article";
import BlogTitle from "@/components/blog/blog-title";
import { Suspense } from "react";

const BlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const query = params.query || "";

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <BlogTitle />
      <BlogSecundaryArticle />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense key={query + currentPage} fallback={<div>Loading main blog publication...</div>}>
          <BlogPrincipalPublication query={query} currentPage={currentPage} />
        </Suspense>
      </main>
    </div>
  );
};

export default BlogPage;
