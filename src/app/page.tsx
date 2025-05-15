import InfiniteScrollingTech from "@/components/infiniteScrollingTech/infiniteScrollingTech";
import Contacts from "@/components/contact/contacts";
import TechStack from "@/components/techStack/techStack";
import BlogNews from "@/components/blogposts/blognews";

export default function Home() {

  return (
    <div className="container">
      <BlogNews></BlogNews>
      <TechStack/>
      <InfiniteScrollingTech />
      <Contacts />
    </div>
  );
}
