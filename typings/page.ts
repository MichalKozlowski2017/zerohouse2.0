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
  type: string;
  page: {
    title: string;
    excerpt: string;
    keywords: string;
    type: string;
  };
  pageContent: object;
  offerInfo: object;
}
