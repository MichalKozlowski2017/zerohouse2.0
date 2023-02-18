export interface Page {
  _id: string;
  slug: {
    current: string;
  };
  excerpt: string;
  keywords: string;
  title: string;
  pages: [];
  offers: [];
  page: {
    title: string;
    excerpt: string;
    keywords: string;
  };
  pageContent: object;
  offerInfo: object;
}
