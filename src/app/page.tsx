import InfiniteScrollingTech from "@/components/infiniteScrollingTech/infiniteScrollingTech";
import Contacts from "@/components/contact/contacts";
import TechStack from "@/components/techStack/techStack";


export default function Home() {
  return (
    <div className="container">
      <TechStack></TechStack>
      <InfiniteScrollingTech/>
      <Contacts/>
    </div>
  );
}
