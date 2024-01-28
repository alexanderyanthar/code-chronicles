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
import Date from "../date";
import Author from "../author";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import paths from "@/paths";
import FeaturedImage from "./featured-image";

interface PostProps {
  post: SimplifiedPost;
  width?: string;
}

export default function CategoryPostCard({ post, width = "1/3" }: PostProps) {
  return (
    <Link
      href={paths.postShow(post.slug)}
      className={`card w-${width} bg-base-200 shadow-xl mr-8 transition-shadow duration-300 hover:shadow-2xl`}
    >
      {post.featuredImage !== null && (
        <FeaturedImage featuredImage={post.featuredImage} />
      )}
      <div className="card-body">
        <h3>{post.title}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.excerpt),
          }}
        />
        <Date dateString={post.date} />
        <Author author={post.author} width={25} height={25} />
      </div>
    </Link>
  );
}
