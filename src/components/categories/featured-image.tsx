import type { FeaturedImage } from "@/wordpress/post-query";
import Image from "next/image";

interface FeaturedImageProps {
  featuredImage: FeaturedImage;
}

export default function FeaturedImage({ featuredImage }: FeaturedImageProps) {
  return (
    <Image
      src={featuredImage.node?.sourceUrl}
      alt={featuredImage.node.altText}
      width={featuredImage.node.mediaDetails.width}
      height={featuredImage.node.mediaDetails.height}
      className="rounded-t-2xl"
    />
  );
}
