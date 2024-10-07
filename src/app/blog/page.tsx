import BlogPostCard from "@/ui/components/cards/BlogPostCard";
import PageContainer from "@/ui/components/page-container/PageContainer";
import Title from "@/ui/components/title/Title";
import styles from './blog.module.css'
import CardConteiner from "@/ui/components/cards/CardConteiner";
export default function Blog() {
  return (
    <PageContainer>
      <Title>Articles</Title>
      <CardConteiner>
        <BlogPostCard imageSrc={"/assets/images/article_2.webp"} title={"Creating a blog post"} href={"/"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_3.webp"} title={"Creating a blog post"} href={"/"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_1.webp"} title={"Creating a blog post"} href={"/"}></BlogPostCard>
        <BlogPostCard imageSrc={"/assets/images/article_4.webp"} title={"Creating a blog post"} href={"/"}></BlogPostCard>
      </CardConteiner>
    </PageContainer>
  );
}