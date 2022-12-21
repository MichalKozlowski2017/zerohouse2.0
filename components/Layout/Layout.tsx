import Footer from '@components/Layout/Footer/Footer';
import Header from '@components/Layout/Header/Header';
import React from 'react';
import { Pages } from '@typings/pages';
import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

type Props = {
  children: JSX.Element;
  pages: Pages['pages'];
};

const Layout = ({ children, pages }: Props) => {
  return (
    <main
      className={`max-w-[1920px] relative mx-auto pt-[124px] ${roboto.className} bg-[#F8F8F8]`}
    >
      <Header pages={pages} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
