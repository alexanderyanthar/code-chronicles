import { fetchLatestPosts } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import HeroPost from "@/components/hero-post";
import { parseISO, format } from "date-fns";

export default async function Home() {
  const result: SimplifiedPost[] | undefined = await fetchLatestPosts();

  return (
    <div>
      <h1>Home Page</h1>
      <HeroPost />
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
