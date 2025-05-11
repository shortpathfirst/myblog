import { JSXElementConstructor, ReactElement } from "react";

type Author = {
    name: string,
    source: string;
    picture?: string;
}

export type MetadataBlog = {
    // id: string,
    title: string;
    description: string;
    date: string;
    tags: string[],

    author?: Author;
    ogImage?: {
        url: string;
    };
}
export type BlogPost = {
    metadata: MetadataBlog;
    slug: string; // File name
    content:string// ReactElement<any, string | JSXElementConstructor<any>>, // Content with Elements
}
