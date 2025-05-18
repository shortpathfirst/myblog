import { ReactElement } from "react";

type Author = {
    name: string,
    source: string;
    picture?: string;
}
export type Tag = {
    name: string;
    url: string;
}
// Blog posts
export type MetadataBlog = {
    // id: string,
    title: string;
    description: string;
    date: string;
    tags: Tag[],
    author?: Author;
    imageUrl?: string;
    ogImage?: {
        url: string;
    };
}
export type BlogPost = {
    metadata: MetadataBlog;
    slug: string; // File name
    content: ReactElement, // Parsed Content
}

// Project data

export type MetadataProject = {
    // id: string,
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
    tags: Tag[],
    ogImage?: {
        url: string;
    };
}
export type ProjectsInfo = {
    metadata: MetadataProject;
    url: string; //External Url of the project
}

export interface TechStackData {
    name: string;
    level?: number;
    description?: string;
    imageUrl?: string;
    children?: TechStackData[];
}