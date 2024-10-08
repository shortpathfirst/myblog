
import Post1 from "@/_posts/Post1";
import Post2 from "@/_posts/Post2";

export function getPostBySlug(post: string) {

    if (post == "post1") {
        return <Post1></Post1>;
    }
    if (post == "post2") {
        return <Post2></Post2>;
    }


    return <></> as React.ReactNode;
}

export function getAllPost() {
    return [
        {
            imageSrc: "/assets/images/article_2.webp",
            title: "Creating a blog post",
            urlTitle: "post2",
            description: "Amet occaecat adipisicing est ea.Ea elit enim aute aute amet proident. Quis minim aliquip est ea sunt non exercitation incididunt do aliquip eiusmod eiusmod. Proident amet proident officia adipisicing dolor aliquip ex quis ullamco."
        },
        {
            imageSrc: "/assets/images/article_3.webp",
            title: "Creating a blog post",
            urlTitle: "post3",
        },
        {
            imageSrc: "/assets/images/article_1.webp",
            title: "Creating a blog post",
            urlTitle: "post1",
        },
        {
            imageSrc: "/assets/images/article_4.webp",
            title: "Creating a blog post",
            urlTitle: "post4",
        },
    ];
}
