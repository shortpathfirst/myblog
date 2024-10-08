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

export type PostData = {
  imageSrc: string,
  title: string,
  urlTitle: string,
  description?: string
}