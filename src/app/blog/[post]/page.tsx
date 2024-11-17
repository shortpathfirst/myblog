import { getPostBySlug } from "@/lib/api";
import Divider from "@/ui/components/divider/Divider";
import { getAllPost } from "@/lib/api";
import Title from "@/ui/components/title/Title";

export default async function Post({ params }: Params) {

  const POST = await getPostBySlug(params.post);

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
