const paths = {
  home() {
    return "/";
  },
  postShow(postSlug: string | undefined) {
    return `/posts/${postSlug}`;
  },
};

export default paths;
