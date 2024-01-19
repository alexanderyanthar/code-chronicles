const paths = {
  home() {
    return "/";
  },
  postShow(postSlug: string) {
    return `/${postSlug}`;
  },
};

export default paths;
