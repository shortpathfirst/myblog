import fs from "fs";
import path from 'path';
import matter from "gray-matter";
import { join } from "path";
import { BlogPost, MetadataBlog } from "./interfaces";


const postsDirectory = join(process.cwd(), "src", "_posts");

// Get all .mdx files in a given directory
function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

// Read and parse a single MDX file using gray-matter
function readMDXFile(filePath: string): { metadata: MetadataBlog; content: string } {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);
  return { metadata: data as MetadataBlog, content };
}

// Aggregate all blog post data
export function getBlogPosts(): BlogPost[] {
  const mdxFiles = getMDXFiles(postsDirectory);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(postsDirectory, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}
