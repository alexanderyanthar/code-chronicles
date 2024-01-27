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
      width={parseInt(featuredImage.node.mediaDetails.sizes[3].width)}
      height={parseInt(featuredImage.node.mediaDetails.sizes[3].height)}
      className="rounded-t-2xl"
    />
  );
}
