import BlogPrincipalPublication from "@/components/blog/blog-principal-publication";
import BlogSecundaryArticle from "@/components/blog/blog-secundary-article";
import BlogTitle from "@/components/blog/blog-title";
import React from "react";

const BlogPage = () => {
  return (
    <section className="space-y-10">
      <BlogTitle />
      <BlogSecundaryArticle />
      <BlogPrincipalPublication />
    </section>
  );
};

export default BlogPage;
