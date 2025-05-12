
import { notFound } from 'next/navigation'
import { getBlogPosts } from '@/lib/posts'
import styles from '@/styles/mdx.module.css'

interface BlogParams {

  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()

  return posts.map(async (post) => ({
    slug: post.slug,
  }))
}
export async function generateMetadata({ params }: BlogParams) {
  const { slug } = await params; // Only necessary if params is a Promise
  let posts = await getBlogPosts()
  const post = posts.find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    description,
  } = post.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      // url: `${baseUrl}/blog/${post.slug}`,

    },
  }
}

export default async function Blog({ params }: BlogParams) {
  const { slug } = await params; // Only necessary if params is a Promise
  const posts = await getBlogPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound()
  }

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
      <article className={styles.mdxContent} >
        {/* add className here to style the components */}
        {/* <MDXRemote {...mdxSource} components={mdxComponents} /> */}
        {/* <MDXRemote  source = {post.content}  components={mdxComponents}/> */}
        {post.content}
      </article>
    </section>
  )
}