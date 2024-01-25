import Container from "@/components/container";
import { SimplifiedPost, fetchPostBySlug } from "@/wordpress/post-query";
import Author from "@/components/author";
import PostFeaturedImage from "@/components/post/post-featured-image";
import Date from "@/components/date";
import DOMPurify from "isomorphic-dompurify";

interface PostSlugProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostSlugProps) {
  const result: SimplifiedPost | undefined = await fetchPostBySlug(params.slug);

  if (!result) {
    return null;
  }

  return (
    <article>
      <Container>
        <h1 className="text-8xl font-bold mt-16 mb-8">{result.title}</h1>
        <div className="flex">
          <Author author={result.author} />
          <Date dateString={result.date} />
        </div>
        <PostFeaturedImage featuredImage={result.featuredImage} />
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(result.content),
          }}
        />
      </Container>
    </article>
  );
}
