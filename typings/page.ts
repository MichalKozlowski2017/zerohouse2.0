export interface Page {
  _id: string;
  slug: {
    current: string;
  };
  excerpt: string;
  keywords: string;
  title: string;
  pages: [];
  pageContent: object;
}
