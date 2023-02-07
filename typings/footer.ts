export interface FooterType {
  address: [];
  kontakt: [];
  logos: [
    {
      name: string;
      logoLink: string;
      _key: string;
      image: {
        _key: string;
        _type: string;
        alt: string;
        asset: object;
      };
    }
  ];
  title: string;
  smFacebook: string;
  smInstagram: string;
  smLinkedin: string;
  smYoutube: string;
}
