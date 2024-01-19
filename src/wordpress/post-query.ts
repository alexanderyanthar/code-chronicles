export const revalidate = 3600;

export async function fetchLatestPosts() {
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
          posts {
            edges {
              node {
                title
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });
    const result = await response.json();
    return result;
  } catch (err: unknown) {
    console.log("Error fetching data", err);
  }
}
