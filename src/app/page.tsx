import InfiniteScrollingTech from "@/components/infiniteScrollingTech/infiniteScrollingTech";
import Contacts from "@/components/contact/contacts";
import TechStackSection from "@/components/techStack/techStackSection";
import BlogNews from "@/components/blogposts/blognews";
import ExpertiseSection from "@/components/expertise/expertiseSection";


export default function Home() {

  return (
    <div className="container">
      <BlogNews />
      <ExpertiseSection />
      <TechStackSection />
      <InfiniteScrollingTech/>
      <Contacts />
    </div>
  );
}
