import { PostData } from "@/interfaces/post";
import { getAllProject } from "@/lib/api";
import BlogPostCard from "@/ui/components/cards/BlogPostCard";
import CardConteiner from "@/ui/components/cards/CardConteiner";
import Title from "@/ui/components/title/Title";

export default function Projects() {

  const postsData: PostData[] = getAllProject();

  return (
    <>
      <Title>Projects</Title>
      <CardConteiner>
        {postsData.map((p, i) =>
          <BlogPostCard key={`${i}`} imageSrc={p.imageSrc} title={p.title} href={`${p.urlTitle}`} description={p.description}></BlogPostCard>
        )}
      </CardConteiner>
    </>
  );
}