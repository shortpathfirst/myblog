
import Post1 from "@/_posts/Post1";
import Post2 from "@/_posts/Post2";
import Post3 from "@/_posts/Post3";
import { join } from "path";
import fs from "fs";
import markdownToHtml from "./markdownToHtml";
import { basePath } from "./constants";
import { config } from "process";

const postsDirectory = join(process.cwd(), "src/_posts");

export async function getPostBySlug(post: string) {
    console.log(postsDirectory)
    if (post == "post1") {
        return <Post1></Post1>;
    }
    if (post == "post2") {
        return <Post2></Post2>;
    }
    if (post == "post3") {
        return <Post3></Post3>;
    }
    if(post=="post4"){
        const fullPath = join(postsDirectory, `${post}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        return <div
        dangerouslySetInnerHTML={{ __html: await markdownToHtml(fileContents) }}
      /> 
    }
    if(post=="Geojson"){
        const fullPath = join(postsDirectory, `${post}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        return <div
        dangerouslySetInnerHTML={{ __html: await markdownToHtml(fileContents) }}
      /> 
    }

    return <></> as React.ReactNode;
}

export function getAllPost() {
    return [
        {
            imageSrc: `${basePath}/assets/images/article_2.webp`,
            title: "Creating a blog post",
            urlTitle: "post2",
            description: "Amet occaecat adipisicing est ea.Ea elit enim aute aute amet proident. Quis minim aliquip est ea sunt non exercitation incididunt do aliquip eiusmod eiusmod. Proident amet proident officia adipisicing dolor aliquip ex quis ullamco."
        },
        {
            imageSrc: `${basePath}/assets/images/article_3.webp`,
            title: "Creating a blog post",
            urlTitle: "post3",
        },
        {
            imageSrc: `${basePath}/assets/images/article_1.webp`,
            title: "Creating a blog post",
            urlTitle: "post1",
        },
        {
            imageSrc: `${basePath}/assets/images/article_4.webp`,
            title: "Creating a blog post",
            urlTitle: "post4",
        },
        {
            imageSrc: `${basePath}/assets/images/article_4.webp`,
            title: "Creating a blog post",
            urlTitle: "Geojson",
        },
    ];
}

export function getAllProject(){
    return [
        {
            imageSrc: `${basePath}/assets/images/article_1.webp`,
            title: "Creating a blog post",
            urlTitle: "https://shortpathfirst.github.io/AngularPesi/",
            description: "Amet occaecat adipisicing est ea.Ea elit enim aute aute amet proident. Quis minim aliquip est ea sunt non exercitation incididunt do aliquip eiusmod eiusmod. Proident amet proident officia adipisicing dolor aliquip ex quis ullamco."
        },
        {
            imageSrc: `${basePath}/assets/images/article_2.webp`,
            title: "Creating a blog post",
            urlTitle: "/projects/AngularPesi",
            description: "Amet occaecat adipisicing est ea.Ea elit enim aute aute amet proident. Quis minim aliquip est ea sunt non exercitation incididunt do aliquip eiusmod eiusmod. Proident amet proident officia adipisicing dolor aliquip ex quis ullamco."
        },
    ]
}

