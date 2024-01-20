export interface SimplifiedPost {
  author: {
    node: {
      avatar: {
        url: string;
      };
      nickname: string;
      name: string;
    };
  };
  content: string;
  date: string;
  excerpt: string;
  featuredImage: {
    node: {
      id: string;
      altText: string;
      sourceUrl: string;
    };
  };
  slug: string;
  title: string;
}

interface Edge {
  node: SimplifiedPost;
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
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
            edges {
              node {
                title
                featuredImage {
                  node {
                    id
                    altText
                    sourceUrl
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
