export type Post = {
    slug: string;
    title: string;
    date: string;
    coverImage?: string;
    ogImage: {
      url: string;
    };
    preview?: boolean;
  };
  