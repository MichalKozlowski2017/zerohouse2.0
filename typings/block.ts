export interface Block {
  _id: string;
  _type: string;
  name: string;
  title: string;
  type: string;
  images: [];
  image: {
    _key: string;
    alt: string;
    asset: object;
  };
  bigImage: {
    _key: string;
    alt: string;
    asset: object;
  };
  content: [];
  imageSize: string;
  imagePosition: string;
  panoramaImages: string;
}
