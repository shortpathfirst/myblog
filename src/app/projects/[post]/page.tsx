import { getAllProject } from "@/lib/api";

// type Params = {
//   params: {
//     slug: string;
//   };
// };


export default function ProjectPage() {
  return (
    <main>

    </main>
  );
}

// Fetching dynamic paths
export async function generateStaticParams() {
  const posts = getAllProject();
  return posts.map(post => ({
    post: post.urlTitle,
  }));
}
