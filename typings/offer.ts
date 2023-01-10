export interface Offer {
  contentBlocks: [];
  _id: string;
  image: {
    alt: string;
    asset: object;
  };
  title: string;
  slug: {
    current: string;
  };
  offerInfo: {
    features: object;
    levels: [
      {
        image: {
          alt: string;
          asset: object;
        };
        rooms: object;
        title: string;
      }
    ];
    name: string;
    price: number;
    project: string;
    status: string;
  };
}
