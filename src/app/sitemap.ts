import type { MetadataRoute } from 'next'
import fs from "fs";
import path from 'path';
import { baseUrl } from '@/lib/constants';
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  
const postsDirectory = path.join(process.cwd(), "src", "_posts");
const mdxFiles = fs.readdirSync(postsDirectory).filter((file) => ['.md', '.mdx'].includes(path.extname(file)));
const slugs = mdxFiles.map((file) => path.basename(file, path.extname(file)));

  const notes = slugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 1,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['blog', 'projects', 'resume'].map((route) => ({
    url: `${baseUrl}/${route}`,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  return [
    ...routes,
    ...notes,
    // {
    //   url: `${baseUrl}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 1,
    // },
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}