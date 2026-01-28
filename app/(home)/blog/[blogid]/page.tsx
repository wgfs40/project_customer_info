import BlogDetails from "@/components/blog/blog-details";

const BlogDetail = async ({ params }: { params: Promise<{ blogid?: string }> }) => {
  const { blogid } = await params;
  return (
    <div>
      <BlogDetails blogid={blogid!} />
    </div>
  );
};

export default BlogDetail;
