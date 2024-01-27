import Image from "next/image";
import type { Author } from "@/wordpress/post-query";

interface AuthorProps {
  author: Author;
  width: number;
  height: number;
  textSize?: string;
}

export default function Author({
  author,
  width,
  height,
  textSize = "lg",
}: AuthorProps) {
  return (
    <div className="flex items-center">
      <Image
        src={author.node.avatar.url}
        alt={`${author.node.name} avatar`}
        width={width}
        height={height}
        className="avatar mask mask-squircle"
      />
      <p className={`ml-2 text-${textSize}`}>{author.node.name}</p>
    </div>
  );
}
