import { notFound } from 'next/navigation'
import {  getBlogPosts } from '@/lib/posts'
import {  MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'

interface BlogParams {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
export function generateMetadata({ params }: BlogParams) {
  // let post = getBlogPosts().find((post) => post.slug === params.slug)
  // if (!post) {
  //   return
  // }

  // let {
  //   title,
  //   description,
  // } = post.metadata

  // return {
  //   title,
  //   description,
  //   openGraph: {
  //     title,
  //     description,
  //     type: 'article',
  //     // url: `${baseUrl}/blog/${post.slug}`,

  //   },
  // }
}

// export async function compileMDX(source: string) {
//   return await serialize(source, {
//     mdxOptions: {
//       remarkPlugins: [],
//       rehypePlugins: [
//         rehypeSlug,
//         rehypeAutolinkHeadings,
//         [rehypePrettyCode, { theme: 'github-dark' }],
//       ],
//       format: 'mdx',
//     },
//   });
// }

export default async function Blog({ params }: BlogParams) {
  const post = getBlogPosts().find((post) => post.slug === params.slug)
 
  if (!post) {
    notFound()
  }
//  const mdx = await compileMDX(post.content);

  return (
    <section >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            description: post.metadata.description,
          }),
        }}
      />
      <h1 >{post.metadata.title}</h1>
      <article >
        <MDXRemote source={post.content} />
      </article>
    </section>
  )
}
