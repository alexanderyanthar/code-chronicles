/*
  TO DO:
    1. Fetch all posts within a category
    2. Figure out the structure of the category posts. Should it be a two dimensional array? An array of objects?
    3. Set up the carousel in the home page for each category
    4. Style the cards to make sure it looks nice
    5. Begin working on the /posts/[slug] page to display posts 
*/

export interface SimplifiedPost {
  author: Author;
  content: string;
  date: string;
  excerpt: string;
  featuredImage: FeaturedImage;
  slug: string;
  title: string;
}

export interface FeaturedImage {
  node: {
    id: string;
    altText: string;
    mediaDetails: {
      sizes: {
        height: string;
        width: string;
      }[];
    };
    sourceUrl: string;
  };
}

export interface Author {
  node: {
    avatar: {
      url: string;
    };
    nickname: string;
    name: string;
  };
}

interface Edge {
  node: SimplifiedPost;
}

export interface CategoryIds {
  categories: {
    edges: {
      node: {
        categoryId: string;
      };
    };
  };
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
                content
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });
    const result = await response.json();

    const simplifiedPost: SimplifiedPost[] = result?.data?.posts?.edges?.map(
      (edge: Edge) => edge?.node || []
    );

    return simplifiedPost;
  } catch (err: unknown) {
    console.log("Error fetching data", err);
  }
}

// Fetch category ID
export async function fetchCategoryIds(): Promise<CategoryIds[] | undefined> {
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
          categories(first: 10) {
            edges {
              node {
                id
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    const result: CategoryIds[] = await response.json();
    return result;
  } catch (err: unknown) {
    console.log("Error fetching data", err);
  }
}
