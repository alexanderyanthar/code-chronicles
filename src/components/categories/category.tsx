import { fetchPostsByCategory } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import CategoryPostCard from "@/components/categories/category-post-card";
import Link from "next/link";
import paths from "@/paths";

export default async function Category() {
  const categoryPosts: SimplifiedPost[] | undefined =
    await fetchPostsByCategory();

  const uniqueCategories = Array.from(
    new Set(
      categoryPosts?.flatMap(
        (post) =>
          post.categories?.edges.map(
            // refer to the .map((str))... below to understand why I added the '&' symbol
            (category) => `${category.node.name}-&${category.node.slug}`
          ) || []
      )
    )
  ).map((str) => {
    // the '&' is an arbitrary value to split the string properly since the slug has '-' between every word. In other words the '&' can be any value that would give the function understanding not to split the string based solely on '-'
    const [name, slug] = str.split("-&");
    return { name, slug };
  });

  // Create an object to store posts for each category
  const postsByCategory: Record<string, SimplifiedPost[]> = {};

  // Initialize the object with empty arrays for each category
  uniqueCategories.forEach((category) => {
    postsByCategory[category.name] = [];
  });

  // Sort posts into their respective category arrays
  categoryPosts?.forEach((post) => {
    const categories = post.categories?.edges?.map((edge) => edge.node) || [];
    categories.forEach((category) => {
      postsByCategory[category.name].push(post);
    });
  });

  return (
    <div>
      {uniqueCategories.length > 0 &&
        uniqueCategories.map((category) => (
          <div key={category.name}>
            <div className="mb-3 mt-16">
              <Link
                href={paths.categoryPosts(category.slug)}
                as={paths.categoryPosts(category.slug)}
                className="text-4xl font-semibold"
              >
                {category.name}
              </Link>
            </div>
            <div className="flex justify-center">
              {postsByCategory[category.name]?.map((post) => (
                <CategoryPostCard post={post} key={post.id} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
