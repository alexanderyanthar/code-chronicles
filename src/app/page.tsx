import { fetchLatestPosts, fetchPostsByCategory } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import HeroPost from "@/components/hero-post";
import Container from "@/components/container";
import CategoryPostCard from "@/components/category-post-card";
/*
  TO DO:
    2. Create post carousel for latest posts
    3. style cards to look pretty
    
    ***After MVP(home page and individual post page) is done**
      a. add a category path `/posts/[category]`
      b. style category page - similar to home page but for category
      c. add search option
      d. add a view more option on home page to see more posts in the same category
*/

export default async function Home() {
  const result: SimplifiedPost[] | undefined = await fetchLatestPosts();
  const heroPostData: SimplifiedPost | undefined = result?.[0];
  const categoryPosts: SimplifiedPost[] | undefined =
    await fetchPostsByCategory();

  const uniqueCategories = Array.from(
    new Set(
      categoryPosts?.flatMap(
        (post) => post.categories?.edges?.map((edge) => edge.node.name) || []
      ) || []
    )
  );

  // Create an object to store posts for each category
  const postsByCategory: Record<string, SimplifiedPost[]> = {};

  // Initialize the object with empty arrays for each category
  uniqueCategories.forEach((category) => {
    postsByCategory[category] = [];
  });

  // Sort posts into their respective category arrays
  categoryPosts?.forEach((post) => {
    const categories =
      post.categories?.edges?.map((edge) => edge.node.name) || [];
    categories.forEach((category) => {
      postsByCategory[category].push(post);
    });
  });

  return (
    <div>
      <Container>
        <HeroPost heroPostData={heroPostData} />
        <h2 className="text-4xl bold">Categories</h2>
        {uniqueCategories.length > 0 &&
          uniqueCategories.map((category) => (
            <div key={category}>
              <h3 className="text-4xl bold">{category}</h3>
              <div className="carousel">
                {postsByCategory[category]?.map((post) => (
                  <CategoryPostCard post={post} key={post.postId} />
                ))}
              </div>
            </div>
          ))}
      </Container>
    </div>
  );
}
