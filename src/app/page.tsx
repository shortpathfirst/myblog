import InfiniteScrollingTech from "@/components/infiniteScrollingTech/infiniteScrollingTech";
import Contacts from "@/components/contact/contacts";
import TechStack from "@/components/techStack/techStack";
import BlogNews from "@/components/blogposts/blognews";
import techStackScroll from '@/content/techStackScroll.json'
import ServiceStack from "@/components/serviceStack/serviceStack";

export default function Home() {

  return (
    <div className="container">
      <BlogNews/>
      <ServiceStack />
      <TechStack />
      <InfiniteScrollingTech techStack={techStackScroll} />
      <Contacts />
    </div>
  );
}
