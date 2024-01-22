import type { SimplifiedPost } from "@/wordpress/post-query";
import DOMPurify from "isomorphic-dompurify";
import CoverImage from "./cover-image";
import Date from "./date";
import Author from "./author";
import paths from "@/paths";
import Link from "next/link";

interface HeroPostProps {
  heroPostData?: SimplifiedPost;
}

export default function HeroPost({ heroPostData }: HeroPostProps) {
  /*
    What we need in hero post:
      1. Post title - no need to split
      2. Featured image - DONE
      3. Date of post - DONE
      4. Post author - DONE
      5. Author avatar - DONE
      6. Excerpt

    Extract each of these into it's own resuable component (style-free) to use throughout pages ([slug] and home page)
    FIgure out error handling if heroPostData is null!!**
  */

  if (!heroPostData) {
    // figure out what to do here!!
    // Show error page?
    return null; // Or handle the case when heroPostData is undefined
  }

  return (
    <Link href={paths.postShow(heroPostData.slug)}>
      <div className="card card-side mx-auto bg-base-300 shadow-xl">
        {heroPostData.featuredImage !== null && (
          <CoverImage coverImage={heroPostData.featuredImage} />
        )}
        <div className="card-body mx-auto justify-center">
          <h2 className="card-title text-4xl">{heroPostData.title}</h2>
          <div className="mt-8">
            <Date dateString={heroPostData.date} />
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(heroPostData.excerpt),
              }}
            />
            <Author author={heroPostData.author} />
          </div>
        </div>
      </div>
    </Link>
  );
}
