export interface Block {
  _id: string;
  _type: string;
  image: {
    alt: string;
    asset: object;
  };
  content: [];
  imageSize: string;
}
