/*
  What do I need in this card?
    1. All the post data
      a. Post title
      b. featured inage
      c. excerpt
      d. slug
      e. author and avatar
      f. date
    2. Style the card to look great so I don't have to style it otherwise
    3. Pass props through the map function
    5. New components:
      a. featured-image
*/

import { SimplifiedPost } from "@/wordpress/post-query";
import Image from "next/image";
import Date from "./date";
import Author from "./author";
import DOMPurify from "isomorphic-dompurify";

interface PostProps {
  post: SimplifiedPost;
}

export default function CategoryPostCard({ post }: PostProps) {
  return (
    <div className="card w-96 bg-base-200 shadow-xl mr-8">
      {post.featuredImage !== null && (
        <Image
          src={post.featuredImage.node?.sourceUrl}
          alt={post.featuredImage.node.altText}
          width={parseInt(post.featuredImage.node.mediaDetails.sizes[3].width)}
          height={parseInt(
            post.featuredImage.node.mediaDetails.sizes[3].height
          )}
        />
      )}
      <div className="card-body">
        <h3>{post.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.excerpt),
          }}
        />
        <Date dateString={post.date} />
        <Author author={post.author} />
      </div>
    </div>
  );
}
