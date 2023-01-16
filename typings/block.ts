export interface Block {
  _id: string;
  _type: string;
  name: string;
  image: {
    _key: string;
    alt: string;
    asset: object;
  };
  content: [];
  imageSize: string;
  imagePosition: string;
  panoramaImages: string;
}
