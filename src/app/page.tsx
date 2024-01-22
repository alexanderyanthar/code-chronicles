import { fetchLatestPosts } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import HeroPost from "@/components/hero-post";
import { parseISO, format } from "date-fns";
import Container from "@/components/container";

export default async function Home() {
  const result: SimplifiedPost[] | undefined = await fetchLatestPosts();
  const heroPostData = result?.[0];

  /*
  TODO:
    1. Organize the rest of data flow
    2. DONE---Split hero post data away from rest of posts (first item in array)
    3. split up componenets and functions individually for separation of concerns
      - Date function
      - Image sizing
      - author avatar and names
      - title
      - excerpt and content
    4. Pass data as props from parent to children
      Be mindful of data flow!! - Refer to course to get the perfect mid point. - Not applicable yet, but will be soon.
  */

  return (
    <div>
      <Container>
        <HeroPost heroPostData={heroPostData} />
      </Container>
      <ul>
        {result?.map((post) => (
          <li key={post.title}>
            <h2>{post.title}</h2>
            {post.featuredImage !== null && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText}
                width={1280}
                height={500}
              />
            )}
            <time dateTime={post.date}>
              {format(parseISO(post.date), "LLLL, d, yyyy")}
            </time>
            <Image
              src={post.author.node.avatar.url}
              alt=""
              width={25}
              height={25}
            />
            <p>{post.author.node.name}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.excerpt),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
