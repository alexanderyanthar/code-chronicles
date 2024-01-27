import HeroPost from "@/components/hero-post/hero-post";
import Container from "@/components/container";
import Category from "@/components/categories/category";
import Header from "@/components/header/header";

/*
  TO DO:
      1. style cards to look pretty
    
    ***After MVP(home page and individual post page) is done**
      a. add a category path `/posts/[category]`
      b. style category page - similar to home page but for category
      c. add search option
      d. add a view more option on home page to see more posts in the same category
*/

export default async function Home() {
  return (
    <main>
      <Container size="2xl">
        <section>
          <Header />
          <HeroPost />
        </section>
      </Container>
      <Container size="xl">
        <section>
          <h2 className="text-6xl font-bold mt-8">Categories</h2>
          <Category />
        </section>
      </Container>
    </main>
  );
}
