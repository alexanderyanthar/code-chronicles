import { fetchLatestPosts } from "@/wordpress/post-query";
export const revalidate = 3600;

export default async function Home() {
  const result = await fetchLatestPosts();
  const postTitles = result.data.posts.edges;
  console.log(postTitles);
  return (
    <div>
      <h1>Home Page</h1>
      {postTitles.map((title: { node: { title: string } }) => (
        <h2 key={title.node.title}>{title.node.title}</h2>
      ))}
    </div>
  );
}
