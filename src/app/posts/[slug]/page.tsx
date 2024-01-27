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

/*
  To Do:
    1. Finish styling blog page
      a. Stlye paragrapghs
      b. images
      c. title
      d. code components
      e. quotes
      f. media/text
*/

export default async function PostPage({ params }: PostSlugProps) {
  const result: SimplifiedPost | undefined = await fetchPostBySlug(params.slug);

  if (!result) {
    return null;
  }

  return (
    <article>
      <Container size="xl">
        <h1 className="text-6xl font-bold mt-16 mb-8">{result.title}</h1>
        <div className="flex">
          <span className="mr-2">
            <Author
              author={result.author}
              width={50}
              height={50}
              textSize="xl"
            />
          </span>
        </div>
        <PostFeaturedImage featuredImage={result.featuredImage} />
      </Container>
      <Container size="sm">
        <span className="text-xl">
          Posted <Date dateString={result.date} />
        </span>
        <div
          className="max-w-screen-xl mx-auto blog-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(result.content),
          }}
        />
      </Container>
    </article>
  );
}
