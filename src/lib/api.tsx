
import Post1 from "@/_posts/Post1";

export function getPostBySlug(post: string) {

    if(post == "post1"){
        return <Post1></Post1>;
    }
    return <></> as React.ReactNode;
}