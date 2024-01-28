import CategoryPostCard from "@/components/categories/category-post-card";
import Container from "@/components/container";
import {
  SimplifiedPost,
  fetchAllPostsByCategoryId,
} from "@/wordpress/post-query";

interface CategorySlugProps {
  params: {
    categorySlug: string;
  };
}

/*
  To do:
  NEW:
    1. Figure out if and how to make the category and post page static

    1. Make new post-query function to retrieve category data
      a. get category id or name - DONE
      b. use category id to fetchCategory posts - DONE
      c. figure out if post pagination possible
      d. lazy loading for images?
    2. Display data on page
      a. category cards (can reuse from categories directory) - DONE
      b. figure out pagination
*/

export default async function CategoryPage({ params }: CategorySlugProps) {
  const result: SimplifiedPost[] | undefined = await fetchAllPostsByCategoryId(
    params.categorySlug
  );

  return (
    <div>
      {result !== undefined && (
        <section>
          <Container size="xl">
            <h1 className="text-8xl">
              {result[0].categories?.edges[0].node.name}
            </h1>
          </Container>

          <Container
            size="2xl"
            display="flex"
            flexWrap="flex-wrap"
            justifyContent="justify-center"
          >
            {result.map((post) => (
              <CategoryPostCard post={post} key={post.id} width="1/4" />
            ))}
          </Container>
        </section>
      )}
    </div>
  );
}
