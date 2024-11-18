import PostBody from "@/ui/components/post/post-body";
import PostHeader from "@/ui/components/post/post-header";
import React from "react";
import VisualizationBigData from "./post2/VisualizationBigData";
import ModalImage from "@/ui/components/modal/ModalImage";
import SyntaxHighlightComp from "./post2/SyntaxHighlightComp";
import ImageHoverCard from "@/ui/components/ImageHoverCard/ImageHoverCard";
import ImageHoverContent from "@/ui/components/ImageHoverCard/ImageHoverContent";
import NoteBlock from "@/ui/components/noteBlock/NoteBlock";
import config from "../../next.config.mjs";

export default function Post2() {
  return (
    <React.Fragment>
      <PostHeader
        title="D3 Visualization"
        date="March 23, 2018"
      />
      <PostBody>

        <p>
          Dolor excepteur voluptate in eiusmod fugiat minim aliquip amet id quis excepteur eiusmod dolore. Sint qui esse nostrud Lorem laborum qui est ut irure esse esse qui magna nisi. Non labore nisi nostrud tempor aute officia incididunt consectetur ex. Minim cupidatat deserunt id incididunt eu magna duis amet elit pariatur id.
        </p>
        <p>
          Adipisicing occaecat irure tempor est ipsum duis labore voluptate. Magna labore ea laboris esse labore enim aute. Ullamco proident veniam labore Lorem ex proident esse commodo sint aute mollit. Commodo proident culpa exercitation fugiat occaecat et officia.
        </p>

      </PostBody>
      <ModalImage src={`${config.basePath}/assets/images/article_2.webp`} width={600} height={600}></ModalImage>
      <VisualizationBigData></VisualizationBigData>
      <SyntaxHighlightComp></SyntaxHighlightComp>
      <ImageHoverCard src={`${config.basePath}/assets/images/article_2.webp`} width={400} height={400}>
        <ImageHoverContent title="Example">This is an example of content</ImageHoverContent>
      </ImageHoverCard>
      <NoteBlock>This is a block</NoteBlock>
    </React.Fragment>
  )
}
