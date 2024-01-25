import { fetchPostsByCategory } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import CategoryPostCard from "@/components/categories/category-post-card";

export default async function Category() {
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
      {uniqueCategories.length > 0 &&
        uniqueCategories.map((category) => (
          <div key={category}>
            <h3 className="text-4xl font-semibold mb-2">{category}</h3>
            <div className="flex justify-center">
              {postsByCategory[category]?.map((post) => (
                <CategoryPostCard post={post} key={post.postId} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
