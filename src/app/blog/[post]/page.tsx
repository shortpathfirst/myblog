import { getPostBySlug } from "@/lib/api";
import PageContainer from "@/ui/components/page-container/PageContainer";


export default function Post({ params }: Params) {

  const POST = getPostBySlug(params.post);

  return (
    <>
      <div style={{ "borderTop": "3px solid #3d3d3d", "width": "100%", "marginTop": "2rem", "marginBottom": "2rem" }}></div>

      <h1 style={{ "fontSize": "50px", "color": "#222222", "letterSpacing": "-0.1rem" }}>An Introduction to Altair</h1>
      <p style={{ "fontSize": "17px", "color": "#888888","marginBottom":"25px" }}>March 23, 2018</p>
      
      <div  style={{ "display":"flex","flexDirection":"column","gap":"2.5rem",  "fontSize": "18px", "lineHeight":"1.7"}}>
        <p>
          Dolor excepteur voluptate in eiusmod fugiat minim aliquip amet id quis excepteur eiusmod dolore. Sint qui esse nostrud Lorem laborum qui est ut irure esse esse qui magna nisi. Non labore nisi nostrud tempor aute officia incididunt consectetur ex. Minim cupidatat deserunt id incididunt eu magna duis amet elit pariatur id.
        </p><p>
          Adipisicing occaecat irure tempor est ipsum duis labore voluptate. Magna labore ea laboris esse labore enim aute. Ullamco proident veniam labore Lorem ex proident esse commodo sint aute mollit. Commodo proident culpa exercitation fugiat occaecat et officia.
        </p>
        Ad ex fugiat aliquip et esse nostrud esse exercitation proident. Qui proident aute elit veniam dolore reprehenderit nisi ullamco irure. Adipisicing nisi est irure consequat ex. Consequat velit ad laboris magna anim laborum esse ipsum dolore minim eiusmod. Aliqua amet enim dolor anim sit nisi Lorem. In do commodo proident deserunt veniam ex eu sit consequat sint non laborum. Irure nostrud reprehenderit velit ad commodo minim pariatur ipsum exercitation mollit.
        <p></p>
      </div>
      <article>

        {/* {POST} */}
      </article>
    </>

  );
}

type Params = {
  params: {
    post: string;
  };
};