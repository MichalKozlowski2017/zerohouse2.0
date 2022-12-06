export interface Page {
  page: {
    _id: string;
    slug: object;
    excerpt: string;
    keywords: string;
    title: string;
  };
  pages: [];
  pageContent: object;
}
