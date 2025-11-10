import BlogPrincipalPublication from "@/components/blog/blog-principal-publication";
import BlogSearchText from "@/components/blog/blog-searh-text";
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
    <section className="space-y-10">
      <BlogTitle />
      <BlogSecundaryArticle />
      <BlogSearchText placeholder="Buscar en el blog..." />
      <Suspense
        key={query + currentPage}
        fallback={<div>Loading main blog publication...</div>}
      >
        <BlogPrincipalPublication query={query} currentPage={currentPage} />
      </Suspense>
    </section>
  );
};

export default BlogPage;
