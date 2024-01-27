import Image from "next/image";
import type { FeaturedImage } from "@/wordpress/post-query";

interface CoverImageProps {
  coverImage: FeaturedImage;
}

export default function CoverImage({ coverImage }: CoverImageProps) {
  return (
    <Image
      src={coverImage.node.sourceUrl}
      alt={coverImage.node.altText}
      width={parseInt(coverImage.node.mediaDetails.sizes[3].width)}
      height={parseInt(coverImage.node.mediaDetails.sizes[3].height)}
      className="rounded-l-2xl"
    />
  );
}
