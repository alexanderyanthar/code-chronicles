/*
  TO DO:
    3. Set up the carousel in the home page for each category
    4. Style the cards to make sure it looks nice
    5. Begin working on the /posts/[slug] page to display posts 
*/

export interface SimplifiedPost {
  author: Author;
  categories?: Categories;
  content: string;
  date: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  id: string;
  slug: string;
  title: string;
}

export interface FeaturedImage {
  node: {
    id: string;
    altText: string;
    mediaDetails?: {
      sizes?: {
        height: string;
        width: string;
      }[];
      height: number;
      width: number;
    };
    sourceUrl: string;
  };
}

export interface Author {
  node: {
    avatar: {
      url: string;
    };
    name: string;
    nickname: string;
  };
}

interface Edge {
  node: SimplifiedPost;
}

export interface CategoryIds {
  data: {
    categories: {
      edges: {
        node: {
          categoryId: number;
          name: string;
        };
      }[];
    };
  };
}

interface Categories {
  edges: {
    node: {
      name: string;
    };
  }[];
}

export async function fetchLatestPosts(): Promise<
  SimplifiedPost[] | undefined
> {
  try {
    if (!process.env.WORDPRESS_API) {
      throw new Error("WORDPRESS_API environment variable is not defined.");
    }
    const response = await fetch(process.env.WORDPRESS_API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query latestPostsQuery {
      posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                title
                featuredImage {
                  node {
                    id
                    altText
                    sourceUrl
                    mediaDetails {
                      sizes {
                        height
                        width
                      }
                    }
                  }
                }
                author {
                  node {
                    avatar {
                      url
                    }
                    name
                    firstName
                    lastName
                    nickname
                  }
                }
                date
                excerpt
                slug
                id
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });
    const result = await response.json();

    console.log(result);

    const simplifiedPost: SimplifiedPost[] = result?.data?.posts?.edges?.map(
      (edge: Edge) => edge?.node || []
    );

    return simplifiedPost;
  } catch (err: unknown) {
    console.log("Error fetching data", err);
  }
}

// Fetch category ID
export async function fetchCategoryIds(): Promise<CategoryIds | undefined> {
  try {
    if (!process.env.WORDPRESS_API) {
      throw new Error("WORDPRESS_API environment variable is not defined.");
    }
    const response = await fetch(process.env.WORDPRESS_API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query AllCategoryIds {
          categories(first: 3) {
            edges {
              node {
                categoryId
                name
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    const result: CategoryIds = await response.json();
    return result;
  } catch (err: unknown) {
    console.log("Error fetching data", err);
  }
}

export async function fetchPostsByCategory(): Promise<
  SimplifiedPost[] | undefined
> {
  const categoryData: CategoryIds | undefined = await fetchCategoryIds();
  const categoryIds = categoryData?.data?.categories.edges;

  let arrayOfPosts: SimplifiedPost[] | undefined = [];

  if (!categoryIds) {
    console.log("No categoryIds available.");
    return;
  }

  await Promise.all<Promise<void>>(
    categoryIds?.map(async (id) => {
      // for each of these ids, I want to make a query and save it in the same array, then return the array
      try {
        const categoryId = id.node.categoryId;

        if (!process.env.WORDPRESS_API) {
          throw new Error("WORDPRESS_API environment variable is not defined.");
        }
        const response = await fetch(process.env.WORDPRESS_API, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            query: `query postsQuery {
              posts(first: 3, where: {categoryId: ${categoryId}, orderby: {field: DATE, order: DESC}}) {
                edges {
                  node {
                    author {
                      node {
                        avatar {
                          url
                        }
                        name
                      }
                    }
                    categories {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    date
                    featuredImage {
                      node {
                        altText
                        mediaDetails {
                          sizes {
                            height
                            width
                          }
                        }
                        sourceUrl
                      }
                    }
                    excerpt
                    id
                    slug
                    title
                  }
                }
              }
            }`,
          }),
          next: { revalidate: 3600 },
        });
        const result = await response.json();
        const simplifiedPost: SimplifiedPost[] =
          result?.data?.posts?.edges?.map((edge: Edge) => edge?.node || []);

        arrayOfPosts?.push(...simplifiedPost);
      } catch (err: unknown) {
        console.log("Error fetching data", err);
      }
    })
  );
  return arrayOfPosts;
}

export async function fetchPostBySlug(
  slug: string
): Promise<SimplifiedPost | undefined> {
  try {
    if (!process.env.WORDPRESS_API) {
      throw new Error("WORDPRESS_API environment variable is not defined.");
    }
    const response = await fetch(process.env.WORDPRESS_API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `query postsQuery {
                  post(id: "${slug}", idType: SLUG) {
                      author {
                        node {
                          avatar {
                            url
                          }
                          name
                        }
                      }
                      content
                      date
                      featuredImage {
                        node {
                          altText
                          mediaDetails {
                            height
                            width
                          }
                          sourceUrl
                        }
                      }
                      title
                    }
                }`,
      }),
    });

    const result = await response.json();

    const finalResult = result.data.post;

    return finalResult;
  } catch (err: unknown) {
    console.error("Error fetching posts", err);
  }
}
