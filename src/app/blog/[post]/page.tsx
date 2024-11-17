import { getPostBySlug } from "@/lib/api";
import Divider from "@/ui/components/divider/Divider";
import { getAllPost } from "@/lib/api";

export default function Post({ params }: Params) {

  const POST = getPostBySlug(params.post);

  return (
    <>
      <Divider />
      <article>
        {POST}
      </article>
    </>

  );
}

type Params = {
  params: {
    post: string;
  };
};


// Fetching dynamic paths
export async function generateStaticParams() {
  const posts = getAllPost();
  return posts.map(post => ({
    post: post.urlTitle,
  }));
}
