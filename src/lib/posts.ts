import fs from "fs";
import path from 'path';
import { join } from "path";
import { BlogPost, MetadataBlog } from "./interfaces";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {  ReactElement } from "react";

const postsDirectory = join(process.cwd(), "src", "_posts");

// Get all .mdx files in a given directory
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) =>  ['.md','.mdx'].includes(path.extname(file)));
}

// Read and parse a single MDX file using next-mdx-remote instead of gray-matter
async function  readMDXFile(filePath: string): Promise<{ metadata: MetadataBlog; content: ReactElement; }> {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

 const { frontmatter, content } = await compileMDX<MetadataBlog>({
        source: rawContent,
        components: {//Add style components
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    rehypeSlug,
                    [rehypePrettyCode, { theme: 'github-dark' }],
                    rehypeHighlight,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
            },
        }
    })

  return { metadata: frontmatter as MetadataBlog, content };
}

// Aggregate all blog post data
export async function getBlogPosts(): Promise<BlogPost[]> {
  const mdxFiles = getMDXFiles(postsDirectory);

  const posts = Promise.all(
    mdxFiles.map( async (file) => {
      const { metadata, content } = await readMDXFile(path.join(postsDirectory, file));
      const slug = path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content: content,
      };
    }))


  return posts;
}
