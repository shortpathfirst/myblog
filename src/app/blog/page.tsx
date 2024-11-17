import BlogPostCard from "@/ui/components/cards/BlogPostCard";
import Title from "@/ui/components/title/Title";
import CardConteiner from "@/ui/components/cards/CardConteiner";
import { getAllPost } from "@/lib/api";
import { PostData } from "@/interfaces/post";


export default function Blog() {

  const postsData:PostData[] = getAllPost();

  return (
    <>
      <Title>Articles</Title>
      <CardConteiner>
        {postsData.map((p,i)=>
          <BlogPostCard key={`${i}`} imageSrc={p.imageSrc} title={p.title} href={`/blog/${p.urlTitle}`} description={p.description}></BlogPostCard>
        )}
      </CardConteiner>
    </>
  );
}
