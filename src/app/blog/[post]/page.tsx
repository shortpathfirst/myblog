import { getPostBySlug } from "@/lib/api";
import Divider from "@/ui/components/divider/Divider";

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