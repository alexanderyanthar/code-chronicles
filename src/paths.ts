const paths = {
  home() {
    return "/";
  },
  postShow(postSlug: string | undefined) {
    return `/posts/${postSlug}`;
  },
  categoryPosts(categorySlug: string) {
    return `/category/${categorySlug}`;
  },
};

export default paths;
