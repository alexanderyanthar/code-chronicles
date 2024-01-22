const paths = {
  home() {
    return "/";
  },
  postShow(postSlug: string) {
    return `/posts/${postSlug}`;
  },
};

export default paths;
