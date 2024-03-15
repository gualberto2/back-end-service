import { redirect } from "next/navigation";

import { BlogForm } from "./components/blog-form";

const BlogPage = async ({ params }: { params: { storeId: string } }) => {
  //Check if store even exists, not: redirect to home page

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogForm />
      </div>
    </div>
  );
};

export default BlogPage;
