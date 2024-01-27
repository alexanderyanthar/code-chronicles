import { fetchLatestPosts } from "@/wordpress/post-query";
import type { SimplifiedPost } from "@/wordpress/post-query";
import DOMPurify from "isomorphic-dompurify";
import CoverImage from "./cover-image";
import Date from "../date";
import Author from "../author";
import paths from "@/paths";
import Link from "next/link";

export default async function HeroPost() {
  const result: SimplifiedPost[] | undefined = await fetchLatestPosts();
  const heroPostData: SimplifiedPost | undefined = result?.[0];

  if (!heroPostData) {
    // figure out what to do here!!
    // Show error page?
    return null; // Or handle the case when heroPostData is undefined
  }

  return (
    <section>
      <Link href={paths.postShow(heroPostData.slug)}>
        <div className="card card-side mx-auto bg-base-300 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
          {heroPostData.featuredImage !== null && (
            <CoverImage coverImage={heroPostData.featuredImage} />
          )}
          <div className="card-body mx-auto justify-center">
            <h2 className="card-title text-6xl">{heroPostData.title}</h2>
            <div className="mt-8">
              <div
                className="mb-2 text-xl"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(heroPostData.excerpt),
                }}
              />
              <div className="mb-4">
                <Date dateString={heroPostData.date} />
              </div>
              <Author
                author={heroPostData.author}
                width={50}
                height={50}
                textSize="xl"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
