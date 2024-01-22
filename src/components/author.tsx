import Image from "next/image";
import type { Author } from "@/wordpress/post-query";

interface AuthorProps {
  author: Author;
}

export default function Author({ author }: AuthorProps) {
  return (
    <div className="flex">
      <Image
        src={author.node.avatar.url}
        alt={`${author.node.name} avatar`}
        width={25}
        height={25}
      />
      <p className="ml-2">{author.node.name}</p>
    </div>
  );
}
