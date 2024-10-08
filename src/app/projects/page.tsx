import BlogPostCard from "@/ui/components/cards/BlogPostCard";
import CardConteiner from "@/ui/components/cards/CardConteiner";
import PageContainer from "@/ui/components/page-container/PageContainer";
import Title from "@/ui/components/title/Title";

export default function Projects() {
    return (
    <PageContainer>
      <Title>Projects</Title>
      <CardConteiner>
        <BlogPostCard imageSrc={"/assets/images/article_1.webp"} title={"Creating a blog post"} href={"/projects/post1"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_2.webp"} title={"Creating a blog post"} href={"/projects/post2"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_3.webp"} title={"Creating a blog post"} href={"/projects/post3"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_4.webp"} title={"Creating a blog post"} href={"/projects/post4"}></BlogPostCard>
      </CardConteiner>
    </PageContainer>
  );
  }