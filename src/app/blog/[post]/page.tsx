import { getPostBySlug } from "@/lib/api";
import Divider from "@/ui/components/divider/Divider";
import PageContainer from "@/ui/components/page-container/PageContainer";
import PostBody from "@/ui/components/post/post-body";
import PostHeader from "@/ui/components/post/post-header";
import { AnchorTitle } from "@/ui/components/title/AnchorTitle";


export default function Post({ params }: Params) {

  const POST = getPostBySlug(params.post);

  return (
    <>
      <Divider />
      <article>
        <PostHeader
          title="An Introduction to Altair"
          date="March 23, 2018"
        />
        <PostBody>

          <p>
            Dolor excepteur voluptate in eiusmod fugiat minim aliquip amet id quis excepteur eiusmod dolore. Sint qui esse nostrud Lorem laborum qui est ut irure esse esse qui magna nisi. Non labore nisi nostrud tempor aute officia incididunt consectetur ex. Minim cupidatat deserunt id incididunt eu magna duis amet elit pariatur id.
          </p>
          <p>
            Adipisicing occaecat irure tempor est ipsum duis labore voluptate. Magna labore ea laboris esse labore enim aute. Ullamco proident veniam labore Lorem ex proident esse commodo sint aute mollit. Commodo proident culpa exercitation fugiat occaecat et officia.
          </p>
        <AnchorTitle>This is title</AnchorTitle>
          <p>
            Ad ex fugiat aliquip et esse nostrud esse exercitation proident. Qui proident aute elit veniam dolore reprehenderit nisi ullamco irure. Adipisicing nisi est irure consequat ex. Consequat velit ad laboris magna anim laborum esse ipsum dolore minim eiusmod. Aliqua amet enim dolor anim sit nisi Lorem. In do commodo proident deserunt veniam ex eu sit consequat sint non laborum. Irure nostrud reprehenderit velit ad commodo minim pariatur ipsum exercitation mollit.
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laudantium, voluptate inventore voluptas corrupti sequi enim consequuntur reprehenderit aliquid! Nostrum suscipit quibusdam possimus odio eligendi asperiores numquam? Numquam, adipisci corrupti?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure vitae corrupti molestias fugit, numquam facilis possimus aperiam nisi illo adipisci quaerat iusto reiciendis laboriosam quo dolorem harum esse ipsa ipsum!</p>
          <AnchorTitle>This Another</AnchorTitle>
          <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias aspernatur architecto tempora at nulla quisquam minus cumque similique mollitia eaque rem molestiae voluptatibus repellat, vel quaerat ut suscipit, officiis et.</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis deleniti vitae adipisci non sint. Accusantium itaque, animi dolore ipsa quisquam, fugiat ut facilis quo dolor sapiente temporibus voluptate ipsam id!</p>
          <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque numquam sequi esse quo unde nesciunt accusamus id dicta? Sequi temporibus laborum ipsam fugit expedita illum nobis optio sint commodi ducimus?</span><span>Molestiae magni deleniti non porro natus doloribus minus alias provident exercitationem, at laborum sint saepe, assumenda amet dolore? Rem vero nobis fugit magni architecto totam corporis animi enim excepturi id?</span><span>Voluptatem cupiditate ipsam, numquam repellat natus sed quos a aperiam qui aspernatur laboriosam ducimus laudantium hic saepe, iusto suscipit officia minus iste tenetur fuga tempora. Odit alias libero rem enim!</span><span>Velit perferendis, sint fuga totam id quaerat, mollitia quo nisi labore debitis fugiat deserunt cumque excepturi facilis quos, tempore unde hic nesciunt? Voluptates perferendis accusantium eius ullam eum sint doloremque.</span><span>Accusantium recusandae praesentium accusamus doloribus, facilis asperiores nam sit fugiat nostrum aspernatur tenetur dolor quibusdam, quo, voluptatum ea enim quas reiciendis qui. Explicabo qui, optio dolores aut deleniti repellat. Exercitationem!</span><span>Eaque ducimus aperiam ab perspiciatis laboriosam laborum officiis qui amet. Deleniti adipisci officia voluptates inventore dolorum quasi similique beatae corporis aperiam quae eum, libero, quis accusantium odit iusto, hic alias!</span><span>Animi temporibus est vitae consectetur esse totam non iste eum at atque repudiandae, omnis accusantium accusamus odit. Tempora cumque, mollitia quasi ratione omnis explicabo maiores voluptatibus repellat illo ab cupiditate?</span></p>
          
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus numquam, molestiae laudantium tenetur odio aliquam suscipit pariatur, praesentium, cum velit totam deserunt. Nihil dolor repellendus unde repellat doloremque laboriosam inventore.</p>
          <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et rem amet ea similique reprehenderit eius tenetur, magnam error eligendi at architecto aut quis explicabo doloremque qui ipsa vitae voluptates perspiciatis.</span><span>Enim, placeat eum. Ab velit laborum ex exercitationem consequuntur quis assumenda aliquid quae voluptas quod laboriosam earum voluptates facere ratione, reiciendis vel, et illum dolor nesciunt molestiae odit neque pariatur.</span><span>Aperiam aliquid non enim adipisci eaque odit unde, minus rerum dolorum obcaecati corporis maxime eum id voluptates ipsa, dolores labore deserunt numquam magnam ipsam repudiandae! Possimus sunt quidem quibusdam repellendus.</span><span>Natus laboriosam quasi officiis repudiandae sed corrupti quo ducimus. Animi a non dicta vel aliquam tenetur dolor voluptatibus nostrum, recusandae nobis eum eveniet consequuntur aspernatur cum iusto quae hic dolorem.</span><span>Deleniti tempora accusantium reiciendis eligendi ullam, culpa natus accusamus consequatur facilis. Accusantium iste dolore maxime. Nihil autem suscipit quae in quaerat dignissimos architecto. Consequuntur quidem excepturi repudiandae inventore quasi quos.</span><span>Molestias dicta consectetur, aperiam voluptatem pariatur fugit nisi, animi itaque assumenda nemo numquam asperiores nihil et a corporis exercitationem dignissimos fuga sapiente error incidunt hic. Ipsum voluptatum in incidunt autem.</span><span>Maiores quo quidem, corrupti delectus maxime vitae facere? Quidem nam nostrum officiis soluta porro officia doloribus, accusamus autem! Sunt iure illo porro impedit hic. Eum, fuga. Sunt suscipit aut quia.</span></p>

        </PostBody>

      </article>
    </>

  );
}

type Params = {
  params: {
    post: string;
  };
};