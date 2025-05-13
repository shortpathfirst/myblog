import {  ReactElement } from "react";

type Author = {
    name: string,
    source: string;
    picture?: string;
}
export type Tag = {
    name:string;
    url:string;
}
export type MetadataBlog = {
    // id: string,
    title: string;
    description: string;
    date: string;
    tags: Tag[],
    author?: Author;
    ogImage?: {
        url: string;
    };
}
export type BlogPost = {
    metadata: MetadataBlog;
    slug: string; // File name
    content: ReactElement, // Parsed Content
}
