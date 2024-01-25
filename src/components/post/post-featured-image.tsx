import type { FeaturedImage } from "@/wordpress/post-query";
import Image from "next/image";

interface PostFeaturedImageProps {
  featuredImage: FeaturedImage;
}

export default function PostFeaturedImage({
  featuredImage,
}: PostFeaturedImageProps) {
  return (
    <Image
      src={featuredImage.node.sourceUrl}
      alt={featuredImage.node.altText}
      width={featuredImage.node.mediaDetails?.width}
      height={featuredImage.node.mediaDetails?.height}
      className="max-w-screen-xl mt-8 mx-auto"
    />
  );
}
