import Footer from '@components/Layout/Footer/Footer';
import Header from '@components/Layout/Header/Header';
import React from 'react';
import { Pages } from '@typings/pages';
import { Roboto } from '@next/font/google';
import { FooterType } from '@typings/footer';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
});

type Props = {
  children: JSX.Element;
  pages: Pages['pages'];
  footer: FooterType;
};

const Layout = ({ children, pages, footer }: Props) => {
  return (
    <main
      className={`relative mx-auto max-w-[1920px] pt-[70px] md:pt-[124px] ${roboto.className} overflow-hidden bg-[#F8F8F8]`}
    >
      <Header pages={pages} />
      {children}
      <Footer {...footer} />
    </main>
  );
};

export default Layout;
